# Guitar Shop App

This project was created as part of my application for internship to demonstrate skills in React, GraphQL, and basic front-end development. The application allows users to browse guitar brands, see available models for each brand, and view detailed information about individual guitars. The data is fetched from a GraphQL backend using Apollo Client.

## How to Set Up and Run the Project

To run the project on your machine, make sure you have Node.js installed (preferably version 16 or higher).

1. Clone the repository to your local machine:
   git clone https://github.com/cvetanoskip/Guitar-shop.git

Then navigate into the project folder:
cd Guitar-shop .

2. Install dependencies:
   npm install
   This will install all required packages listed in `package.json`.
3. Start the development server:
   npm start .
   This will start the app in development mode. You can open it in your browser at:
   http://localhost:3000
4. Making changes:  
   When you save changes to the code, the browser will automatically reload the page. Any build errors will appear in the console.

5. Building for production:  
    To create an optimized build for deployment, run:
   npm run build .
   This will generate a `build` folder with the production version of the app.

## Project Overview

The application has three main pages:

- **Brands Page** – Lists guitar brands with their logos and some basic information.
- **Models Page** – Shows all models for a selected brand, with search, filter, and sort options. Uses infinite scroll to load more models.
- **Guitar Details Page** – Displays specifications and musician information for a selected guitar.

The project also includes a footer with navigation links and social media icons.

## Notes for Reviewers

This project is intended as a learning exercise. The goal was to understand how to work with:

- React components and state management
- React Router for navigation between pages
- Apollo Client for querying a GraphQL API
- Filtering, searching, and sorting data on the client side
- Implementing infinite scrolling for loading more items dynamically
- Structuring a React project in a way that is easy to follow

## Author

Petar Cvetanoski
pcvetanoski@yahoo.com
