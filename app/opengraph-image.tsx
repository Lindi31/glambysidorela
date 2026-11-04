import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const alt = "GlamBySidorela: Lashes, Brows und Permanent Make-up in Bruchsal und Jülich"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/hero.png"))
  const src = `data:image/png;base64,${photo.toString("base64")}`

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#2C2826", color: "#FAF7F2" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: 72 }}>
        <div style={{ fontSize: 76, lineHeight: 1.05, display: "flex" }}>GlamBySidorela</div>
        <div style={{ marginTop: 28, fontSize: 36, lineHeight: 1.3, color: "#D4A5A5", display: "flex" }}>
          Lashes, Brows und Permanent Make-up
        </div>
        <div style={{ marginTop: 12, fontSize: 30, color: "#E8D5C4", display: "flex" }}>in Bruchsal und Jülich</div>
      </div>
      <img src={src} width={480} height={630} alt="" style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
    </div>,
    { ...size },
  )
}
