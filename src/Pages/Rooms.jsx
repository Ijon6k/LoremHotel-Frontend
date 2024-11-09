import { useEffect, useState } from "react";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null); // State untuk menangani error

  useEffect(() => {
    fetch("http://localhost:8080/api/rooms") // Memanggil API ke backend
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setRooms(data))
      .catch((error) => setError(error.message)); // Tangani kesalahan
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Tampilkan pesan kesalahan
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Available Rooms
      </h2>
      <ul className="space-y-4">
        {rooms.map((room) => (
          <li
            key={room.id}
            className={`flex justify-between p-4 border rounded-md ${
              room.isBooked
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            <span className="font-semibold">{room.name}</span>
            <span>
              ${room.price} {room.isBooked ? "(Booked)" : "(Available)"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
