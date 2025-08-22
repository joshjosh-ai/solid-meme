import React, { useState, useEffect } from 'react';
import { 
  Bike, 
  Clock, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Activity,
  Trophy,
  Plus,
  X
} from 'lucide-react';

const App = () => {
  const [rides, setRides] = useState([]);
  const [showAddRide, setShowAddRide] = useState(false);
  const [newRide, setNewRide] = useState({
    date: new Date().toISOString().split('T')[0],
    distance: '',
    duration: '',
    avgSpeed: '',
    location: ''
  });

  // Load rides from localStorage on mount
  useEffect(() => {
    const savedRides = localStorage.getItem('cycletrack-rides');
    if (savedRides) {
      setRides(JSON.parse(savedRides));
    }
  }, []);

  // Save rides to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cycletrack-rides', JSON.stringify(rides));
  }, [rides]);

  const handleAddRide = (e) => {
    e.preventDefault();
    if (newRide.distance && newRide.duration) {
      const ride = {
        ...newRide,
        id: Date.now(),
        distance: parseFloat(newRide.distance),
        duration: parseInt(newRide.duration),
        avgSpeed: newRide.avgSpeed ? parseFloat(newRide.avgSpeed) : 
          (parseFloat(newRide.distance) / (parseInt(newRide.duration) / 60)).toFixed(1)
      };
      setRides([ride, ...rides]);
      setNewRide({
        date: new Date().toISOString().split('T')[0],
        distance: '',
        duration: '',
        avgSpeed: '',
        location: ''
      });
      setShowAddRide(false);
    }
  };

  const deleteRide = (id) => {
    setRides(rides.filter(ride => ride.id !== id));
  };

  const totalDistance = rides.reduce((sum, ride) => sum + ride.distance, 0);
  const totalDuration = rides.reduce((sum, ride) => sum + ride.duration, 0);
  const avgSpeed = totalDuration > 0 ? (totalDistance / (totalDuration / 60)).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Bike className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">CycleTrack</h1>
            </div>
            <button
              onClick={() => setShowAddRide(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Ride
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Activity className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Rides</dt>
                    <dd className="text-lg font-medium text-gray-900">{rides.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Distance</dt>
                    <dd className="text-lg font-medium text-gray-900">{totalDistance.toFixed(1)} km</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Time</dt>
                    <dd className="text-lg font-medium text-gray-900">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Trophy className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Avg Speed</dt>
                    <dd className="text-lg font-medium text-gray-900">{avgSpeed} km/h</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rides List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Recent Rides</h2>
          </div>
          <ul className="divide-y divide-gray-200">
            {rides.length === 0 ? (
              <li className="px-4 py-8 text-center text-gray-500">
                No rides recorded yet. Add your first ride!
              </li>
            ) : (
              rides.map((ride) => (
                <li key={ride.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Bike className="h-10 w-10 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(ride.date).toLocaleDateString()}
                          {ride.location && (
                            <>
                              <MapPin className="h-4 w-4 ml-4 mr-1" />
                              {ride.location}
                            </>
                          )}
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-900">
                          <span className="font-medium">{ride.distance} km</span>
                          <span className="mx-2">•</span>
                          <span>{ride.duration} min</span>
                          <span className="mx-2">•</span>
                          <span>{ride.avgSpeed} km/h</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteRide(ride.id)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Add Ride Modal */}
      {showAddRide && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAddRide}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Add New Ride
                      </h3>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="date"
                          value={newRide.date}
                          onChange={(e) => setNewRide({ ...newRide, date: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Distance (km)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={newRide.distance}
                          onChange={(e) => setNewRide({ ...newRide, distance: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="0.0"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                        <input
                          type="number"
                          value={newRide.duration}
                          onChange={(e) => setNewRide({ ...newRide, duration: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="0"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Average Speed (km/h) 
                          <span className="text-xs text-gray-500 ml-1">(optional - will be calculated)</span>
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={newRide.avgSpeed}
                          onChange={(e) => setNewRide({ ...newRide, avgSpeed: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="0.0"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Location (optional)</label>
                        <input
                          type="text"
                          value={newRide.location}
                          onChange={(e) => setNewRide({ ...newRide, location: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="City Park Trail"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Ride
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddRide(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
