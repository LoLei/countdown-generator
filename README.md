# Countdown Generator ⏳⏲️⏰

This is a web application to create, save, and share countdowns/timers.

## Use Case

Sometimes you may want to save a countdown to a specific date/time online, and
view it at a later time, as well as share it with other people, even watching it
at the same time at remote locations.  
Countdown Generator makes this possible. After you create a countdown, you can
copy the link on which the countdown can be viewed, and on which it is stored
indefinitely.

## Features

- Storage
- Sharing
- Mobile and desktop compatibility

### Coming Soon™

- [More features](https://github.com/LoLei/countdown-generator/issues/2)

## Technology

This app is built with:

- [Next.js](https://nextjs.org/)
  - Utilizing dynamic page routes, data fetching, and API routes, i.e. backend and frontend
- [node-json-db](https://www.npmjs.com/package/node-json-db)
  - Basically just a JSON file
- [mantine.dev](https://mantine.dev/)
  - UI components

## Deployment

The production instance is deployed to my [Kubernetes
cluster](k8s-dashboard.lolei.dev/) at
[countdown.lolei.dev](https://countdown.lolei.dev) via a [Tanka
specification](/k8s). Some parts of this specification will be moved to a
central location in the future and only imported here.

## Background

This app came into being when I wanted to share a countdown to a single
timestamp. I specifically did not look up potential existing apps that offer
this functionality since I figured this would be a nice holiday project to
occupy some time.
