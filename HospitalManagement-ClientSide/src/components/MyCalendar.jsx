import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyCalendar = ({ appointments }) => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Convert appointment data to events format required by react-big-calendar
    const formattedEvents = appointments.map((appointment) => ({
      title: appointment.patientName,
      start: new Date(appointment.availableDate),
      end: new Date(appointment.availableDate),
    }));

    setEvents(formattedEvents);
  }, [appointments]);

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ minHeight: '500px' }}
      />
    </div>
  );
};

export default MyCalendar;


