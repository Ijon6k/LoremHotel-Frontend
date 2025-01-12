import { useState } from "react";
import PageWrapper from "../Components/PageWrapper";
import Banner from "/image/banner.png";
import { FaSearch } from "react-icons/fa";
import CardRoom from "../Components/CardRoom";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
  });
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "adults" || name === "children" ? parseInt(value) : value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    // Check if check-in date is earlier than check-out date
    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      setError("Check-out date must be later than check-in date.");
      return;
    }

    setRooms([]);
    setIsLoading(true);

    const fetchWithTimeout = (url, options, timeout = 5000) => {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(
          () => reject(new Error("Request timed out")),
          timeout,
        );
        fetch(url, options)
          .then(resolve)
          .catch(reject)
          .finally(() => clearTimeout(timer));
      });
    };

    try {
      let response = await Promise.race([
        fetchWithTimeout(
          "https://2bq4z8pt-8080.asse.devtunnels.ms/search",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          },
          5000, // Timeout 5 seconds
        ),
        // This timeout will trigger if the forwarded port request takes longer than 5 seconds
      ]);

      if (!response.ok) {
        throw new Error("Forwarded port not available, trying localhost...");
      }

      const data = await response.json();
      setRooms(data);

      if (data.length === 0) {
        setError("No available rooms found.");
      }
    } catch (error) {
      console.log(error.message);

      // If error is due to timeout or failure, proceed to localhost request
      try {
        let response = await fetch("http://localhost:8080/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          setError("No available rooms found.");
          return;
        }

        const data = await response.json();
        setRooms(data);

        if (data.length === 0) {
          setError("No available rooms found.");
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("An error occurred while fetching rooms.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper customClass="h-screen">
      <div className="relative">
        <img src={Banner} alt="" className="h-72 w-full" />
        <p className="absolute left-1/2 top-1/3 w-full -translate-x-1/2 -translate-y-1/2 transform text-center text-2xl font-bold text-white sm:text-5xl">
          Find Your Perfect Room
        </p>

        <form
          onSubmit={handleSearch}
          className="absolute bottom-0 left-1/2 mt-10 flex -translate-x-1/2 translate-y-1/2 transform flex-col items-center overflow-hidden rounded-xl shadow-lg sm:flex-row"
        >
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center bg-white px-10 py-3 font-bold text-primary shadow-md sm:flex-row sm:items-end">
            <div className="flex w-fit items-center gap-4">
              <div className="mt-4 flex w-full flex-col sm:mt-0">
                <label className="mb-1 text-sm">Check-In</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  required
                  className="rounded-xl border-2 border-primary p-2 focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>

              <div className="mt-4 flex w-full flex-col sm:ml-4 sm:mt-0">
                <label className="mb-1 text-sm">Check-Out</label>
                <input
                  value={formData.checkOut}
                  onChange={handleChange}
                  name="checkOut"
                  required
                  type="date"
                  className="rounded-xl border-2 border-primary p-2 focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="mt-4 flex w-full gap-2 sm:ml-4 sm:mt-0">
              <div className="flex flex-grow flex-col">
                <label className="mb-1 text-center text-sm">Adults</label>
                <input
                  type="number"
                  min="1"
                  name="adults"
                  value={formData.adults}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border-2 border-primary p-2 focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-grow flex-col">
                <label className="mb-1 text-center text-sm">Children</label>
                <input
                  type="number"
                  min="0"
                  name="children"
                  value={formData.children}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border-2 border-primary p-2 focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
            </div>
          </div>

          <button className="flex w-full items-center justify-center bg-primary py-2 text-white transition duration-200 hover:bg-blue-900 sm:mt-0 sm:w-fit sm:px-14 sm:py-9">
            <FaSearch color="white" size={25} />
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="mt-20 text-center text-2xl font-semibold text-blue-600">
          Loading rooms...
        </div>
      )}

      {error && !isLoading && (
        <div className="mt-20 text-center text-3xl font-semibold text-red-600">
          {error}
        </div>
      )}

      {!isLoading && !error && rooms.length === 0 && (
        <div className="mt-40 text-center text-2xl font-semibold text-gray-600 sm:mt-20">
          Start your search to see available rooms.
        </div>
      )}

      {!isLoading && !error && rooms.length > 0 && (
        <div className="pb-30 mx-10 mt-20">
          <ul className="mx-auto flex w-[90%] flex-col items-center gap-5">
            <h3 className="w-[70%] border-b-4 border-primary/50 text-xl font-semibold">
              Available Rooms:
            </h3>
            {rooms.map((room) => (
              <CardRoom key={room.id} room={room} />
            ))}
          </ul>
        </div>
      )}
    </PageWrapper>
  );
};

export default BookingForm;
