import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import UploadImage from "../components/UploadImage";
import { getStore } from "@netlify/blobs"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const store = getStore("uploads")
  const { blobs } = await store.list()
  return blobs;
}

export default function Index() {
  const blobs = useLoaderData()

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Upload Image</h1>
      <UploadImage />

      <h2>Images</h2>
      <ul>
        {blobs.map(blob => (
          <li key={blob.key}>
            <img src={`/.netlify/images/?url=/uploads/images/${blob.key}&w=400`} alt={blob.key} />
          </li>
        ))}
      </ul>
    </div>
  );
}
