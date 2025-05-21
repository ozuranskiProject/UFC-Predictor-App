# UFC-Predictor-App

## Overview
This project is an application that estimates/predicts the outcome of a hypothetical UFC fight between two fighters based on scraped historical statistics fed into a custom algorithm. It provides a simple interface for users to select fighters by gender/weight class, and calculates win probabilities using stat-weighting in said custom algorithm. The goal is to offer any fans, fight nerds, and evaluators an engaging and data-driven way to explore hypothetical matchups.

## Features
This project uses real fight statistics collected via web scraping to make predictions without relying on any external APIs. Stats are weighted based on their correlation with past fight outcomes, and the interface is designed to be simple, fast, clear, and easy to use. The goal is to have it look professional, using other sports metrics apps, like ESPN’s app, “The Pacer’s App,” etc. as *reference*.

## How It Works
- Choose a gender/weight class from the top scroll bar  
- Pick two fighters from dropdown menus (only a sample of fighters will be used for now)  
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
