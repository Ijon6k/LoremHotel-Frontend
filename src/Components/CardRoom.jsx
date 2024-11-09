// CardRoom.js
import { useNavigate } from "react-router-dom";

const CardRoom = ({ room }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking/${room.id}`);
  };

  return (
    <li className="flex w-fit">
      <div className="flex h-80 w-72 flex-col justify-between rounded-md border-2 border-slate-300 bg-slate-200 p-5">
        <div>
          {" "}
          <strong className="text-2xl">{room.type}</strong>
          <p className="text-md text-gray-600">{room.description}</p>
          <p className="text-lg font-semibold">
            Price per Night: ${room.price_per_night}
          </p>
          <p className="text-lg font-semibold">Capacity: {room.capacity}</p>
        </div>
        <div>
          <div>
            <strong className="text-2xl font-semibold text-orange-600">
              ${room.total_price} for {room.stay_duration} days{" "}
            </strong>
          </div>{" "}
          <button
            onClick={handleBooking}
            className="mt-3 rounded-md bg-primary px-3 py-2 text-xl text-white"
          >
            Booking
          </button>
        </div>
      </div>
      <img
        src={room.image}
        alt=""
        className="object-fit h-96 w-[600px] rounded-bl-md rounded-br-md rounded-tr-md object-cover object-center"
      />
    </li>
  );
};

export default CardRoom;
