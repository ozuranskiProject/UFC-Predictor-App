# UFC-Predictor-App (iteration 1)

## Overview
This project is an application that estimates/predicts the outcome of a hypothetical UFC fight between two fighters based on scraped historical statistics fed into a custom algorithm. It provides a simple interface for users to select fighters by gender/weight class, and calculates win probabilities using stat-weighting in said custom algorithm. The goal is to offer any fans, fight nerds, and evaluators an engaging and data-driven way to explore hypothetical matchups.

## Features
This project uses real fight statistics collected via web scraping to make predictions without relying on any external APIs. Stats are weighted based on their correlation with past fight outcomes, and the interface is designed to be simple, fast, clear, and easy to use. The goal is to have it look professional, using other sports metrics apps, like ESPN’s app, “The Pacer’s App,” etc. as *reference*.

## How It Works
- Choose a gender/weight class from the top scroll bar  
- Pick two fighters from dropdown menus (only a sample of fighters will be used for now for each weightclass)
  - Directly after inputting fighter, the fighter's profile image will be pulled and displayed (rather than storing every fighter's photo, of course)  
- Press a button or hit Enter/“Fight!” to run the simulation and view:  
  - Win probabilities for each fighter  
  - A stat-by-stat comparison  
  - Graphs or visuals for better insight  

## Target Users
- UFC fans curious about “what-if” fights  
- Students exploring sports analytics or data visualization  
- Design and engineering evaluators interested in user experience and algorithm logic  
- (Recruiters who want to hire me...)  

## Limitations
The tool only uses stat averages available from each fighter’s most recent fight for the first iteration of the app, so it cannot yet simulate “prime” versions or filter by time period. Data inconsistencies may occur for lesser-known or older fighters due to limitations in web scraping sources.

## Future Plans
There are plans to expand fighter selection with search functionality rather than just a sample, add prediction details like finish method or round, introduce filters for fight type (e.g., 3-round vs. 5-round), and implement an Elo display system (or even factor in calculated elo into fight win calculations). Support for other sports like boxing or kickboxing could also be added.

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
