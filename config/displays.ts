import type { DisplayConfig } from "@/types/config"

export const displayConfig: DisplayConfig = {
  defaultZoom: 2, // Default zoom factor of 2 for all content
  removeColumnsBetweenClubAndFinish: true, // Remove columns between Club and Finish by default
  monitors: [
    
    {
      id: "staffel-1",
      name: "Jugend 1",
      urls: [
        "https://oresults.eu/events/1708?class=D%2FH-12+Team&leg=1&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH-16+Team&leg=1&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH-12+Team&leg=2&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH-16+Team&leg=2&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH-12+Team&leg=3&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH-16+Team&leg=3&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH-16+Team&leg=4&popup=true",

      ],
    },
    {
      id: "staffel-2",
      name: "Elite 2 2",
      urls: [
        "https://oresults.eu/events/1708?class=D%2FH19-+Team&leg=1&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH19-+Team&leg=2&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH19-+Team&leg=3&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH19-+Team&leg=4&popup=true",

      ],
    },
    {
      id: "staffel-3",
      name: "Senioren 3",
      urls: [
        "https://oresults.eu/events/1708?class=D%2FH135+Team&leg=1&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH180+Team&leg=1&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH135+Team&leg=2&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH180+Team&leg=2&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH135+Team&leg=3&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH180+Team&leg=3&popup=true",

      ],
    },
    
  
    {
      id: "staffel-5",
      name: "Staffel Feed",
      urls: [
        "https://oresults.eu/events/1708?view=LiveFeed&popup=true",
      ],
    },


  ],
}

