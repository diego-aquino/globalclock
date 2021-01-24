<h1 align="center">
  <img align="top" src="public/logo.svg" alt="TimeInCity" width="35px"> TimeInCity
</h1>

<p align="center">
  <i>
    :earth_africa: Check the local time and time zone of any city in the world
    <a href="https://timeincity.vercel.app">
      <img alt="Go to website" src="./.github/diagonal-arrow.svg" align="center">
    </a>
  </i>
</p>

<p align="center">
  <a href="https://github.com/diego-aquino">
    <img alt="Author" src="https://img.shields.io/badge/author-Diego%20Aquino-EDEFFC?labelColor=060A26">
  </a>
  <a href="https://github.com/diego-aquino/timeincity">
    <img alt="Top language" src="https://img.shields.io/github/languages/top/diego-aquino/timeincity.svg?color=EDEFFC&labelColor=060A26">
  </a>
  <a href="https://timeincity.vercel.app">
    <img alt="Website status" src="https://img.shields.io/website?down_color=yellow&down_message=offline&up_message=online&up_color=EDEFFC&url=https%3A%2F%2Ftimeincity.vercel.app&labelColor=060A26">
  </a>
  <br>
  <a href="./LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/diego-aquino/timeincity.svg?color=EDEFFC&labelColor=060A26">
  </a>
  <a href="https://github.com/diego-aquino/timeincity">
    <img alt="Stars" src="https://img.shields.io/github/stars/diego-aquino/timeincity.svg?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#gear-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-how-to-use">How to use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#bulb-learning-outcomes">Learning outcomes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#newspaper_roll-license">License</a>
</p>

---

<!-- <img alt="Demonstration GIF" src="./.github/demo.gif"> -->

## :rocket: Features

- Accurate time for any city around the world, along with information about the local time zone, supporting:
  - Searching cities by name, with autocomplete suggestions based on your entries.
  - Using the location you're currently at (real time geolocation).
- High-quality, dynamic, landscape images in the background, with proper attribution to the photographer.

## :gear: Technologies

- [TypeScript](https://www.typescriptlang.org)
- [React](https://reactjs.org/) + [Next.js](https://nextjs.org/)
- [Styled Components](https://styled-components.com/)
- Serverless functions (on [Vercel](https://vercel.com/home))
- [Luxon](https://moment.github.io/luxon/)
- [BlurHash](https://blurha.sh/)

### External APIs
- [HERE API](https://developer.here.com)
- [Unsplash API](https://unsplash.com/developers)

## :computer: How to use

<img align="center" src="public/logo.svg" alt="TimeInCity" width="15px"> <b>TimeInCity</b> is available at <a href="https://timeincity.vercel.app">https://timeincity.vercel.app</a>. Check it out!

## :bulb: Learning outcomes

I've learned a ton with this project, and some of my experiences and learning outcomes were associated with:

- Improving my skills with **TypeScript**, **React** and **Next.js**, by using them to build this project.
- Creating reusable, self-contained React components, to enhance the separation of concerns and simplify maintenance.
- Using the React [Context API](https://reactjs.org/docs/context.html), to allow efficient communication between pages and components.
- Using [Styled Components](https://styled-components.com/), a CSS-in-JS library useful to improve the styling workflow in React applications.
- Implementing serverless (lambda) functions, as a way to extend the services provided by the external APIs used. Serverless functions offer many benefits of servers, without having to build a full-fledged backend. In TimeInCity, they were used to create features tailored the needs of the app and to cache responses, preventing most rate-limiting issues and making the most external APIs.
- Integrating the app with:
  - [HERE API](https://developer.here.com), for features that rely on location data, such as searching cities by name, showing location suggestions based on the user entries, using the current coordinates to determine the user location, and retrieving information about time zones.
  - [Unsplash API](https://unsplash.com/developers), to show dynamic, high-quality images in the background of pages. 
- Showing a lightweight, [blur hash](https://blurha.sh/) version of images while loading. Once they are ready, the background will transition to the original image, enhancing the overall UX by not letting the background go blank.
- Keeping the layouts responsive to different screen sizes.
- Manipulating dates, time zones and offsets, with [Luxon](https://moment.github.io/luxon/) as well as built-in JavaScript date support.

## :newspaper_roll: License

This project if under **GNU GPLv3** license. Check [LICENSE](./LICENSE) for more information.

---

Made by with :heart: by [Diego Aquino](https://github.com/diego-aquino). [Let's connect!](https://www.linkedin.com/in/diego-aquino)
