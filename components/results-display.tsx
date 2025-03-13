"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Timer, Loader2, ZoomIn } from "lucide-react"
import { displayConfig } from "@/config/displays"
import { MonitorSelector } from "./monitor-selector"
import type { MonitorConfig } from "@/types/config"

const SCROLL_DURATION = 15000 // 15 seconds to scroll
const PAUSE_DURATION = 5000 // 5 seconds pause at bottom
const INITIAL_PAUSE = 3000 // 3 seconds pause after loading
const WEBSITE_DISPLAY_TIME = SCROLL_DURATION + PAUSE_DURATION
const SCROLL_STEP = 0.5 // pixels per frame

const getClassFromUrl = (url: string) => {
  try {
    const urlObj = new URL(url)
    return urlObj.searchParams.get("class") || ""
  } catch {
    return ""
  }
}

const getLegFromUrl = (url: string) => {
  try {
    const urlObj = new URL(url)
    return urlObj.searchParams.get("leg") || ""
  } catch {
    return ""
  }
}

export default function ResultsDisplay() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const rootDivRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const scrollAnimationRef = useRef<number>()
  const [selectedMonitor, setSelectedMonitor] = useState(displayConfig.monitors[0].id)
  const [currentMonitor, setCurrentMonitor] = useState<MonitorConfig>(displayConfig.monitors[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [pageTitle, setPageTitle] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(WEBSITE_DISPLAY_TIME)
  const [isActive, setIsActive] = useState(true)
  const [contentHeight, setContentHeight] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const [iframeHeight, setIframeHeight] = useState("100%")
  const [iframeReady, setIframeReady] = useState(false)
  const [currentZoom, setCurrentZoom] = useState(displayConfig.defaultZoom || 2)

  // Get current URL
  const currentUrl = currentMonitor.urls[currentIndex]

  // Get zoom factor for current URL
  // const getZoomFactor = useCallback((monitor: MonitorConfig, url: string): number => {
  //   // Check if there's a specific zoom factor for this URL
  //   if (monitor.zoomFactors && monitor.zoomFactors[url] !== undefined) {
  //     return monitor.zoomFactors[url]
  //   }
  //   // Otherwise use the default zoom
  //   return displayConfig.defaultZoom || 2
  // }, [])

  // Get root div reference on mount
  useEffect(() => {
    const rootElement = document.getElementById("root")
    if (rootElement && rootElement.firstElementChild instanceof HTMLDivElement) {
      rootDivRef.current = rootElement.firstElementChild
      setViewportHeight(rootDivRef.current.clientHeight)
    }
  }, [])

  // Function to get the height of the results table
  const getResultsTableHeight = useCallback((iframeDocument: Document): number => {
    try {
      // Find the table with class "results"
      const resultsTable = iframeDocument.querySelector("table.results")
      if (resultsTable) {
        // Get the height of the table
        const tableHeight = resultsTable.getBoundingClientRect().height
        console.log("Results table height:", tableHeight)
        return tableHeight
      }
    } catch (error) {
      console.error("Error getting results table height:", error)
    }
    return 0
  }, [])

  // Function to manually force scrolling
  const forceScrolling = useCallback(() => {
    if (wrapperRef.current) {
      const wrapper = wrapperRef.current

      // Force scrolling regardless of height calculations
      console.log("Forcing scroll animation")
      setIsScrolling(true)
    }
  }, [])

  // Handle iframe load and content measurement
  const handleIframeLoad = useCallback(() => {
    // Reset scroll position and iframe visibility state
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = 0
      setIsScrolling(false)
      setIframeReady(false) // Hide iframe content until manipulations are done

      // Update zoom factor for the current URL
      // const zoomFactor = getZoomFactor(currentMonitor, currentUrl)
      // setCurrentZoom(zoomFactor)
      // console.log(`Setting zoom factor to ${zoomFactor} for URL: ${currentUrl}`)

      // Wait for content to be fully loaded
      setTimeout(() => {
        try {
          if (wrapperRef.current && viewportHeight > 0) {
            const wrapper = wrapperRef.current
            const contentHeight = wrapper.scrollHeight
            const clientHeight = wrapper.clientHeight
            const scrollableHeight = contentHeight - clientHeight

            console.log("Scroll measurement:", {
              contentHeight,
              clientHeight,
              scrollableHeight,
              viewportHeight,
              currentZoom,
            })

            // Enable scrolling if content is taller than viewport
            if (scrollableHeight > 0) {
              console.log("Enabling scroll animation")
              setIsScrolling(true)
            } else {
              console.log("No scroll needed")
            }
          }
        } catch (error) {
          console.error("Error measuring content:", error)
          // Check if it's a SecurityError
          if (error instanceof DOMException && error.name === "SecurityError") {
            console.warn("SecurityError: Cannot access iframe content due to same-origin policy. Disabling scrolling.")
            setIsScrolling(false)
          } else {
            setIsScrolling(false)
          }
        }
      }, INITIAL_PAUSE)
    }
  }, [currentMonitor, currentUrl, viewportHeight, currentZoom])

  // Handle scrolling animation
  const startScrolling = useCallback(() => {
    if (!wrapperRef.current) return

    const wrapper = wrapperRef.current
    let startTime: number | null = null
    let pauseTimeout: NodeJS.Timeout

    // Adjust scroll step based on zoom factor
    const adjustedScrollStep = SCROLL_STEP / currentZoom

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp

      try {
        const maxScroll = wrapper.scrollHeight - wrapper.clientHeight

        if (wrapper.scrollTop < maxScroll && isScrolling) {
          wrapper.scrollTop += adjustedScrollStep
          scrollAnimationRef.current = requestAnimationFrame(animate)
        } else if (isScrolling) {
          // At the bottom, pause then reset
          clearTimeout(pauseTimeout)
          pauseTimeout = setTimeout(() => {
            if (isScrolling) {
              wrapper.scrollTop = 0
              startTime = null
              scrollAnimationRef.current = requestAnimationFrame(animate)
            }
          }, PAUSE_DURATION)
        }
      } catch (error) {
        console.error("Error during scroll animation:", error)
        // Check if it's a SecurityError
        if (error instanceof DOMException && error.name === "SecurityError") {
          console.warn("SecurityError: Cannot access iframe content due to same-origin policy. Disabling scrolling.")
          setIsScrolling(false)
          if (scrollAnimationRef.current) {
            cancelAnimationFrame(scrollAnimationRef.current)
          }
        }
      }
    }

    scrollAnimationRef.current = requestAnimationFrame(animate)

    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current)
      }
      clearTimeout(pauseTimeout)
    }
  }, [isScrolling, currentZoom])

  // Clean up scroll animation on unmount or when scrolling stops
  useEffect(() => {
    let cleanup: (() => void) | undefined

    if (isScrolling) {
      console.log("Starting scroll animation")
      cleanup = startScrolling()
    } else if (scrollAnimationRef.current) {
      console.log("Cleaning up scroll animation")
      cancelAnimationFrame(scrollAnimationRef.current)
    }

    return () => {
      if (cleanup) cleanup()
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current)
      }
    }
  }, [isScrolling, startScrolling])

  // Fetch page title
  const fetchPageTitle = useCallback(async (url: string) => {
    try {
      setIsLoading(true)
      setIframeReady(false) // Hide iframe when loading new content
      const response = await fetch(`/api/page-title?url=${encodeURIComponent(url)}`, {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.title) {
        setPageTitle(data.title)
      } else {
        setPageTitle("Loading results...")
      }
    } catch (error) {
      console.error("Failed to fetch page title:", error)
      setPageTitle("Loading results...")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update current monitor when selection changes
  useEffect(() => {
    const monitor = displayConfig.monitors.find((m) => m.id === selectedMonitor)
    if (monitor) {
      setCurrentMonitor(monitor)
      setCurrentIndex(0)
      setIsScrolling(false)
      setTimeRemaining(WEBSITE_DISPLAY_TIME)
      setIsActive(true)
      setIframeReady(false) // Hide iframe when changing monitor

      // Update zoom factor for the first URL
      // const zoomFactor = getZoomFactor(monitor, monitor.urls[0])
      // setCurrentZoom(zoomFactor)

      if (wrapperRef.current) {
        wrapperRef.current.scrollTop = 0
      }
      fetchPageTitle(monitor.urls[0])
    }
  }, [selectedMonitor, fetchPageTitle])

  // Handle timer and page rotation
  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isActive && !isLoading) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1000) {
            // Time's up, move to next page
            setCurrentIndex((prevIndex) => {
              const nextIndex = (prevIndex + 1) % currentMonitor.urls.length
              const nextUrl = currentMonitor.urls[nextIndex]

              // Update zoom factor for the next URL
              // const zoomFactor = getZoomFactor(currentMonitor, nextUrl)
              // setCurrentZoom(zoomFactor)

              // Fetch the next page's title
              fetchPageTitle(nextUrl)
              return nextIndex
            })
            // Reset timer
            return WEBSITE_DISPLAY_TIME
          }
          return prevTime - 1000
        })
      }, 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isActive, isLoading, currentMonitor, fetchPageTitle])

  // Update progress bar
  useEffect(() => {
    if (progressRef.current) {
      const progress = (timeRemaining / WEBSITE_DISPLAY_TIME) * 100
      progressRef.current.style.width = `${100 - progress}%`
    }
  }, [timeRemaining])

  // Add this after the other useEffects
  useEffect(() => {
    // Reset iframe ready state when URL changes
    setIframeReady(false)

    // Try to modify iframe content after a short delay to ensure it's loaded
    const modifyIframeContent = () => {
      if (iframeRef.current) {
        try {
          const iframe = iframeRef.current
          const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document

          if (iframeDocument) {
            // Find all table headers and replace "Finish" with "Ziel"
            const tableHeaders = iframeDocument.querySelectorAll("th, td")
            tableHeaders.forEach((header) => {
              if (header.textContent === "Finish") {
                header.textContent = "Ziel"
                console.log('Replaced "Finish" with "Ziel" in table header')
              }
            })

            // Find and hide the "Bib" and "start" columns
            const tables = iframeDocument.querySelectorAll("table")
            tables.forEach((table) => {
              const headers = table.querySelectorAll("th")
              let bibColumnIndex = -1
              let startColumnIndex = -1

              // Find the indices of the "Bib" and "start" columns
              headers.forEach((header, index) => {
                const headerText = header.textContent?.trim().toLowerCase() || ""
                if (headerText === "bib") {
                  bibColumnIndex = index
                  console.log('Found "Bib" column at index:', bibColumnIndex)
                }
                if (headerText === "start") {
                  startColumnIndex = index
                  console.log('Found "start" column at index:', startColumnIndex)
                }
              })

              // Create a style element to hide the columns
              const styleEl = iframeDocument.createElement("style")
              let cssRules = ""

              // Add CSS for "Bib" column if found
              if (bibColumnIndex !== -1) {
                cssRules += `
                  table tr th:nth-child(${bibColumnIndex + 1}),
                  table tr td:nth-child(${bibColumnIndex + 1}) {
                    display: none !important;
                  }
                `
                console.log('Added CSS to hide "Bib" column')
              }

              // Add CSS for "start" column if found
              if (startColumnIndex !== -1) {
                cssRules += `
                  table tr th:nth-child(${startColumnIndex + 1}),
                  table tr td:nth-child(${startColumnIndex + 1}) {
                    display: none !important;
                  }
                `
                console.log('Added CSS to hide "start" column')
              }

              // Apply the CSS if we found any columns to hide
              if (cssRules) {
                styleEl.textContent = cssRules
                iframeDocument.head.appendChild(styleEl)
              }
            })

            // Apply zoom factor to the content
            const bodyElement = iframeDocument.body
            if (bodyElement) {
              bodyElement.style.transformOrigin = "top left"
              bodyElement.style.transform = `scale(${currentZoom})`
              bodyElement.style.width = `${100 / currentZoom}%`

              // Add some bottom padding to ensure scrolling works correctly after scaling
              bodyElement.style.paddingBottom = "100px"

              console.log(`Applied zoom factor of ${currentZoom} to iframe content`)
            }

            // Get the height of the results table
            const tableHeight = getResultsTableHeight(iframeDocument)

            if (tableHeight > 0) {
              // Calculate the scaled height and add some buffer
              const scaledHeight = tableHeight * currentZoom + 200 // Add 200px buffer
              console.log("Setting iframe height to:", scaledHeight)
              setIframeHeight(`${scaledHeight}px`)

              // Check if the content is taller than the viewport
              if (scaledHeight > (viewportHeight || window.innerHeight)) {
                console.log("Content is taller than viewport, enabling scrolling")
                forceScrolling()
              }
            }

            // Show the iframe content now that manipulations are complete
            setIframeReady(true)
            console.log("Iframe content manipulations complete, showing content")
          }
        } catch (error) {
          console.log("Could not modify iframe content in effect:", error)
          // Check if it's a SecurityError
          if (error instanceof DOMException && error.name === "SecurityError") {
            console.warn("SecurityError: Cannot access iframe content due to same-origin policy.")
            // Show the iframe anyway if we can't modify it due to security restrictions
            setIframeReady(true)
          }
        }
      }
    }

    // Try multiple times with increasing delays to catch when content is fully loaded
    const timers = [
      setTimeout(modifyIframeContent, 1000),
      setTimeout(modifyIframeContent, 2000),
      setTimeout(modifyIframeContent, 3000),
      setTimeout(() => {
        // Force scrolling after all attempts and ensure iframe is visible
        forceScrolling()
        setIframeReady(true) // Make sure iframe is visible even if manipulations failed
      }, 4000),
    ]

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [currentMonitor.urls[currentIndex], forceScrolling, getResultsTableHeight, viewportHeight, currentZoom])

  return (
    <>
      <MonitorSelector selectedMonitor={selectedMonitor} onSelectMonitor={setSelectedMonitor} />
      <Card className="w-full bg-slate-900">
        <CardHeader className="bg-slate-800 py-2 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-center text-white flex-1">
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  {`${getClassFromUrl(currentMonitor.urls[currentIndex])}${
                    getLegFromUrl(currentMonitor.urls[currentIndex])
                      ? ` (Strecke ${getLegFromUrl(currentMonitor.urls[currentIndex])})`
                      : ""
                  }` || "No class specified"}
                  <div className="text-xs text-slate-400 mt-1 break-all">URL: {currentMonitor.urls[currentIndex]}</div>
                </>
              )}
            </CardTitle>
            <div className="flex items-center gap-2 min-w-[150px]">
              <div className="flex items-center mr-3">
                <ZoomIn className="h-4 w-4 text-slate-400 mr-1" />
                <span className="text-sm text-slate-400">{currentZoom}x</span>
              </div>
              <Timer className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-400">
                {Math.ceil(timeRemaining / 1000)}s / {WEBSITE_DISPLAY_TIME / 1000}s
              </span>
            </div>
          </div>
          <div className="h-1 mt-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-white transition-[width] duration-1000 ease-linear"
              style={{ width: "0%" }}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div
            ref={wrapperRef}
            className="relative w-full overflow-auto bg-slate-900 scrollbar-hide"
            style={{
              height: viewportHeight ? `${viewportHeight}px` : "100vh",
              maxHeight: viewportHeight ? `${viewportHeight}px` : "100vh",
            }}
          >
            {/* Loading overlay */}
            {!iframeReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
                <div className="flex flex-col items-center">
                  <Loader2 className="h-8 w-8 text-white animate-spin mb-2" />
                  <p className="text-white">Loading results...</p>
                </div>
              </div>
            )}

            <iframe
              ref={iframeRef}
              key={`${currentMonitor.id}-${currentIndex}`}
              src={currentMonitor.urls[currentIndex]}
              className={`w-full border-none scrollbar-hide transition-opacity duration-300 ${iframeReady ? "opacity-100" : "opacity-0"}`}
              style={{
                height: iframeHeight,
                minHeight: "100%",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              title={pageTitle || "Results"}
              onLoad={handleIframeLoad}
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

