# The Period Purse

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

The Period Purse strives to achieve menstrual equity by providing people who menstruate with access to free menstrual products, and to reduce the stigma surrounding periods through public education and advocacy. This is their [website](https://www.theperiodpurse.com/).

**M.Nation has been launched on the iOS App Store, and you can download it [here](https://apps.apple.com/app/id1621201647).**

You can also find the M. Nation Android repo [here](https://github.com/uoftblueprint/the-period-purse-android?tab=readme-ov-file).

## For Developers

The [wiki](https://github.com/uoftblueprint/the-period-purse/wiki) has a lot of relevant information related to branching, PRs, etc that you should review!

# Table of Contents

- [The Period Purse](#the-period-purse)
  - [For Developers](#for-developers)
- [Table of Contents](#table-of-contents)
- [Setup Local Environment (Mac)](#setup-local-environment-mac)
- [Setup Local Environment (Windows/Linux)](#setup-local-environment-windowslinux)
  - [Windows](#windows)
  - [Linux](#linux)
- [Common Setup Errors](#common-setup-errors)

<a name="setup-mac"></a>

# Setup Local Environment (Mac)

Prerequisites:

Ensure you have the following prerequisites before trying to run the project locally:

- Node.js and npm (https://nodejs.org/en/download/). Alternatively, check if you have this by using command `node -v`
- Once you have Node.js and npm, run command `npm install -g expo-cli`
- You will need an iOS simulator. If you have a Macbook, its recommended you install XCode from the app store as it has a built in iOS simulator. If you have a Windows machine, unfortunately you will have to install a virtual machine to run the iOS simulator.

1. Clone this repository using `git clone https://github.com/uoftblueprint/the-period-purse.git`
2. cd into folder tpp-app `cd ./tpp-app`
3. run `npm install`
4. cd into folder ios `cd ./ios`
5. Install pods `pod install`
6. cd back out to tpp-app folder `cd ..`
7. Run the project using `npm run ios`
8. Install debugger with this [tutorial](https://github.com/uoftblueprint/the-period-purse/wiki/Installing-Debugger)
9. The simulator should open automatically and you should see something like the following image, with the Menstruation Nation app on the home screen:

<img width="378" alt="Screen Shot 2021-10-27 at 11 46 38 AM" src="https://user-images.githubusercontent.com/35851484/139100763-95605bfc-a224-401b-9f17-b3a5e0a3f3fb.png">

<a name="setup-windows-linux"></a>

# Setup Local Environment (Windows/Linux)

## Windows

Menstruation Nation does not support development on Windows. You may choose to create a virtual machine with a tutorial like this: [video](https://www.youtube.com/watch?v=Q55e2Tz-818).

## Linux

Follow this [tutorial](https://www.youtube.com/watch?v=c30RLycIpVY).

<a name="errors"></a>

# Common Setup Errors

Please check out the [wiki](https://github.com/uoftblueprint/the-period-purse/wiki/Common-Setup-Errors).

## Contributors

This project would not be possible without the combined efforts of the TPP Blueprint team (2024-2025):

[Merrick Liu](https://github.com/merrickliu888), [Paridhi Goel](https://github.com/paridhi26), [Patricia Santos](https://github.com/santoaast), [Helen Zhao](https://github.com/1zhaohel), [Mark Oh](https://github.com/marko0124), [Jack Fan](https://github.com/jackkfan0305)
