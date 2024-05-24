import { getStore } from "@netlify/blobs"
import type { Config, Context } from "@netlify/functions"

export default async (req: Request, context: Context) => {
  const store = getStore("uploads")
  const form = await req.formData()
  const file = form.get("file") as File

  if (file.type !== "image/png") {
    return new Response("Sorry, only PNGs are allowed", { status: 400 })
  }


  await store.set(file.name, file)

  return new Response(`Upload processed: ${file.name}`)
}


export const config: Config = {
  method: "POST",
  path: "/api/upload"
}