# Expo Boilerplate

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/sorioinc/expo-boilerplate">
    <img src="images/user-interface.png" alt="Logo">
  </a>
  <h3 align="center">Expo Boilerplate</h3>
</p>

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Windows](#windows)
    - [Mac](#macoS)
    - [Install NPM packages](#install-npm-packages)
- [Usage](#usage)
  - [Gitflow](#gitflow)
  - [Style Guide](#style-guide)
  - [Testing](#testing)
- [To Do](#to-do)
- [Known Issues](#known-issues)
- [Contributors](#contributors)

## About The Project

[![Expo Boilerplate][product-screenshot-1]](https://github.com/sorioinc/expo-boilerplate)

This boilerplate lays a foundation for some of the most requested features in an app, with your help it can get much better.

### Built With

This boilerplate was created with these awesome open source technologies

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.io/)
- [date-fns](https://date-fns.org/)
- [@react-native-community]()
- [i18next](https://www.i18next.com/)
- [React Native Paper](https://reactnativepaper.com/)
- [Software Mansion RN Libraries](https://github.com/software-mansion)
- [React Native Shared Element](https://github.com/IjzerenHein/react-native-shared-element)
- [SQLite](https://www.sqlite.org)
- [TypeORM](https://typeorm.io)
- [Redux](https://redux.js.org)
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [Typescript](https://www.typescriptlang.org)
- [Lottie](https://airbnb.design/lottie/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Getting Started

You'll find all the steps to make this project work in MacOS or Windows below. This repo has Visual Studio Code settings, however you may use this project in the code editor of your choice.

### Prerequisites

- iOS builds can only happen in MacOS, while Android can run in Windows or Mac.
- You will obviously need NodeJS installed in the system. We suggest you use a node version manager like `nvm`.
- A git client would be a great addition to your development process.

  > Find the setup instructions in the sections below.

### Installation

#### Windows

1. nvm for Windows
   Download and Install - https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows
2. Install Chocolatey, follow the instructions from: https://chocolatey.org/install
3. Install Android Studio Tools
   - Go to [Android Studio Download page](https://developer.android.com/studio#downloads), navigate to Download Options and scroll to `Command line tools only`.
   - Select the Windows download link
4. Install git
   ```powershell
   choco install git
   ```

#### MacOS

1. Install nvm

   https://github.com/nvm-sh/nvm

   ```
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.0/install.sh | bash
   ```

   Follow the directions to add the enviroment variables, then run the following to install :

   ```sh
   nvm use 14
   ```

   Optionally run this to make it default:

   ```sh
   nvm alias default 14
   ```

2. Install Homebrew

   https://brew.sh/

   ```sh
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
   ```

3. Install XCode
   - Open AppStore in your MacOS and look for XCode. After installing open XCode and accept the license agreement.
   - Open a terminal and run this command, it will install developer tools including a git client:
   ```sh
   xcode-select --version
   ```
4. Install Android SDK or Android Studio (optional)
   The easiest way to have your Android dev environment up and running is by installing Android Studio, but if you rather not follow the following tutorial:
   https://medium.com/swlh/react-native-complete-setup-without-an-android-studio-xcode-97b6f25624a0

   ```sh
   brew cask install adoptopenjdk/openjdk/adoptopenjdk8
   brew cask install android-sdk
   sdkmanager "platforms;android-23" "build-tools;23.0.1" "add-ons;addon-google_apis-google-23"
   ```

   > The above will also download Android 6. React Native supports Android 4.1+ and Expo Android 5+.

   Before running `sdkmanager` set the JAVE_HOME environment variable as instructed in this [link](https://stackoverflow.com/a/29456721). For more information about `sdkmanager` please refer to its [documentation](https://developer.android.com/studio/command-line/sdkmanager). Also this [gist](https://gist.github.com/agrcrobles/165ac477a9ee51198f4a870c723cd441) contains useful commands to setup your environment.
   Remember, both `ANDROID_HOME` and `ANDROID_SDK` must have the same values.

   > After installing either way, go through these steps to configure the required environment variables: https://docs.expo.io/workflow/android-studio-emulator/.

5. Install Expo CLI

   https://docs.expo.io/get-started/installation/

   ```sh
   npm install --global expo-cli
   ```

6. Install watchman

   https://facebook.github.io/watchman/docs/install#buildinstall

   ```sh
   brew install watchman
   ```

7. React Native Debugger (optional)

   https://github.com/jhen0409/react-native-debugger

   ```sh
   brew cask install react-native-debugger
   ```

8. SQLite Browser (optional)

   https://sqlitebrowser.org/

   ```sh
   brew cask install db-browser-for-sqlite
   ```

#### Install NPM packages

```sh
npm install
```

4. Enter your API in `config.js`

```JS
const API_KEY = 'ENTER YOUR API';
```

## Debugging

### React Native Debugger

https://docs.expo.io/workflow/debugging/

Basic debugging can be done by our old friend `console.log`. However if you installed React Native Debugger from the instructions above you can track Redux state, inspect Component tree and also see the development console.

1. Start `React Native Debugger`
2. In the menu, go to and click `Debugger > New Window`
3. Make sure port `19001` is entered. You can now close the first window.
4. In the Expo app running in the simulator or your device, open the Expo menu and select `Debug Remote JS`.
5. The app will restart and plug into the React Native Debugger

### SQLite

If you installed the DB Browser for SQL, you can query a SQLite file to shape it in the way you need the app. By prepopulating data and setting it, or grabbing the database from the simulator and opening it with this tool.
To find the current database used the the simulator instance in iOS, please refer to this [link](https://stackoverflow.com/a/47856712/1255304).

## Usage

### Gitflow

To collaborate and work with your peers we use Gitflow, which consists of branching off the `dev` branch to work on a `feature` branch. When the feature is ready, it must be merged back to `dev` through a `pull request` which will be reviewed by other developers before getting merged.

There are three different environments, represented each by one separate branches: `dev`, `staging` and `master`. They are progressively merged one to another in the following order `dev` > `staging` > `master`.

### Style Guide

This project enforces coding style through ESLint and formatting with Prettier. ESLint has different recommended configurations such as Airbnb, React Native Community, React, Redux, Hooks among others. For more information please check `.eslintrc.json` file.

Linting and formatting are ran before each commit by husky + lint-staged, but you can also run them at any time by executing the following commands:

```sh
npm run lint
```

```sh
npm run format
```

### Run App

- iOS

```sh
npm run ios
```

- Android

```sh
npm run ios
```

### Testing

At the time of this writing, testing has not been configured. But you're welcomed to submit a PR. We prefer Jest + @testing-library/react-native.

## To Do

- Implementing needed for:

  - Axios
  - Sentry
  - Flurry
  - Expo Push Notifications
  - Deep Linking
  - Saving secrets (tokens, api keys, etc.)

- Improve setup instructions for MacOS.
- Finish setup instructions for Windows.

## Known Issues

- TypeORM version:
  - At the time of this writing, TypeORM version 0.2.29 throws a runtime error caused by JavascriptCore not supporting regex lookbehind. This is being tracked in the following Github [issue](https://github.com/typeorm/typeorm/issues/7026).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/sorioinc"><img src="https://avatars2.githubusercontent.com/u/6693933?v=4" width="100px;" alt=""/><br /><sub><b>Oscar Soriano</b></sub></a><br /><a href="https://github.com/sorioinc/soyspspositivo/commits?author=sorioinc" title="Code">💻</a></td>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<p align="center">
   <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
   <div>Template based off <a href="https://github.com/othneildrew/Best-README-Template"><strong>Best README Template</strong></a></div>
</p>
<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot-1]: images/screen-recording.gif
