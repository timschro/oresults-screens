export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return new Response("URL is required", { status: 400 })
  }

  try {
    // Forward the request to the target URL
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Get the response content
    const content = await response.arrayBuffer()

    // Create new headers
    const headers = new Headers()

    // Copy original headers
    response.headers.forEach((value, key) => {
      if (!["content-encoding", "content-security-policy", "x-frame-options"].includes(key.toLowerCase())) {
        headers.set(key, value)
      }
    })

    // Set security headers to allow iframe embedding
    headers.set("Access-Control-Allow-Origin", "*")
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS")
    headers.set("Access-Control-Allow-Headers", "*")
    headers.set("Cross-Origin-Embedder-Policy", "unsafe-none")
    headers.set("Cross-Origin-Opener-Policy", "unsafe-none")
    headers.set("Cross-Origin-Resource-Policy", "cross-origin")

    // Return the response with modified headers
    return new Response(content, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Error proxying content:", error)
    return new Response("Failed to proxy content", { status: 500 })
  }
}

