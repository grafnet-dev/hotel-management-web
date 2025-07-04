'use client';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface BookingDateSelectorProps {
  checkIn: Date;
  checkOut: Date;
  onChange: (dates: { checkIn: Date; checkOut: Date }) => void;
  disabled?: boolean;
}

export default function BookingDateSelector({ 
  checkIn, 
  checkOut, 
  onChange,
  disabled = false
}: BookingDateSelectorProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">📅 Dates de séjour</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Date d'arrivée</label>
          <DatePicker
            selected={checkIn}
            onChange={(date: Date) => onChange({ checkIn: date, checkOut })}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-500"
            disabled={disabled}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Date de départ</label>
          <DatePicker
            selected={checkOut}
            onChange={(date: Date) => onChange({ checkIn, checkOut: date })}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-500"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}