import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormInput from "../Components/FormInput";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the styles for toast

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    guests: 1,
    name: "",
    phone: "",
    email: "",
  });
  const [totalCost, setTotalCost] = useState(0);
  const [days, setDays] = useState(0);
  const [error, setError] = useState("");

  // Fungsi untuk mencoba fetch dari URL eksternal terlebih dahulu
  const fetchRoomData = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const roomData = await response.json();
        return roomData;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Melakukan fetch dari URL eksternal terlebih dahulu, fallback ke localhost jika gagal
  useEffect(() => {
    const fetchRoom = async () => {
      let roomData = await fetchRoomData(`http://localhost:8080/booking/${id}`);

      if (!roomData) {
        roomData = await fetchRoomData(
          `https://9qqcwcvt-8080.asse.devtunnels.ms/booking/${id}`,
        );
      }

      if (roomData) {
        setRoom(roomData);
      } else {
        console.error("Room not found");
      }
    };

    fetchRoom();
  }, [id]);

  useEffect(() => {
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const calculatedDays = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24),
    );

    if (room && calculatedDays > 0) {
      setTotalCost(room.price_per_night * calculatedDays);
      setDays(calculatedDays);
    } else {
      setTotalCost(0);
      setDays(0);
    }
  }, [formData.checkIn, formData.checkOut, room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "adults" || name === "children" || name === "guests"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi jumlah penghuni
    const totalGuests = formData.adults + formData.children;
    if (room && totalGuests > room.capacity) {
      setError(
        `The number of guests exceeds the room's capacity. The maximum capacity is ${room.capacity} guests.`,
      );
      toast.error("The number of guests exceeds the room's capacity.");
      return;
    }

    // Validasi tanggal check-in dan check-out
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    if (checkInDate >= checkOutDate) {
      setError("Check-in and check-out dates are invalid.");
      toast.error("Check-in and check-out dates are invalid.");
      return;
    }

    setError(""); // Reset error jika tidak ada error

    const bookingData = {
      roomId: room.id,
      roomType: room.type,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      adults: formData.adults,
      children: formData.children,
      guests: formData.guests, // Include guests in the booking data
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      totalCost: totalCost,
      days: days,
    };

    // Fungsi untuk mencoba fetch dari URL yang diforward terlebih dahulu
    const tryFetch = async (url) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        if (response.ok) {
          return await response.json();
        } else {
          throw new Error("Error confirming booking");
        }
      } catch (error) {
        return null;
      }
    };

    const localUrl = "http://localhost:8080/confirm";
    let responseData = await tryFetch(localUrl);

    // If fetching from localhost fails, try the forwarded URL
    if (!responseData) {
      const forwardedUrl = "https://9qqcwcvt-8080.asse.devtunnels.ms/confirm";
      responseData = await tryFetch(forwardedUrl);
    }

    if (responseData) {
      toast.success(responseData.confirmationMessage); // Show success toast
      navigate(`/invoice/${responseData.booking.id}`);
    } else {
      toast.error("Error confirming booking"); // Show error toast
    }
  };

  return (
    <div className="w-screen-xl m-auto flex h-screen max-w-screen-2xl items-center justify-center text-primary">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-14 top-5 text-2xl"
      >
        <MdOutlineArrowBackIos />
      </button>
      <div className="flex h-screen max-h-[1000px] w-2/3 max-w-[700px] flex-col justify-center px-14 pt-16">
        {room && (
          <>
            <h1 className="w-full text-3xl font-bold">
              Confirm Your Reservation
            </h1>
            <h2 className="mb-6 text-2xl font-semibold">{room.type}</h2>

            <form onSubmit={handleSubmit} className="">
              <div className="flex w-full justify-between">
                <div className="flex">
                  <FormInput
                    label="Check-In Date"
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    required
                    customInput={" w-36 mr-5"}
                  />
                  <FormInput
                    label="Check-Out Date"
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    required
                    customInput={" w-36 "}
                  />
                </div>
                <div className="flex gap-3">
                  <FormInput
                    label="Adults"
                    type="number"
                    name="adults"
                    value={formData.adults}
                    onChange={handleChange}
                    min="1"
                    required
                    customInput={"w-14"}
                  />
                  <FormInput
                    label="Children"
                    type="number"
                    name="children"
                    value={formData.children}
                    onChange={handleChange}
                    min="0"
                    customInput={"w-14"}
                  />
                </div>
              </div>
              <FormInput
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                customInput={"w-full"}
              />
              <FormInput
                label="Phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                customInput={"w-full"}
              />
              <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                customInput={"w-full"}
              />
              <FormInput
                label="Any Request?"
                type="text"
                name="request"
                value={formData.city}
                onChange={handleChange}
                customInput={"w-full h-16"}
              />
              {error && <p className="mt-2 text-red-600">{error}</p>}
              <div className="mt-6">
                <strong className="text-lg font-semibold">
                  Total Cost: ${totalCost} for {days}{" "}
                  {days === 1 ? "day" : "days"}
                </strong>
              </div>
              <button
                type="submit"
                className="w-64 rounded-2xl bg-primary px-4 py-2 text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Book Now
              </button>
            </form>
          </>
        )}
      </div>

      {room && (
        <div className="w-fit">
          <img
            src={room.image}
            alt={room.type}
            className="m-auto h-screen max-h-[700px] max-w-[700px] rounded-bl-[5%] rounded-tl-[5%] object-cover object-center"
          />
        </div>
      )}
    </div>
  );
};

export default Booking;
