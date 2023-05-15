import fs from "fs"
import path from "path"
import express from "express"
import fetch from "node-fetch"

const createServer = async () => {
  const app = express()
  let vite

  if (process.env.NODE_ENV === "development") {
    vite = await (
      await import("vite")
    ).createServer({
      server: { middlewareMode: true },
      appType: "custom",
    })
    app.use(vite.middlewares)
  } else {
    app.use((await import("compression")).default())
    app.use(
      (await import("serve-static")).default(path.resolve("dist/client"), {
        index: false,
      }),
    )
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl
    let template, render

    try {
      if (process.env.NODE_ENV === "development") {
        template = fs.readFileSync(path.resolve("./index.html"), "utf-8")

        template = await vite.transformIndexHtml(url, template)

        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render
      } else {
        template = fs.readFileSync(
          path.resolve("dist/client/index.html"),
          "utf-8"
        )
        render = (await import("./dist/server/entry-server.js")).render
      }

      const response = await fetch(`https://rickandmortyapi.com/api/character`)
      const result = await response.json()

      const appHtml = await render({path: url, data: result.results})
      const data = `<script>window.__SSR_DATA__=${JSON.stringify(
        result.results
      )}</script>`

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--ssr-data-->`, data)

      res.status(200).set({"Content-Type": "text/html"}).end(html)
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        vite.ssrFixStacktrace(error)
      }
      next(error)
    }
  })

  app.listen(5174)
}

createServer().then(() => {
  console.log("http://localhost:5174")
})
