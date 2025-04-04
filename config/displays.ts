import type { DisplayConfig } from "@/types/config"

export const displayConfig: DisplayConfig = {
  defaultZoom: 2, // Default zoom factor of 2 for all content
  removeColumnsBetweenClubAndFinish: true, // Remove columns between Club and Finish by default
  monitors: [
    {
      id: "einzel-1",
      name: "Einzel Jugend",
      urls: [
        "https://oresults.eu/events/1707?class=D%2FH12b&popup=true",
        "https://oresults.eu/events/1707?class=D12&popup=true",
        "https://oresults.eu/events/1707?class=H12&popup=true",
        "https://oresults.eu/events/1707?class=D14&popup=true",
        "https://oresults.eu/events/1707?class=H14&popup=true",
        "https://oresults.eu/events/1707?class=D16&popup=true",
        "https://oresults.eu/events/1707?class=H16&popup=true",
        "https://oresults.eu/events/1707?class=D18&popup=true",
        "https://oresults.eu/events/1707?class=H18&popup=true",
      ],
    },


    {
      id: "einzel-2",
      name: "Einzel Elite",
      urls: [
        "https://oresults.eu/events/1707?class=HE&popup=true",
        "https://oresults.eu/events/1707?class=DE&popup=true",
      ],
    },

    {
      id: "einzel-3",
      name: "Einzel Senioren 1",
      urls: [
        "https://oresults.eu/events/1707?class=H35&popup=true",
        "https://oresults.eu/events/1707?class=D35&popup=true",
        "https://oresults.eu/events/1707?class=H45&popup=true",
        "https://oresults.eu/events/1707?class=D45&popup=true",
        "https://oresults.eu/events/1707?class=H55&popup=true",
        "https://oresults.eu/events/1707?class=D55&popup=true",
      ],
    },
    {
      id: "einzel-4",
      name: "Einzel Senioren 2",
      urls: [

        "https://oresults.eu/events/1707?class=H65&popup=true",
        "https://oresults.eu/events/1707?class=D65&popup=true",
        "https://oresults.eu/events/1707?class=H70&popup=true",
        "https://oresults.eu/events/1707?class=D70&popup=true",
        "https://oresults.eu/events/1707?class=H75&popup=true",
        "https://oresults.eu/events/1707?class=D75&popup=true",
        "https://oresults.eu/events/1707?class=H80&popup=true",
        "https://oresults.eu/events/1707?class=H85&popup=true",
        "https://oresults.eu/events/1707?class=DirKS&popup=true",
        "https://oresults.eu/events/1707?class=DirKL&popup=true",
      ],
    },
    {
      id: "einzel-5",
      name: "Einzel Feed",
      urls: [
        "https://oresults.eu/events/1707?view=LiveFeed&popup=true",
      ],
    },
    {
      id: "staffel-1",
      name: "Strecke 1",
      urls: [
        "https://oresults.eu/events/1708?class=D%2FH-12+Team&leg=1&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH-16+Team&leg=1&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH19-+Team&leg=1&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH135+Team&leg=1&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH180+Team&leg=1&popup=true",
        "https://oresults.eu/events/1708?class=Offen+Team&leg=1&popup=true",

      ],
    },
    ,
    {
      id: "staffel-2",
      name: "Strecke 2",
      urls: [
        "https://oresults.eu/events/1708?class=D%2FH-12+Team&leg=2&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH-16+Team&leg=2&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH19-+Team&leg=2&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH135+Team&leg=2&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH180+Team&leg=2&popup=true",
        "https://oresults.eu/events/1708?class=Offen+Team&leg=2&popup=true",

      ],
    },
    ,
    {
      id: "staffel-3",
      name: "Strecke 3",
      urls: [
        "https://oresults.eu/events/1708?class=D%2FH-12+Team&leg=3&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH-16+Team&leg=3&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH19-+Team&leg=3&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH135+Team&leg=3&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH180+Team&leg=3&popup=true",
        "https://oresults.eu/events/1708?class=Offen+Team&leg=3&popup=true",

      ],
    },
    ,
    {
      id: "staffel-4",
      name: "Strecke 4",
      urls: [
        "https://oresults.eu/events/1708?class=D%2FH-16+Team&leg=4&popup=true",
        "https://oresults.eu/events/1708?class=D%2FH19-+Team&leg=4&popup=true",

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

