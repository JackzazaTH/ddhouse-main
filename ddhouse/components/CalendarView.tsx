
'use client';
import React, { useState } from 'react';
import { CalendarEvent } from '@/lib/types';

interface CalendarViewProps {
  events: CalendarEvent[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const getTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'construction': return 'bg-orange-500';
      case 'handover': return 'bg-green-500';
      case 'holiday': return 'bg-red-500';
      case 'meeting': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: CalendarEvent['type']) => {
      switch (type) {
        case 'construction': return 'ก่อสร้าง/หน้างาน';
        case 'handover': return 'ส่งมอบบ้าน';
        case 'holiday': return 'วันหยุด';
        case 'meeting': return 'ประชุม/นัดหมาย';
        default: return 'อื่นๆ';
      }
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-gray-50 border border-gray-100"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayEvents = getEventsForDate(i);
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString();
      const isSelected = selectedDate === dateStr;

      days.push(
        <div 
            key={i} 
            onClick={() => setSelectedDate(dateStr)}
            className={`h-24 md:h-32 border border-gray-100 p-1 md:p-2 relative cursor-pointer transition-colors hover:bg-gray-50 ${isToday ? 'bg-blue-50' : 'bg-white'} ${isSelected ? 'ring-2 ring-primary z-10' : ''}`}
        >
          <span className={`text-sm font-semibold ${isToday ? 'text-primary' : 'text-gray-700'} block mb-1`}>{i}</span>
          <div className="flex flex-col gap-1 overflow-hidden h-full pb-6">
            {dayEvents.map(ev => (
              <div key={ev.id} className={`${getTypeColor(ev.type)} text-white text-[10px] px-1 rounded truncate shadow-sm`}>
                {ev.title}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return days;
  };

  const selectedDayEvents = selectedDate ? events.filter(e => e.date === selectedDate) : [];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <div className="bg-primary p-6 text-white flex justify-between items-center">
        <button onClick={prevMonth} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-2xl font-bold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear() + 543}</h2>
        <button onClick={nextMonth} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 border-b text-xs text-gray-600 justify-center">
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-500"></span> ก่อสร้าง</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500"></span> ส่งมอบ</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500"></span> ประชุม</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> วันหยุด</div>
      </div>

      <div className="grid grid-cols-7 text-center bg-gray-100 text-gray-600 py-2 text-sm font-medium">
        <div>อา</div><div>จ</div><div>อ</div><div>พ</div><div>พฤ</div><div>ศ</div><div>ส</div>
      </div>
      <div className="grid grid-cols-7">
        {renderCalendarDays()}
      </div>

      {/* Detail Panel */}
      {selectedDate && (
          <div className="p-6 bg-gray-50 border-t border-gray-200 animate-fade-in-up">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                  กิจกรรมวันที่ {new Date(selectedDate).getDate()} {monthNames[new Date(selectedDate).getMonth()]} {new Date(selectedDate).getFullYear() + 543}
              </h3>
              {selectedDayEvents.length === 0 ? (
                  <p className="text-gray-500 italic">ไม่มีกิจกรรมในวันนี้</p>
              ) : (
                  <div className="space-y-3">
                      {selectedDayEvents.map(ev => (
                          <div key={ev.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-primary flex justify-between items-start">
                              <div>
                                  <span className={`inline-block px-2 py-0.5 rounded text-xs text-white mb-1 ${getTypeColor(ev.type)}`}>
                                      {getTypeLabel(ev.type)}
                                  </span>
                                  <h4 className="font-bold text-gray-800">{ev.title}</h4>
                                  {ev.description && <p className="text-sm text-gray-600 mt-1">{ev.description}</p>}
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </div>
      )}
    </div>
  );
};

export default CalendarView;