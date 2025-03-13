import type { DisplayConfig } from "@/types/config"

export const displayConfig: DisplayConfig = {
  defaultZoom: 2, // Default zoom factor of 2 for all content
  removeColumnsBetweenClubAndFinish: true, // Remove columns between Club and Finish by default
  monitors: [
    {
      id: "monitor-1",
      name: "Monitor 1",
      urls: [
        "https://oresults.eu/events/1281?class=D19-T&leg=1&popup=true",
        "https://oresults.eu/events/1281?class=D19-T&leg=2&popup=true",
        "https://oresults.eu/events/1281?class=D19-T&leg=3&popup=true",
      ],
    },
    {
      id: "monitor-2",
      name: "Monitor 2 ",
      urls: [
        "https://oresults.eu/events/1100?class=Women+16&popup=true",
        "https://oresults.eu/events/1281?class=H19-T&leg=2&popup=true",
        "https://oresults.eu/events/1281?class=H19-T&leg=3&popup=true",
      ],
    },
  ],
}

