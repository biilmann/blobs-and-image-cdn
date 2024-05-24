import { getStore } from "@netlify/blobs"
import type { Config, Context } from "@netlify/functions"

export default async (req: Request, context: Context) => {
  const store = getStore("uploads")
  const blob = await store.get(context.params.name, { type: "blob" })

    console.log("Got blob", blob)

  return new Response(blob, {
    headers: {
      "Content-Type": "image/png",
      "Netlify-CDN-Cache-Control": "public, max-age=31536000",
    },
  })
}


export const config: Config = {
  method: "GET",
  path: "/uploads/images/:name"
}