import { useState } from 'react';
import { useStore } from '../store';
import { Star, MapPin, Clock, DollarSign, Briefcase, Award, Wallet, Search, CalendarIcon, MessageSquare } from 'lucide-react';
import { ContactModal } from '../components/ContactModal.tsx';
import { Worker } from '../types';

export function CustomerDashboard() {
  const workers = useStore((state) => state.workers) || ['9:00 AM - 10:00 AM','10:00 AM - 11:00 AM','11:00 AM - 12:00 PM','12:00 PM - 1:00 PM ','1:00 PM - 2:00 PM','3:00 PM - 4:00 PM','4:00 PM - 5:00 PM','5:00 PM - 6:00 PM'];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  const allSkills = [...new Set(workers.flatMap(w => w.skills))];
  const allLocations = [...new Set(workers.map(w => w.location))];
  const ratingOptions = ['4.5+', '4.0+', '3.5+', '3.0+', 'All'];

  const [selectedTimeSlots, setSelectedTimeSlots] = useState<Record<string, Set<string>>>({});
  console.log("Workers:", workers);
  console.log("Selected Time Slots:", selectedTimeSlots);
  
  // Toggle selected time slot for a specific worker
const toggleTimeSlot = (workerId: string, timeSlot: string) => {
  setSelectedTimeSlots((prev) => {
    const workerSlots = prev[workerId] || new Set();
    const updatedSlots = new Set(workerSlots);
    
    if (updatedSlots.has(timeSlot)) {
      updatedSlots.delete(timeSlot);
    } else {
      updatedSlots.add(timeSlot);
    }

    return { ...prev, [workerId]: updatedSlots };
  });
};

// Check if a time slot is selected for a worker
const isSlotSelected = (workerId: string, timeSlot: string) => {
  return selectedTimeSlots[workerId]?.has(timeSlot) ?? false;
};


  
  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSkill = !selectedSkill || worker.skills.includes(selectedSkill);
    const matchesLocation = !selectedLocation || worker.location === selectedLocation;
    const matchesRating = !selectedRating || 
      (selectedRating === 'All' ? true : worker.rating >= parseFloat(selectedRating.replace('+', '')));
    return matchesSearch && matchesSkill && matchesLocation && matchesRating;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Skilled Workers</h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Skills</option>
              {allSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              {allLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                Rating <Star size={16} className="ml-1 text-yellow-400" />
              </div>
            </label>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Ratings</option>
              {ratingOptions.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                {!worker.photo && <img 
                  src="https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000" 
                  alt='default avatar'  
                  height='64' 
                  width='64' 
                  loading='lazy' 
                  decoding='async'
                  className="rounded-full"
                />}

                <h3 className="text-xl font-semibold mt-2">{worker.name}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin size={16} className="mr-1" />
                  {worker.location}
                </div>
              </div>
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                <Star size={16} className="text-yellow-400 mr-1" />
                <span className="font-medium">{worker.rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <DollarSign size={16} className="mr-2" />
                ${worker.hourlyRate}/hour
              </div>
              <div className="flex items-center text-gray-600">
                <CalendarIcon size={16} className="mr-2" />
                {worker.availability}
              </div>
              <div className="flex items-center text-gray-600">
                <Clock size={16} className="mr-2" />
                {worker.availabilityNumber}/hour
              </div>
              
              <div className="mt-4">
  <div className="text-sm font-medium text-gray-700 mb-2">Available Time Slots</div>
  <div className="grid grid-cols-4 gap-2">
    {worker.availableTimeSlots && worker.availableTimeSlots.length > 0 ? (
      worker.availableTimeSlots.map((timeSlot: string) => (
        <button
          key={timeSlot}
          onClick={() => toggleTimeSlot(worker.id, timeSlot)}
          className={`px-2 py-1 rounded-md text-sm ${
            isSlotSelected(worker.id, timeSlot) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {timeSlot}
        </button>
      ))
    ) : (
      <div className="text-gray-500">No available time slots</div>
    )}
  </div>
</div>


              <div className="flex items-center text-gray-600">
                <Briefcase size={16} className="mr-2" />
                {worker.experience} years experience
              </div>
              <div className="flex items-center text-gray-600">
                <Award size={16} className="mr-2" />
                {worker.completedJobs} jobs completed
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Skills</div>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Certifications</div>
              <div className="flex flex-wrap gap-2">
                {worker.certifications.map((certification) => (
                  <span
                    key={certification}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {certification}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setSelectedWorker(worker)}
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <MessageSquare size={16} className="mr-2" />
                Chat
              </button>

              <button
                onClick={() => setSelectedWorker(worker)}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Wallet size={16} className="mr-2" />
                Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedWorker && (
        <ContactModal
          worker={selectedWorker}
          onClose={() => setSelectedWorker(null)}
        />
      )}

      {filteredWorkers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No workers found matching your criteria
        </div>
      )}
    </div>
  );
}