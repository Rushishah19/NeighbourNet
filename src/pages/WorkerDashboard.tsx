import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Edit, Save, X } from 'lucide-react';

export function WorkerDashboard() {
  const { currentUser, workers, updateWorker } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const worker = workers.find(w => w.id === currentUser?.id);
  const [formData, setFormData] = useState(worker || {
    id: currentUser?.id || '',
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    skills: [] as string[],
    hourlyRate: 0,
    experience: 0,
    location: '',
    availability: [] as string[],
    rating: 0,
    completedJobs: 0,
    description: '',
    certifications: [] as string[],
    photo:' ',
    availabilityNumber: 0,
    availableTimeSlots: [] as string[],
  });
  const uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const photoUrl = URL.createObjectURL(file);
      setFormData({ ...formData, photo: photoUrl });
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorker(formData);
    setIsEditing(false);
  };
  // Cleanup URL Object when component unmounts
  useEffect(() => {
    return () => {
      if (formData.photo) {
        URL.revokeObjectURL(formData.photo);
      }
    };
  }, [formData.photo]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Worker Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? (
              <>
                <X size={20} className="mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit size={20} className="mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
          <div className="space-y-6">
          <div className="flex justify-center mb-6">
              {formData.photo ? (
                <img
                  src={formData.photo}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <p className="text-gray-500">No photo uploaded</p>
              )}
            </div>

            {/* Photo upload input */}
            {isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Photo
                </label>
                <input
                  type="file"
                  onChange={uploadPhoto}
                  className="block w-full"
                  accept="image/*"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hourly Rate (CAD)
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hourlyRate: Number(e.target.value),
                    })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg">${formData.hourlyRate}/hour</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.skills.join(', ')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      skills: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter skills separated by commas"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience (Years)
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      experience: Number(e.target.value),
                    })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg">{formData.experience} years</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg">{formData.location}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.availability.join(',')}
                  onChange={(e) =>
                    setFormData({ ...formData, availability: e.target.value.split(',').map((a) => a.trim()), })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg">{formData.availability.join(',')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              {isEditing ? (
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg">{formData.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certifications
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.certifications.join(', ')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      certifications: e.target.value
                        .split(',')
                        .map((s) => s.trim()),
                    })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter certifications separated by commas"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save size={20} className="mr-2" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}