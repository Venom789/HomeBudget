# HomeBudget

## About

**Home Budget** is a Budget management application built using React Native (v0.72). It allows users to manage their daily expances with a range of features including adding new budget entry, editing existing ones, deleting entries.

## Getting Started

Before you can run the application, make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) instructions up to the "Creating a new application" step.

### Step 1: Start the Metro Server

To begin, start the Metro server, which is the JavaScript bundler that ships with React Native. Run the following command from the root of your project:

```bash
# using npm
npm start
```

### Step 2: Start Your Application
While the Metro Bundler is running in its own terminal, open a new terminal from the root of your project and use one of the following commands to start your application:

For Android
```bash
# using npm
npm run android
```

If everything is set up correctly, your React Native application should start running on your Android emulator or device.

### Features
Add New Budget Entery: Users can add new Budget Entery by providing details such as item name,planned amount & actual amount .

**Edit Entry**: Existing entries can be edited by modifying their details.

**Delete Entery**: Unwanted entries can be deleted from the list.


### Project Structure

The project's source code is organized into different components and screens, allowing for easy customization and extension. Here's a brief overview of the project structure:

**src/screens/**: Contains the main application screens, including "Budget Entery" and "Edit Entry & AllBudgetEntries."

**src/navigation/**: Defines the navigation stack and routing of the application.
