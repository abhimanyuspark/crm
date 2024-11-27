import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { FlConverter } from "../utilities";
// import { useDispatch } from "react-redux";
// import { addEventToUser, deleteUserEvent } from "../redux/server/server";
// import Swal from "sweetalert2";
// import { v4 as uuidv4 } from "uuid";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Calender = ({
  height = "400px",
  events = [],
  initialView = "listWeek",
  userId = "",
}) => {
  const navigate = useNavigate();

  function handleEventClick(clickInfo) {
    const eventId = clickInfo.event.id;
    navigate(`/crm_project/events/${userId}/${eventId}`);
  }

  // function handleDateSelect(selectInfo) {
  //   let title = prompt("Please enter a new title for your event");
  //   let description = prompt("Please enter a new description for your event");
  //   let calendarApi = selectInfo.view.calendar;
  //   calendarApi.unselect(); // clear date selection

  //   if (title) {
  //     const event = {
  //       id: uuidv4(),
  //       title: title,
  //       description: description,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay,
  //     };
  //     calendarApi.addEvent(event);
  //     toast.promise(
  //       dispatch(addEventToUser({ userId: id, event: event })),
  //       {
  //         loading: "loading...",
  //         success: "Successfully added the event",
  //         error: "Failed adding the event",
  //       },
  //       {
  //         position: "top-center",
  //       }
  //     );
  //   }
  // }

  return (
    <FullCalendar
      locale={"en"}
      timeZone={"Asia/Kolkata"}
      firstDay={parseInt("1")}
      initialView={initialView}
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      headerToolbar={{
        start: "prev,next today",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      }}
      navLinks={true} // can click day/week names to navigate views
      // selectable={true}
      // selectMirror={true}
      // editable={true}
      // dayMaxEvents={true}
      height={height}
      events={events}
      eventContent={renderEventContent}
      eventClick={handleEventClick}
      // select={handleDateSelect}
    />
  );
};

function renderEventContent(eventInfo) {
  const color = eventInfo?.event?.extendedProps?.status?.color;
  return (
    <div
      style={{ background: color }}
      className="w-full rounded-sm pl-1 flex items-center"
    >
      <b>{FlConverter(eventInfo?.event?.title)}</b>
    </div>
  );
}

export default Calender;
