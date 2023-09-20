# NGKast - Podcast Discovery Website

Welcome to NGKast, a podcast discovery website that allows users to explore, listen to, and share their favorite podcasts. NGKast is built with a combination of technologies, including React for the front end, Node.js for the back end, and PostgreSQL for the database.

## Overview

NGKast aims to provide an intuitive and user-friendly platform for discovering podcasts across various genres. Whether you're a podcast enthusiast or new to the world of podcasts, NGKast offers a seamless experience to explore and enjoy your favorite shows.

## Features

- **User Registration and Login**: Users can create accounts and log in securely to access personalized features.

- **Podcast Search**: Easily search for podcasts by title, genre, or keyword.

- **Episode Streaming**: Listen to episodes directly on the platform without the need to leave the site.

- **User Profiles**: Customize your profile, manage subscriptions, and keep track of your listening history.

## Technologies Used

- **Front End**: NGKast's user interface is built using React, a popular JavaScript library for building user interfaces. We've used React to create a responsive and dynamic web application.

- **Back End**: Node.js serves as the back end technology, handling user authentication, database interactions, and routing. We've built a RESTful API to ensure smooth communication between the front end and the server.

- **Database**: PostgreSQL, managed through pgAdmin, is used to store user profiles, podcast data, and other essential information.

- **Authentication**: We've implemented secure user authentication to protect user data and ensure that only registered users can access certain features.

## Getting Started

To run NGKast locally on your machine, follow these steps:

1. Clone the NGKast repository to your local machine.

2. Navigate to the project directory.

3. Install the necessary dependencies for both the front end and back end:
   ```
   cd client
   npm install
   cd ../server
   npm install
   ```

4. Configure your PostgreSQL database and update the connection settings in the server's `.env` file.

5. Start the server:
   ```
   cd server
   npm start
   ```

6. Start the front-end development server:
   ```
   cd client
   npm start
   ```

7. Open your web browser and navigate to `http://localhost:3000` to access NGKast.

## Contributing

We welcome contributions from the open-source community. If you'd like to contribute to NGKast, please follow our [Contribution Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact the NGKast development team at [contact@ngkast.com](mailto:contact@ngkast.com).

Thank you for using NGKast! Happy podcasting!
