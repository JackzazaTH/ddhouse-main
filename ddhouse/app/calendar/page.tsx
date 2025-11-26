
'use client';
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import CalendarView from '@/components/CalendarView';

export default function CalendarPage() {
  const { calendarEvents } = useAppContext();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">ตารางกิจกรรม</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">ติดตามกำหนดการ กิจกรรม และวันสำคัญต่างๆ ของเรา</p>
      </div>
      <CalendarView events={calendarEvents} />
    </div>
  );
}