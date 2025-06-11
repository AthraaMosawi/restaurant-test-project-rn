# Good Food App

A mobile food ordering application built with React Native, allowing users to browse food categories, view detailed menu items, and manage a shopping cart with persistent data.

### Features

Browse Categories: Explore various food categories like Burgers, Breads, Desserts, and more.

View Menu Items: See detailed information for each food item, including price, description, and ratings.

Menu Cart: Add items to your cart, adjust quantities, and remove items.

Persistent Cart: Your cart contents are saved locally using AsyncStorage and reloaded on app launch.

Global Food Catalog: Efficiently manage a central, in-memory catalog of all food items using MobX-State-Tree Maps for quick lookups across different screens.

Centralized Header: A consistent navigation header across all screens, handling back navigation and cart access.

### Technologies Used

React Native: Cross-platform mobile development framework.
Expo: Framework for universal React applications.
MobX-State-Tree (MST): For robust and scalable state management.
React Navigation: For powerful navigation between app screens.
AsyncStorage: For local data persistence (e.g., shopping cart data).
TypeScript: For type-safe JavaScript development.
APIsauce: For streamlined API interactions.

### Getting Started

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites

Node.js & npm/Yarn: Ensure you have Node.js (and npm, which comes with Node.js) or Yarn installed.
Node.js Download
Yarn Installation
Expo CLI: Install the Expo CLI globally.
Bash

npm install -g expo-cli # or yarn global add expo-cli
Android Studio / Xcode: For running on emulators/simulators or physical devices.
Installation
Clone the repository:
Bash

git clone https://github.com/AthraaMosawi/restaurant-test-project-rn.git
cd your-project-name # Replace with your project's actual folder name
Install dependencies:
Bash

npm install # or yarn install
Running the App
Start the development server:

Bash

npm start # or expo start
This will open the Expo Dev Tools in your browser.

### Choose how to run:

iOS Simulator: Press i in the terminal or click "Run on iOS simulator" in the Expo Dev Tools.
Android Emulator: Press a in the terminal or click "Run on Android device/emulator" in the Expo Dev Tools.
Web Browser: Press w in the terminal or click "Run in web browser" in the Expo Dev Tools.
Physical Device: Scan the QR code from the terminal or Expo Dev Tools using the Expo Go app on your phone.
