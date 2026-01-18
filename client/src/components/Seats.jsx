
import { useState, useEffect } from 'react'

const Seats = ({ seats, onSeatClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-2 rounded-lg">
      {seats.map((seat) => (
        <div
          key={seat.seat_id}
          data-seat-id={seat.seat_id}
          onClick={() => onSeatClick(seat.seat_id)}
          className={`border-2 w-14 h-14 grid place-items-center text-xs rounded-md cursor-pointer transition-all
            ${seat.status === "available" ? "bg-gray-200 hover:bg-gray-300 border-gray-300" : ""}
            ${seat.status === "held" ? "bg-yellow-300 border-yellow-400" : ""}
            ${seat.status === "booked" ? "bg-slate-400 cursor-not-allowed border-slate-500" : ""}
          `}
        >
          {seat.seat_id}
        </div>
      ))}
    </div>
  );
};

export default Seats;