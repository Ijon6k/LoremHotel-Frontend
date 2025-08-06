import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import PageWrapper from "../Components/PageWrapper";
import Banner from "/image/banner.png";
import { FaSearch } from "react-icons/fa";
import CardRoom from "../Components/CardRoom";

const API_URL = "http://localhost:8080/search";

// 🎯 Schema validasi Zod
const searchSchema = z.object({
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  adults: z.coerce.number().min(1, "At least 1 adult required"),
  children: z.coerce.number().min(0, "Children must be 0 or more"),
});

const SearchRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      checkIn: "",
      checkOut: "",
      adults: 1,
      children: 0,
    },
  });

  const onSubmit = async (data) => {
    setError("");
    setIsLoading(true);
    setRooms([]);

    try {
      const response = await axios.post(API_URL, data);
      setRooms(response.data);
    } catch (err) {
      console.error(err);
      setError(
        "An error occurred while fetching rooms. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper customClass="h-screen">
      <div className="relative">
        <img
          src={Banner}
          alt="Hotel Banner"
          className="h-72 w-full object-cover"
        />
        <p className="absolute left-1/2 top-1/3 w-full -translate-x-1/2 -translate-y-1/2 transform text-center text-2xl font-bold text-white sm:text-5xl">
          Find Your Perfect Room
        </p>

        {/* 🎯 Form pakai hook-form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="absolute bottom-0 left-1/2 mt-10 flex w-[95%] max-w-4xl -translate-x-1/2 translate-y-1/2 transform flex-col items-center overflow-hidden rounded-xl bg-white shadow-lg md:flex-row"
        >
          <div className="flex w-full flex-col gap-4 font-bold text-primary md:flex-row md:items-end">
            <div className="flex-1 md:p-2">
              <label className="mb-1 block text-sm">Check-In</label>
              <input
                type="date"
                {...register("checkIn")}
                className="w-full rounded-xl border-2 border-primary p-2 focus:outline-none focus:ring focus:ring-blue-400"
              />
              {errors.checkIn && (
                <p className="text-sm text-red-500">{errors.checkIn.message}</p>
              )}
            </div>

            <div className="flex-1 md:p-2">
              <label className="mb-1 block text-sm">Check-Out</label>
              <input
                type="date"
                {...register("checkOut")}
                className="w-full rounded-xl border-2 border-primary p-2 focus:outline-none focus:ring focus:ring-blue-400"
              />
              {errors.checkOut && (
                <p className="text-sm text-red-500">
                  {errors.checkOut.message}
                </p>
              )}
            </div>

            <div className="flex-1 md:p-2">
              <label className="mb-1 block text-center text-sm">Adults</label>
              <input
                type="number"
                min="1"
                {...register("adults")}
                className="w-full rounded-xl border-2 border-primary p-2 text-center focus:outline-none focus:ring focus:ring-blue-400"
              />
              {errors.adults && (
                <p className="text-center text-sm text-red-500">
                  {errors.adults.message}
                </p>
              )}
            </div>

            <div className="flex-1 md:p-2">
              <label className="mb-1 block text-center text-sm">Children</label>
              <input
                type="number"
                min="0"
                {...register("children")}
                className="w-full rounded-xl border-2 border-primary p-2 text-center focus:outline-none focus:ring focus:ring-blue-400"
              />
              {errors.children && (
                <p className="text-center text-sm text-red-500">
                  {errors.children.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center bg-primary p-10 text-white transition duration-200 hover:bg-blue-900 md:h-full md:w-auto md:px-10"
          >
            <FaSearch size={25} />
          </button>
        </form>
      </div>

      <div className="mt-28 px-4 pb-20 text-center">
        {isLoading && (
          <div className="text-2xl font-semibold text-blue-600">
            Loading rooms...
          </div>
        )}
        {error && !isLoading && (
          <div className="text-3xl font-semibold text-red-600">{error}</div>
        )}
        {!isLoading && !error && rooms.length === 0 && (
          <div className="text-2xl font-semibold text-gray-600">
            Start your search to see available rooms.
          </div>
        )}
        {!isLoading && !error && rooms.length > 0 && (
          <div>
            <h3 className="mb-6 w-full border-b-4 border-primary/50 pb-2 text-left text-xl font-semibold">
              Available Rooms:
            </h3>
            <ul className="flex flex-col items-center gap-5">
              {rooms.map((room) => (
                <CardRoom key={room.id} room={room} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default SearchRoom;
