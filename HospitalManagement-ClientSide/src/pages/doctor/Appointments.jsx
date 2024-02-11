import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import SideBarDoctor from '../../components/SideBarDoctor'

const localizer = momentLocalizer(moment);

export default function Appointments() {

    const [events, setEvents] = useState([]);

    const handleEventClick = (event) => {
        alert(`Event: ${event.title} at ${event.start}`);
    };

    const handleSelectSlot = ({ start, end }) => {
        const title = window.prompt('Event title:');
        if (title) {
        setEvents([...events, { title, start, end }]);
        }
    };
    const sampleDates = [
        {
          title: 'Sample Event 1',
          start: new Date(2023, 8, 5),
          end: new Date(2023, 8, 6), 
        },
        {
          title: 'Sample Event 2',
          start: new Date(2023, 8, 10),
          end: new Date(2023, 8, 11),
        },
        {
          title: 'Sample Event 2',
          start: new Date(2023, 8, 19), 
          end: new Date(2023, 8, 21), 
        },
        {
          title: 'Sample Event 2',
          start: new Date(2023, 8, 8),
          end: new Date(2023, 8, 9), 
        },
      ];

  return (
    <div>
      <SideBarDoctor/>
      <div className='prescription-box-set'>
            <div>Status bar</div>
      </div>
      <div className='calender-format'>
            <div className='r-topic-calender'>Schedule Calendar</div>
            <Calendar
                localizer={localizer}
                events={[...events, ...sampleDates]} // Merge sample dates with existing events
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleEventClick}
            />
        </div>
    </div>
  )
}
