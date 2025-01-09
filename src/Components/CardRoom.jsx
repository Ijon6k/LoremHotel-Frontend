// CardRoom.js
import { useNavigate } from "react-router-dom";

const CardRoom = ({ room }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking/${room.id}`);
  };

  return (
    <li className="mb-10 flex w-full flex-col items-center sm:w-fit sm:flex-row">
      <div className="flex h-auto w-full max-w-xs flex-col justify-between rounded-md border-2 border-slate-300 bg-slate-200 p-5 sm:h-80 sm:w-72">
        <div>
          <strong className="text-xl sm:text-2xl">{room.type}</strong>
          <p className="sm:text-md text-sm text-gray-600">{room.description}</p>
          <p className="text-md font-semibold sm:text-lg">
            Price per Night: ${room.price_per_night}
          </p>
          <p className="text-md font-semibold sm:text-lg">
            Capacity: {room.capacity}
          </p>
        </div>
        <div>
          <div>
            <strong className="text-lg font-semibold text-orange-600 sm:text-2xl">
              ${room.total_price} for {room.stay_duration} days
            </strong>
          </div>
          <button
            onClick={handleBooking}
            className="mt-3 w-full rounded-md bg-primary px-3 py-2 text-lg text-white transition hover:bg-blue-900 sm:text-xl"
          >
            Booking
          </button>
        </div>
      </div>
      <img
        src={room.image}
        alt=""
        className="h-48 w-full rounded-md object-cover sm:h-96 sm:w-[600px]"
      />
    </li>
  );
};

export default CardRoom;
