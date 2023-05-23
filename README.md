# EleNa: Elevation Navigation

## Overview

This web application calculates geographical routes that maximizes or minimizes elevation gain. Users may enter a starting point address, destination address, and bound that limits the total distance as a percentage of the shortest distance.

---

## Dependencies

This project uses the [Node.js](https://nodejs.org/en/about) runtime environment. Check if `node` is installed by running:

```
node --version
```

If `node` is not installed, or you have an out of date version (something less than v16), please visit the ["Downloading and Installing" Node.js and npm page](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) on the npm website for installation instructions.

Additonally, this project uses the [yarn](https://yarnpkg.com/) package manager. Please visit their [installation page](https://yarnpkg.com/getting-started/install) if you have not already installed yarn.

## Running on a Local Machine

In a terminal of your choice, navigate into the `cs520-elena` directory.

Then, install all dependencies with:

```sh
yarn install
```

After installing dependencies, run:

```sh
yarn dev
```

This will run the developer server, and open the web application in the browser with live updates to any changes in code.

## Running Test Suite
After installing all dependencies, navigate into the `cs520-elena` directory.

Run the test suite using:

```sh
yarn test
```

The tests will run and the results will be viewable in the terminal.