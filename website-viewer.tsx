"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample websites array - replace with your sport results websites
const WEBSITES = [
  {
    url: "https://example.com/sports1",
    title: "Sports Results 1",
  },
  {
    url: "https://example.com/sports2",
    title: "Sports Results 2",
  },
  {
    url: "https://example.com/sports3",
    title: "Sports Results 3",
  },
]

const SCROLL_SPEED = 1 // pixels per frame
const WEBSITE_DISPLAY_TIME = 30000 // 30 seconds per website

export default function WebsiteViewer() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentTitle, setCurrentTitle] = useState(WEBSITES[0].title)
  const [isScrolling, setIsScrolling] = useState(true)

  // Handle auto-scrolling
  useEffect(() => {
    let animationFrameId: number
    let startTime: number

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      if (iframeRef.current) {
        const iframe = iframeRef.current
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document

        if (iframeDocument) {
          const maxScroll = iframeDocument.documentElement.scrollHeight - iframeDocument.documentElement.clientHeight
          const currentScroll = iframeDocument.documentElement.scrollTop

          if (currentScroll < maxScroll && isScrolling) {
            iframeDocument.documentElement.scrollTop += SCROLL_SPEED
            animationFrameId = requestAnimationFrame(scroll)
          } else {
            setIsScrolling(false)
          }
        }
      }
    }

    if (isScrolling) {
      animationFrameId = requestAnimationFrame(scroll)
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isScrolling])

  // Handle website rotation
  useEffect(() => {
    const rotateWebsite = () => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % WEBSITES.length
        setCurrentTitle(WEBSITES[nextIndex].title)
        setIsScrolling(true)
        return nextIndex
      })
    }

    const timer = setTimeout(rotateWebsite, WEBSITE_DISPLAY_TIME)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{currentTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video w-full bg-muted">
          <iframe
            ref={iframeRef}
            src={WEBSITES[currentIndex].url}
            className="w-full h-full border-none"
            title={currentTitle}
          />
        </div>
      </CardContent>
    </Card>
  )
}

