import { Box, Paper, Stack, useTheme } from "@mui/material";
import BreadCrumbs from "../Components/BreadCrumbs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Helmet } from "react-helmet-async";
import "./Calender.css";
import { useEffect, useState } from "react";
import { formatDate } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FirebaseConfig/firebaseConfige";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationDataDark from "../Assests/LoadingDark.json";

const defaultOptionsForDark = {
  loop: true,
  autoplay: true,
  animationData: animationDataDark,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

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
  const [user, loading] = useAuthState(auth);
  const [currentEvents, setcurrentEvents] = useState([]);
  const [LocalStorage, setLocalStorage] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/Login");
    }
  });

  useEffect(() => {
    if (localStorage.NewEvent !== null) {
      setLocalStorage(JSON.parse(localStorage.getItem("NewEvent")));
    }
  }, []);

  useEffect(() => {
    if (LocalStorage && LocalStorage.length > 0) {
      setcurrentEvents(LocalStorage);
    }
  }, [LocalStorage]);

  useEffect(() => {
    if (currentEvents.length > 0) {
      localStorage.setItem("NewEvent", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

  const theme = useTheme();

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
      localStorage.removeItem("NewEvent");
    }
  };

  if (loading) {
    return (
      <Box>
        <Lottie
          options={defaultOptionsForDark}
          height={"100%"}
          width={"100%"}
        />
      </Box>
    );
  }

  if (user) {
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
}

export default Calender;
