"use client"

import { useEffect, useState } from "react"
import { Select, SelectItem } from "@/components/ui/select"
import { displayConfig } from "@/config/displays"

interface MonitorSelectorProps {
  selectedMonitor: string
  onSelectMonitor: (monitorId: string) => void
}

export function MonitorSelector({ selectedMonitor, onSelectMonitor }: MonitorSelectorProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed top-2 right-2 z-50 bg-slate-800/90 backdrop-blur-sm p-2 rounded-lg shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } hover:opacity-100`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <Select
        value={selectedMonitor}
        onValueChange={onSelectMonitor}
        className="w-[200px] bg-slate-900 text-white border-slate-700 hover:bg-slate-800 focus:bg-slate-800"
      >
        <SelectItem value="" disabled>
          Select monitor
        </SelectItem>
        {displayConfig.monitors.map((monitor) => (
          <SelectItem key={monitor.id} value={monitor.id}>
            {monitor.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}

