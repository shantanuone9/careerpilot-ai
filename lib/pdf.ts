import { extractText } from "unpdf";

export async function extractPdfText(buffer: Buffer): Promise<string> {
  const result = await extractText(new Uint8Array(buffer));

  return result.text.join("\n");
}