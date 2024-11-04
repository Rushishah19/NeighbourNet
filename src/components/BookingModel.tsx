import { useState } from 'react';
import { X, Calendar,  Loader } from 'lucide-react';
import { Worker } from '../types';
import { PaymentForm } from './PaymentForm';

interface BookingModalProps {
  worker: Worker;
  onClose: () => void;
}

export function BookingModal({ worker, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const toggleTimeSlot = (time: string) => {
    setSelectedTimeSlots(prev => {
      if (prev.includes(time)) {
        return prev.filter(t => t !== time);
      } else {
        const newSlots = [...prev, time].sort((a, b) => {
          return new Date('1970/01/01 ' + a).getTime() - new Date('1970/01/01 ' + b).getTime();
        });
        return newSlots;
      }
    });
  };

  const totalHours = selectedTimeSlots.length;
  const totalAmount = worker.hourlyRate * totalHours;

  const handleBooking = async (paymentDetails: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Book {worker.name}</h2>
          
          <div className="mb-6">
            <div className="flex items-center text-gray-600 mb-2">
              <Calendar size={20} className="mr-2" />
              Rate: ${worker.hourlyRate}/hour
            </div>
          </div>

          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Date & Time Slots</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Time Slots
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => toggleTimeSlot(time)}
                      className={`p-2 rounded-md text-sm ${
                        selectedTimeSlots.includes(time)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {selectedTimeSlots.length > 0 && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Selected Time Slots:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTimeSlots.map((time) => (
                      <span key={time} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              )}
                
              <button
                onClick={() => setStep(2)}
                disabled={!selectedDate || selectedTimeSlots.length === 0}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              >
                
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Time Slots:</span>
                    <div className="text-right">
                      {selectedTimeSlots.map((time) => (
                        <div key={time} className="font-medium">{time}</div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Rate:</span>
                    <span className="font-medium">${worker.hourlyRate}/hour</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Hours:</span>
                    <span className="font-medium">{totalHours}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold">${totalAmount}</span>
                  </div>
                </div>
              </div>

              <PaymentForm onSubmit={handleBooking} />
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
              <div className="flex items-center">
                <Loader className="animate-spin mr-2" />
                Processing your booking...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}