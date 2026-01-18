import { useState, useEffect } from 'react'

const Panel = ({ selectedSeats = [], holdSession, onConfirmBooking, onClearSelection }) => {
  const selectedSeatsList = selectedSeats.filter(s => s.status === 'held');
  const hasSelection = selectedSeatsList.length > 0;
  const totalPrice = selectedSeatsList.reduce((sum, seat) => sum + seat.price, 0);
  const basePrice = selectedSeatsList.length * 5000;
  const surgePricing = totalPrice - basePrice;
  
  const [timeLeft, setTimeLeft] = useState(null);
  
  useEffect(() => {
    if (!holdSession.active) {
      setTimeLeft(null);
      return;
    }
    
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((holdSession.expiresAt - Date.now()) / 1000));
      setTimeLeft(remaining);
    }, 100);
    
    return () => clearInterval(interval);
  }, [holdSession]);
  
  const formatTime = (seconds) => {
    if (seconds === null) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const bookedCount = selectedSeats.filter(s => s.status === 'booked').length;
  const availableCount = selectedSeats.filter(s => s.status === 'available').length;

  return (
    <aside className="w-full h-screen sticky top-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-800 overflow-y-auto border-l border-slate-200 shadow-xl">
      <div className="relative h-40 bg-gradient-to-b from-blue-100/50 to-transparent overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/plane.png" 
            alt="Aircraft A320" 
            className="h-24 object-contain opacity-80 drop-shadow-lg"
          />
        </div>
        <div className="absolute top-4 left-6">
          <h1 className="text-3xl font-bold tracking-wider text-slate-900">A320</h1>
          <p className="text-xs text-blue-600 mt-1 font-medium">Dynamic Pricing Engine</p>
        </div>
      </div>

      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">Seat Status</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-200 shadow-sm"></div>
            <span className="text-sm text-slate-700 font-medium">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-300 shadow-sm"></div>
            <span className="text-sm text-slate-700 font-medium">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-400 shadow-sm"></div>
            <span className="text-sm text-slate-700 font-medium">Booked</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        <h2 className="text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wide">Booking Summary</h2>
        
        {!hasSelection ? (
          <div className="bg-white rounded-lg p-6 border-2 border-slate-200 mb-4 shadow-sm">
            <div className="flex flex-col items-center justify-center text-center py-4">
              <svg className="w-16 h-16 text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-slate-600 text-sm font-medium">No Seats Selected</p>
              <p className="text-slate-400 text-xs mt-1">Select seats to continue</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 border-2 border-blue-300 mb-4 shadow-lg">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <span className="text-xs font-medium text-slate-600">Hold Expires In</span>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                <span className={`text-lg font-bold ${timeLeft <= 10 ? 'text-rose-600 animate-pulse' : 'text-slate-800'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-600 mb-2">Selected Seats ({selectedSeatsList.length})</p>
              <div className="flex flex-wrap gap-2">
                {selectedSeatsList.map(seat => (
                  <span key={seat.seat_id} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {seat.seat_id}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-200">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Base Price</span>
                <span className="font-semibold text-slate-800">₹{basePrice.toLocaleString()}</span>
              </div>
              {surgePricing > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-rose-600 flex items-center gap-1">
                    <span>Surge Pricing</span>
                  </span>
                  <span className="font-semibold text-rose-600">+₹{surgePricing.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-300">
                <span className="text-slate-800">Total</span>
                <span className="text-blue-600">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <button 
                onClick={onConfirmBooking}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200"
              >
                Confirm Booking
              </button>
              <button 
                onClick={onClearSelection}
                className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 rounded-lg transition-colors duration-200"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-200 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Price Analysis</h3>
            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-medium">ML-Powered</span>
          </div>
          {!hasSelection ? (
            <p className="text-slate-500 text-sm mt-3">Breakdown will appear when seats are selected</p>
          ) : (
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Seats Remaining</span>
                <span className="font-semibold text-slate-800">{availableCount}/{selectedSeats.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Avg Price/Seat</span>
                <span className="font-semibold text-slate-800">₹{Math.round(totalPrice / selectedSeatsList.length).toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-4 mt-auto border-t border-slate-200 bg-slate-50">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white rounded-lg p-2 border border-slate-200 shadow-sm">
            <p className="text-lg font-bold text-blue-600">{bookedCount}</p>
            <p className="text-xs text-slate-500 font-medium">Booked</p>
          </div>
          <div className="bg-white rounded-lg p-2 border border-slate-200 shadow-sm">
            <p className="text-lg font-bold text-blue-600">{availableCount}</p>
            <p className="text-xs text-slate-500 font-medium">Available</p>
          </div>
          <div className="bg-white rounded-lg p-2 border border-slate-200 shadow-sm">
            <p className="text-lg font-bold text-blue-600">{selectedSeatsList.length}</p>
            <p className="text-xs text-slate-500 font-medium">Selected</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Panel;