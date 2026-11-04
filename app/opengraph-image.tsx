import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const alt = "Sidorela Isa - Beauty Studio & Academy: Lashes, Brows und Permanent Make-up in Bruchsal und Jülich"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const dataUrl = async (file: string, type: string) =>
  `data:${type};base64,${(await readFile(join(process.cwd(), "public", file))).toString("base64")}`

export default async function Image() {
  const [photo, logo] = await Promise.all([dataUrl("hero.png", "image/png"), dataUrl("brand/logo-cream.svg", "image/svg+xml")])

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#2C2826", color: "#FAF7F2" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: 64 }}>
        <img src={logo} width={560} height={85} alt="" />
        <div style={{ marginTop: 44, fontSize: 28, lineHeight: 1.3, color: "#E8D5C4", display: "flex", whiteSpace: "nowrap" }}>Lashes, Brows und Permanent Make-up</div>
        <div style={{ marginTop: 6, fontSize: 28, color: "#E8D5C4", display: "flex" }}>in Bruchsal und Jülich</div>
      </div>
      <img src={photo} width={480} height={630} alt="" style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
    </div>,
    { ...size },
  )
}
