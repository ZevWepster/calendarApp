# Calendar App

Welcome to the **Calendar App** project! This is a simple calendar application built as part of a learning journey into full-stack development. The app currently allows users to view a calendar, click on a day to add events, and manage those events. It is also a personal playground for practicing Git and GitHub workflows.

## Features

### Current Features

- Interactive calendar interface.
- Add, edit, delete events
- Events persist in memory for the current session.

### Planned Enhancements

1. **Local Events Storage**: Load, save, and update events in a local `events.json` file to persist data across sessions.
2. **Day-Specific Event Display**: When clicking on a day, display the events for that day instead of opening the `event-popup`.
3. **Event Repetition**: Add the ability to repeat events daily, weekly, or monthly.
4. **Event Date Modification**: Allow users to change the date of an event within the `event-popup`.
5. **Event Sorting**: Automatically sort displayed events by time.

## Purpose of the Project

- **Learning Full-Stack Development**: Enhance my understanding of both frontend and backend technologies.
- **Git and GitHub Practice**: Use this project to practice version control, branching, and collaboration workflows.
- **Customization and Enhancement**: Start with a basic codebase (adapted from a YouTube tutorial) and extend its functionality to meet additional requirements.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend (planned)**: Node.js for handling the local storage logic.
- **File Storage (planned)**: JSON files for event persistence.

## Installation

To run the project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ZevWepster/calendarApp.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd calendar-app
   ```

3. **Install Dependencies** (if applicable in the future):

   ```bash
   npm install
   ```

4. **Run the Application**:
   **Run the Application**:
   ```bash
   npm run dev
   ```
   This will start a local development server. Open your browser and navigate to `http://localhost:3000` (or the port specified in your configuration).

## Usage

1. Open the calendar in your browser.
2. Click on a day to add an event (current functionality).
3. Manage events through the planned enhancements (upcoming features).

## Contributing

This project is primarily for personal learning, but suggestions and improvements are always welcome! Feel free to:

- Fork the repository.
- Make your changes in a new branch.
- Open a pull request with a description of your changes.

## Roadmap

- [x] Basic calendar functionality.
- [x] Add Event button for triggering `event-popup`.
- [x] Allow changing the date of an event within the `event-popup`.
- [x] Display day-specific events when clicking on a date.
- [ ] Add css within `event-popup` for location and date
- [ ] Add the ability to repeat events (daily, weekly, monthly).
- [ ] Automatically sort displayed events by time.
- [ ] Add database to store events

## Acknowledgments

- Inspired by a [YouTube tutorial](https://www.youtube.com/watch?v=wDayVPGWipI) that served as a foundation for this project.
- Thanks to the open-source community for tools and resources.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Happy coding! 🚀
