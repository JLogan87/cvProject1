Daily Information and Game
Table of Contents

    Project Description
    Features
    Setup
    Usage
    File Structure
    Technologies Used
    Contributing
    License

Project Description

The Daily Information and Game project is a web application that provides users with interesting daily facts and displays the current time in various cities. Additionally, it includes an engaging game of Minesweeper to entertain users. The app aims to be both informative and fun, giving users a reason to return every day.
Features

    Date Picker: Allows users to select a day and month to fetch a relevant fact.
    Fetch Fact: Displays a daily fact based on the selected date.
    Other Cities Times: Shows the current time in various major cities around the world.
    Minesweeper Game: A classic Minesweeper game for users to play and enjoy.
    Modal for Game Results: Displays game results in a modal window with the option to reset the game.

Setup

To set up the project locally, follow these steps:

    Clone the repository:

    bash

git clone https://github.com/your-username/daily-info-game.git

Navigate to the project directory:

bash

    cd daily-info-game

    Open the project in your preferred code editor.
    Open index.html in a web browser to view the application.

Usage

    Select a Date:
        Use the date picker to select a day and month.
        Click the "Fetch Fact" button to display the fact of the day.

    View Other Cities Times:
        Check the current time for different cities listed in the "Other Cities Times" section.

    Play Minesweeper:
        Enjoy a game of Minesweeper by interacting with the game board.
        Use the modal to view game results and reset the game.

File Structure

.
├── index.html
├── styles.css
├── js
│   ├── datePicker.js
│   ├── fetchFact.js
│   ├── timeDisplay.js
│   └── minesweeper.js
└── README.md

Technologies Used

    HTML5: For structuring the web content.
    CSS3: For styling the application.
    JavaScript: For adding interactivity and functionality.
        datePicker.js: Manages the date picker functionality.
        fetchFact.js: Fetches and displays the fact of the day.
        timeDisplay.js: Displays the current time for various cities.
        minesweeper.js: Implements the Minesweeper game logic.

        License

This project is licensed under the MIT License. See the LICENSE file for details.