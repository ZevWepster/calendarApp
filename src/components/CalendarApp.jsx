import { useState } from "react";

const CalendarApp = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // Event modal state variables
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [repeatOption, setRepeatOption] = useState("none");
  const [repeatUntil, setRepeatUntil] = useState(null);
  const [events, setEvents] = useState([
    // HARD CODED TEST EVENTS
    {
      id: 1,
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ),
      time: "10:00",
      text: "Event for today",
      location: "Location 1",
    },
    {
      id: 2,
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      ),
      time: "11:00",
      text: "Event for tomorrow",
      location: "Location 2",
    },
    {
      id: 3,
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 2
      ),
      time: "12:00",
      text: "Event in two days",
      location: "Location 3",
    },
    {
      id: 4,
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 3
      ),
      time: "13:00",
      text: "Event in three days",
      location: "Location 4",
    },
    {
      id: 5,
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 4
      ),
      time: "14:00",
      text: "Event in four days",
      location: "Location 5",
    },
  ]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");
  const [eventLocation, setEventLocation] = useState(""); // New state for location
  const [showAllEvents, setShowAllEvents] = useState(true); // New state for showing all events or selected day events

  const [editingEvent, setEditingEvent] = useState(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear - 1 : prevYear
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  // Event modal handling
  const handleAddEventClick = () => {
    setShowEventPopup(true);
    setSelectedDate(selectedDate || currentDate);
    const now = new Date();
    setEventTime({
      hours: now.getHours().toString().padStart(2, "0"),
      minutes: now.getMinutes().toString().padStart(2, "0"),
    });
    setEventText("");
    setEventLocation(""); // Reset location
    setRepeatOption("none"); // Reset repeat option
    setRepeatUntil(null); // Reset repeat until
    setEditingEvent(null);
  };

  const handleEventSubmit = () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: new Date(selectedDate),
      time: `${eventTime.hours.padStart(2, "0")} : ${eventTime.minutes.padStart(
        2,
        "0"
      )}`,
      text: eventText,
      location: eventLocation, // Store the location
      repeat: repeatOption, // Store the repeat option
    };

    let updatedEvents = [...events];

    if (editingEvent) {
      updatedEvents = updatedEvents.map((event) =>
        event.id === editingEvent.id ? newEvent : event
      );
    } else {
      updatedEvents.push(newEvent);

      // Handle repeat logic
      if (repeatOption !== "none") {
        let repeatDate = new Date(selectedDate);
        while (repeatDate <= repeatUntil) {
          if (repeatOption === "daily") {
            repeatDate.setDate(repeatDate.getDate() + 1);
          } else if (repeatOption === "weekly") {
            repeatDate.setDate(repeatDate.getDate() + 7);
          } else if (repeatOption === "monthly") {
            repeatDate.setMonth(repeatDate.getMonth() + 1);
          }
          if (repeatDate <= repeatUntil) {
            updatedEvents.push({
              ...newEvent,
              id: Date.now() + repeatDate.getTime(),
              date: new Date(repeatDate),
            });
          }
        }
      }
    }

    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    setEvents(updatedEvents);
    setEventTime({ hours: "00", minutes: "00" });
    setEventText("");
    setEventLocation(""); // Reset location after submit
    setRepeatOption("none"); // Reset repeat option after submit
    setRepeatUntil(null); // Reset repeat until after submit
    setShowEventPopup(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date));
    setEventTime({
      hours: event.time.split(":")[0].replace(" ", ""),
      minutes: event.time.split(":")[1].replace(" ", ""),
    });
    setEventText(event.text);
    setEventLocation(event.location || ""); // Set location
    setRepeatOption(event.repeat || "none"); // Set repeat option
    setRepeatUntil(null); // Reset repeat until
    setEditingEvent(event);
    setShowEventPopup(true);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    setEventTime((prevTime) => ({
      ...prevTime,
      [name]: value.padStart(2, "0"),
    }));
  };

  return (
    <div className="calendar-app">
      <div className="calendar">
        <h1 className="heading">Calendar</h1>
        <button className="add-event-btn" onClick={handleAddEventClick}>
          Add Event
        </button>

        <div className="navigate-date">
          <h2 className="month">{monthsOfYear[currentMonth]}</h2>
          <h2 className="year">{currentYear}</h2>

          <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>
        <div className="weekdays">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="days">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {[...Array(daysInMonth).keys()].map((day) => {
            const dayDate = new Date(currentYear, currentMonth, day + 1);
            const isSelectedDay =
              selectedDate.getDate() === day + 1 &&
              selectedDate.getMonth() === currentMonth &&
              selectedDate.getFullYear() === currentYear;
            const isToday =
              day + 1 === currentDate.getDate() &&
              currentMonth === currentDate.getMonth() &&
              currentYear === currentDate.getFullYear();
            const hasEvent = events.some(
              (event) =>
                new Date(event.date).toDateString() === dayDate.toDateString()
            );

            let dayClass = "";
            if (isToday && isSelectedDay) {
              dayClass = "selected-today";
            } else if (isToday) {
              dayClass = "current-day";
            } else if (isSelectedDay) {
              dayClass = "selected-day";
            } else if (hasEvent) {
              dayClass = "event-day";
            }

            return (
              <span
                key={day + 1}
                className={dayClass}
                onClick={() => setSelectedDate(dayDate)}
              >
                {day + 1}
              </span>
            );
          })}
        </div>
      </div>

      <div className="events">
        <div className="toggle-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={!showAllEvents}
              onChange={() => setShowAllEvents(!showAllEvents)}
            />
            <span className="slider round"></span>
          </label>
          <span>
            {showAllEvents
              ? "Toggle to show selected day"
              : "Toggle to show all events"}
          </span>
        </div>
        {showEventPopup && (
          <div className="event-popup">
            {/* added timezoneOffset because it was showing the day before.  */}
            <div className="event-date-popup">
              <div className="event-date-label">Date</div>
              <input
                type="date"
                value={
                  new Date(
                    selectedDate.getTime() -
                      selectedDate.getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .split("T")[0]
                }
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
              />
            </div>

            <div className="time-input">
              <div className="event-time-popup">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
                placeholder="HH"
                value={eventTime.hours}
                onChange={handleTimeChange}
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={60}
                className="minutes"
                placeholder="MM"
                value={eventTime.minutes}
                onChange={handleTimeChange}
              />
            </div>

            <div className="event-location-popup">
              <div className="event-location-label">Location</div>
              <input
                type="text"
                placeholder="Enter a location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
              />
            </div>

            <div className="repeat-options">
              <div className="repeat-option-label">Repeat Event</div>
              <select
                value={repeatOption}
                onChange={(e) => setRepeatOption(e.target.value)}
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {repeatOption !== "none" && (
              <div className="repeat-until-popup">
                <div className="repeat-until-label">Repeat Until</div>
                <input
                  type="date"
                  value={
                    repeatUntil
                      ? new Date(
                          repeatUntil.getTime() -
                            repeatUntil.getTimezoneOffset() * 60000
                        )
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) => setRepeatUntil(new Date(e.target.value))}
                />
              </div>
            )}

            <textarea
              placeholder="Enter Event Description (max of 60 characters)"
              value={eventText}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  setEventText(e.target.value);
                }
              }}
            ></textarea>
            <button className="event-popup-btn" onClick={handleEventSubmit}>
              {editingEvent ? "Update Event" : "Add Event"}
            </button>
            <button
              className="close-event-popup"
              onClick={() => setShowEventPopup(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}

        {events
          .filter((event) =>
            showAllEvents
              ? true
              : new Date(event.date).toDateString() ===
                selectedDate.toDateString()
          )
          .map((event, index) => (
            <div className="event" key={index}>
              <div className="event-date-wrapper">
                <div className="event-date">{`${
                  monthsOfYear[event.date.getMonth()]
                } ${event.date.getDate()}, ${event.date.getFullYear()}`}</div>
                <div className="event-time">{event.time}</div>
                <div className="event-location">{event.location}</div>{" "}
              </div>
              <div className="event-text">{event.text}</div>

              <div className="event-buttons">
                <i
                  className="bx bxs-edit-alt"
                  onClick={() => handleEditEvent(event)}
                ></i>
                <i
                  className="bx bxs-message-alt-x"
                  onClick={() => handleDeleteEvent(event.id)}
                ></i>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CalendarApp;
