# Elder Scrolls: Legends

[![CI](https://github.com/WrathOfZombies/elder-cards/workflows/CI/badge.svg)](https://github.com/WrathOfZombies/elder-cards/actions?query=workflow%3ACI)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Overview

The project renders a list of cards downloaded from the ["https://api.elderscrollslegends.io/v1"]("https://api.elderscrollslegends.io/v1") API.
View demo on YouTube: [https://youtu.be/Ydhe5Ng5UcQ](https://youtu.be/Ydhe5Ng5UcQ)

### Tech Stack

| Library               | Usage                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------- |
| React                 | UI Framework                                                                              |
| FluentUI              | A component library that supports theming and is accessible                               |
| Apollo                | Brings in powerful tools for us to manage client state and simply fetching of information |
| React Window          | UI Virtualization library                                                                 |
| React Infinite Loader | Inifinite loader library that works with React Window                                     |

### Running the project

1. Clone the repository
2. In the root folder of the clone repo, run `yarn`
3. Run `yarn start` and open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Project Navigation

#### Apollo
All the apollo code WRT to the resolvers and the client configuration can be found in the [Apollo](.\src\apollo\client.ts) folder. The actual data fetching logic is implemented in the `fetch-cards.ts` file and the client schema is represented in `schema.graphql`

#### Components

The starting point is the `elder-cards-app` file where we create the `ThemeProvider` and the `ApolloProvider`. From there `cards-layout` is rendered which then splits different complexities into different components.

### Considerations

The choice of Apollo was to achieve some of the advanced orchestration that is involved when working with paging, searching and filtering of information.

Additionally there's a lazy loading implementation available for images that was done to:
1. Save network bandwidth when images are not being cached by the browser automatically
2. Optimize the loading behaviour by silently swapping a placeholder to the final image when downloaded.

You can switch the theme of the page by using `ALT + T` or `OPT + T`.

## Areas of improvement

1. Tests are incomplete. There seem to be mulitple issues with the combination of Enzyme, React 16.3+ and Apollo. I spent a while trying to debug this and ultimately decided to cut it due to meet the deadline. There are some tests in place to give an example of the general pattern that was followed.

2. I18n implementation had to be skipped but A11y was considered with rudimentary support for Windows Narrator.

3. A more advanced search can be implemented given enough time

4. Blobs of images can be switched to using service worker to build a PWA instead of the current implementation

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
