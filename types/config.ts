export interface MonitorConfig {
  id: string
  name: string
  urls: string[]
}

export interface DisplayConfig {
  monitors: MonitorConfig[]
  defaultZoom: number // Default zoom factor for all content
  removeColumnsBetweenClubAndFinish: boolean // Whether to remove columns between Club and Finish
}

