// LocalStorage utilities for managing data persistence
const STORAGE_KEYS = {
  VEHICLES: "vehicles",
  BOOKINGS: "bookings",
  USERS: "users",
  CURRENT_USER: "currentUser",
};

// Initialize default vehicles data
const defaultVehicles = [
  {
    id: "1",
    brand: "Honda",
    model: "City",
    category: "sedan",
    rentPerDay: 2500,
    image:
      "https://img.gaadicdn.com/images/car-images/large/Honda/City/9710/1677754515528/222_Platinum-White-Pearl_b8b8c0.jpg",
    location: "Delhi",
    fuel: "Petrol",
    transmission: "Manual",
    status: "available",
  },
  {
    id: "2",
    brand: "Maruti",
    model: "Swift",
    category: "hatchback",
    rentPerDay: 1800,
    image:
      "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "Mumbai",
    fuel: "Petrol",
    transmission: "Manual",
    status: "available",
  },
  {
    id: "3",
    brand: "Mahindra",
    model: "Scorpio",
    category: "suv",
    rentPerDay: 3500,
    image:
      "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/128413/scorpio-exterior-right-front-three-quarter-47.jpeg?isig=0&q=80&q=80",
    location: "Bangalore",
    fuel: "Diesel",
    transmission: "Manual",
    status: "available",
  },
  {
    id: "4",
    brand: "Royal Enfield",
    model: "Classic 350",
    category: "bike",
    rentPerDay: 800,
    image:
      "https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "Goa",
    fuel: "Petrol",
    transmission: "Manual",
    status: "available",
  },
  {
    id: "5",
    brand: "Tata",
    model: "Nexon",
    category: "suv",
    rentPerDay: 3000,
    image:
      "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "Chennai",
    fuel: "Petrol",
    transmission: "Automatic",
    status: "available",
  },
  {
    id: "6",
    brand: "Honda",
    model: "Accord",
    category: "sedan",
    rentPerDay: 4000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "Hyderabad",
    fuel: "Petrol",
    transmission: "Automatic",
    status: "available",
  },
  {
    id: "7",
    brand: "Bajaj",
    model: "Pulsar",
    category: "bike",
    rentPerDay: 600,
    image:
      "https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "Pune",
    fuel: "Petrol",
    transmission: "Manual",
    status: "available",
  },
  {
    id: "8",
    brand: "Mahindra",
    model: "Bolero Pickup",
    category: "pickup",
    rentPerDay: 2800,
    image:
      "https://images.pexels.com/photos/1756957/pexels-photo-1756957.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "Jaipur",
    fuel: "Diesel",
    transmission: "Manual",
    status: "available",
  },
  {
    id: "9",
    brand: "Hyundai",
    model: "i20",
    category: "hatchback",
    rentPerDay: 2000,
    image:
      "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "Kolkata",
    fuel: "Petrol",
    transmission: "Manual",
    status: "available",
  },
  {
    id: "10",
    brand: "Toyota",
    model: "Fortuner",
    category: "suv",
    rentPerDay: 5000,
    image:
      "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "Mumbai",
    fuel: "Diesel",
    transmission: "Automatic",
    status: "available",
  },
  {
    id: "11",
    brand: "KTM",
    model: "Duke 390",
    category: "bike",
    rentPerDay: 1200,
    image:
      "https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "Bangalore",
    fuel: "Petrol",
    transmission: "Manual",
    status: "available",
  },
  {
    id: "12",
    brand: "Isuzu",
    model: "D-Max",
    category: "pickup",
    rentPerDay: 3200,
    image:
      "https://images.pexels.com/photos/1756957/pexels-photo-1756957.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "Chennai",
    fuel: "Diesel",
    transmission: "Manual",
    status: "available",
  },
];

// Initialize storage if empty
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.VEHICLES)) {
    localStorage.setItem(
      STORAGE_KEYS.VEHICLES,
      JSON.stringify(defaultVehicles)
    );
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
};

// Vehicle operations
export const getVehicles = () => {
  const vehicles = localStorage.getItem(STORAGE_KEYS.VEHICLES);
  return vehicles ? JSON.parse(vehicles) : [];
};

export const saveVehicle = (vehicle) => {
  const vehicles = getVehicles();
  const existingIndex = vehicles.findIndex((v) => v.id === vehicle.id);

  if (existingIndex >= 0) {
    vehicles[existingIndex] = vehicle;
  } else {
    vehicles.push(vehicle);
  }

  localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
};

export const deleteVehicle = (vehicleId) => {
  const vehicles = getVehicles();
  const updatedVehicles = vehicles.filter((v) => v.id !== vehicleId);
  localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(updatedVehicles));
};

export const updateVehicleStatus = (vehicleId, status) => {
  const vehicles = getVehicles();
  const vehicleIndex = vehicles.findIndex((v) => v.id === vehicleId);

  if (vehicleIndex >= 0) {
    vehicles[vehicleIndex].status = status;
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
  }
};

// Booking operations
export const getBookings = () => {
  const bookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  return bookings ? JSON.parse(bookings) : [];
};

export const getUserBookings = (userId) => {
  const bookings = getBookings();
  return bookings.filter((booking) => booking.userId === userId);
};

export const saveBooking = (booking) => {
  const bookings = getBookings();
  const currentUser = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
  );
  booking.userId = currentUser?.id || currentUser?.email;
  bookings.push(booking);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

  // Update vehicle status to booked
  updateVehicleStatus(booking.vehicleId, "booked");
};

export const updateBookingStatus = (bookingId, status) => {
  const bookings = getBookings();
  const bookingIndex = bookings.findIndex((b) => b.id === bookingId);

  if (bookingIndex >= 0) {
    const booking = bookings[bookingIndex];
    booking.status = status;
    bookings[bookingIndex] = booking;
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

    // If cancelled, make vehicle available again
    if (status === "cancelled") {
      updateVehicleStatus(booking.vehicleId, "available");
    }
  }
};

export const deleteBooking = (bookingId) => {
  const bookings = getBookings();
  const booking = bookings.find((b) => b.id === bookingId);

  if (booking) {
    // Make vehicle available again
    updateVehicleStatus(booking.vehicleId, "available");

    const updatedBookings = bookings.filter((b) => b.id !== bookingId);
    localStorage.setItem(
      STORAGE_KEYS.BOOKINGS,
      JSON.stringify(updatedBookings)
    );
  }
};

// Statistics for admin dashboard
export const getStats = () => {
  const bookings = getBookings();
  const vehicles = getVehicles();

  const totalRevenue = bookings
    .filter((b) => b.status === "active" || b.status === "completed")
    .reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);

  const activeBookings = bookings.filter((b) => b.status === "active").length;
  const availableVehicles = vehicles.filter(
    (v) => v.status === "available"
  ).length;

  return {
    totalBookings: bookings.length,
    activeBookings,
    totalVehicles: vehicles.length,
    availableVehicles,
    totalRevenue,
    recentBookings: bookings.slice(-5).reverse(),
  };
};
