"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { displayConfig } from "@/config/displays"

interface MonitorSelectorProps {
  selectedMonitor: string
  onSelectMonitor: (monitorId: string) => void
}

export function MonitorSelector({ selectedMonitor, onSelectMonitor }: MonitorSelectorProps) {
  return (
    <div className="fixed top-2 right-2 z-50 bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-lg">
      <Select value={selectedMonitor} onValueChange={onSelectMonitor}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select monitor" />
        </SelectTrigger>
        <SelectContent>
          {displayConfig.monitors.map((monitor) => (
            <SelectItem key={monitor.id} value={monitor.id}>
              {monitor.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

