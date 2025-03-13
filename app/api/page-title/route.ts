import { NextResponse } from "next/server"
import { load } from "cheerio"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()

    // Use cheerio to parse the HTML and extract the title
    const $ = load(html)

    // Get the title
    const title = $("title").text().trim()

    if (!title) {
      return NextResponse.json({ error: "No title found" }, { status: 404 })
    }

    return NextResponse.json({ title })
  } catch (error) {
    console.error("Error fetching title:", error)
    return NextResponse.json({ error: "Failed to fetch page title", details: error.message }, { status: 500 })
  }
}

