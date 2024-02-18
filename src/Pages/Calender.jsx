import { Paper, Stack, useTheme } from "@mui/material";
import BreadCrumbs from "../Components/BreadCrumbs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Helmet } from "react-helmet-async";
import "./Calender.css";
import { useState } from "react";
import { formatDate } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

let eventGuid = 0;

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b style={{ marginRight: 5 }}>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

function createEventId() {
  return String(eventGuid++);
}

function Calender() {
  const theme = useTheme();
  const [currentEvents, setcurrentEvents] = useState([]);
  const handleEvents = (events) => {
    setcurrentEvents(events);
  };
  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (
      `Are you sure you want to delete the event '${clickInfo.event.title}'`
    ) {
      clickInfo.event.remove();
    }
  };

  return (
    <div>
      <Helmet>
        <title>Calender</title>
      </Helmet>
      <BreadCrumbs
        Title={"Calender"}
        Subtitle={"Manage your Calender as you want"}
      />
      <Stack
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Paper
          sx={{
            bgcolor: theme.palette.mode === "dark" ? " #20232A" : "#d9d9d9",
            alignContent: "center",
            width: { xs: "100%", md: "300px" },
          }}
          className="demo-app-sidebar"
        >
          <div className="demo-app-sidebar-section">
            <h2 style={{ textAlign: "center" }}>
              All Events ({currentEvents.length})
            </h2>
            <ul>{currentEvents.map(renderSidebarEvent)}</ul>
          </div>
        </Paper>

        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </Stack>
    </div>
  );
}

export default Calender;
