import { useState, useEffect } from 'react'
import Panel from './components/Panel.jsx'
import Seats from './components/Seats.jsx'  

function App() {
  const TOTAL_SEATS = 198;
  const HOLD_DURATION = 60 * 1000;
  
  const generateSeats = () => {
    return Array.from({ length: TOTAL_SEATS }, (_, index) => ({
      seat_id: `${(Math.floor(index/3) + 1)>=34?(Math.floor(index/3) + 1)-33:Math.floor(index/3) + 1}${String.fromCharCode(index>=99?68 + (index % 3):65 + (index % 3))}`,
      price: 5000,
      status: "available",
      holdUntil: null
    }));
  };

  const [seats, setSeats] = useState(generateSeats());
  const [holdSession, setHoldSession] = useState({
    expiresAt: null,
    active: false
  });
  
  const onSeatClick = (seatId) => {
    const now = Date.now();

    setSeats(prevSeats =>
      prevSeats.map(seat => {
        if (seat.seat_id !== seatId) return seat;
        if (seat.status === "booked") return seat;
        
        if (seat.status === "held") {
          return { ...seat, status: "available" };
        }
        
        if (seat.status === "available") {
          return { ...seat, status: "held" };
        }
        
        return seat;
      })
    );

    setHoldSession(prev => {
      const hasHeldSeats = seats.some(s => s.status === "held");
      
      if (prev.active || hasHeldSeats) return prev;

      return {
        active: true,
        expiresAt: now + HOLD_DURATION
      };
    });
  };

  const handleConfirmBooking = () => {
    setSeats(prev =>
      prev.map(seat =>
        seat.status === "held"
          ? { ...seat, status: "booked" }
          : seat
      )
    );
    
    setHoldSession({ active: false, expiresAt: null });
  };

  const handleClearSelection = () => {
    setSeats(prev =>
      prev.map(seat =>
        seat.status === "held"
          ? { ...seat, status: "available" }
          : seat
      )
    );
    
    setHoldSession({ active: false, expiresAt: null });
  };

  useEffect(() => {
    if (!holdSession.active) return;

    const interval = setInterval(() => {
      const now = Date.now();

      if (now >= holdSession.expiresAt) {
        setSeats(prev =>
          prev.map(seat =>
            seat.status === "held"
              ? { ...seat, status: "available" }
              : seat
          )
        );

        setHoldSession({ active: false, expiresAt: null });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [holdSession]);

  return (
    <div className="w-full h-fit flex justify-start gap-8 bg-white">
      <div className='w-[432px] py-8 flex items-center flex-col m-4'>
        <div className="w-[420px] aspect-[447/487] bg-[url('/cockpit.png')] bg-contain bg-no-repeat"></div>
        
        <div className="pt-1 w-full h-fit flex justify-between">
          <Seats seats={seats.slice(0, 99)} onSeatClick={onSeatClick} />
          <Seats seats={seats.slice(99)} onSeatClick={onSeatClick} />
        </div>
        
        <div className="w-[420px] mt-2 flex justify-center">
          <div
            style={{
              width: '420px',
              height: '100px',
              clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)'
            }}
            className="bg-[#e5e5e7]">
          </div>
        </div>
      </div>
      
      <Panel 
        selectedSeats={seats}
        holdSession={holdSession}
        onConfirmBooking={handleConfirmBooking}
        onClearSelection={handleClearSelection}
      />
    </div>
  )
}

export default App