import { existsSync } from 'node:fs'
import type { IncomingMessage } from 'node:http'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** Environment variables the functions in api/ read (see api/order.ts). */
const SERVER_ENV_PREFIXES = ['MAILGUN_', 'ORDER_']

function readBody(request: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    request.on('data', (chunk: Buffer) => chunks.push(chunk))
    request.on('end', () => resolve(Buffer.concat(chunks)))
    request.on('error', reject)
  })
}

/**
 * Runs the Vercel Functions from api/ inside `npm run dev`, so the application form works locally
 * without the Vercel CLI. Variables come from .env.local; without MAILGUN_API_KEY the email is only
 * printed in the terminal. In production Vercel runs the functions itself.
 */
function vercelFunctions(): Plugin {
  return {
    name: 'vercel-functions-dev',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '')
      for (const [key, value] of Object.entries(env)) {
        if (SERVER_ENV_PREFIXES.some((prefix) => key.startsWith(prefix))) {
          process.env[key] ??= value
        }
      }
      if (!process.env.MAILGUN_API_KEY) {
        process.env.ORDER_DRY_RUN = '1'
      }

      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`)
        const name = /^\/api\/([\w-]+)$/.exec(url.pathname)?.[1]
        if (!name) {
          return next()
        }
        const file = fileURLToPath(new URL(`./api/${name}.ts`, import.meta.url))
        if (!existsSync(file)) {
          res.statusCode = 404
          return res.end()
        }

        try {
          const headers = new Headers()
          for (const [key, value] of Object.entries(req.headers)) {
            if (value !== undefined) {
              headers.set(key, Array.isArray(value) ? value.join(', ') : value)
            }
          }
          const hasBody = req.method !== 'GET' && req.method !== 'HEAD'
          const request = new Request(url, {
            method: req.method,
            headers,
            body: hasBody ? new Uint8Array(await readBody(req)) : undefined,
          })

          const module = await server.ssrLoadModule(file)
          const response: Response = await module.default.fetch(request)

          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (error) {
          server.ssrFixStacktrace(error as Error)
          next(error)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercelFunctions()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
      '@constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
  },
})
