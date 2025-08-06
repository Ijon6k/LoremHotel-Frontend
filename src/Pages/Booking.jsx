import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { MdOutlineArrowBackIos } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

// Buat instance Axios dengan baseURL untuk semua permintaan API.
// Ini menyederhanakan permintaan karena Anda hanya perlu menyediakan path endpoint.
const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

// Definisikan skema Zod untuk validasi form.
// Skema ini menentukan tipe dan batasan untuk setiap field form.
const createBookingSchema = (roomCapacity) =>
  z
    .object({
      checkIn: z.string().min(1, "Tanggal Check-in harus diisi."),
      checkOut: z.string().min(1, "Tanggal Check-out harus diisi."),
      adults: z
        .number({ invalid_type_error: "Jumlah orang dewasa harus diisi." })
        .min(1, "Minimal harus ada satu orang dewasa."),
      children: z
        .number({ invalid_type_error: "Jumlah anak harus diisi." })
        .min(0),
      name: z.string().min(1, "Nama harus diisi."),
      phone: z.string().min(1, "Nomor telepon harus diisi."),
      email: z.string().email("Alamat email tidak valid."),
      request: z.string().optional(),
    })
    // .refine() digunakan untuk validasi yang bergantung pada beberapa field.
    .refine((data) => new Date(data.checkIn) < new Date(data.checkOut), {
      message: "Tanggal Check-out harus setelah tanggal Check-in.",
      path: ["checkOut"], // Mengaitkan error dengan field checkOut.
    })
    .refine(
      (data) => {
        if (typeof roomCapacity !== "number") return true; // Lewati jika kapasitas belum dimuat
        return data.adults + data.children <= roomCapacity;
      },
      {
        message: `Jumlah tamu melebihi kapasitas kamar yaitu ${roomCapacity}.`,
        path: ["adults"], // Mengaitkan error dengan field adults.
      },
    );

// Komponen FormInput yang kompatibel dengan React Hook Form.
// Komponen ini menerima props 'register' dan 'error' untuk integrasi.
const FormInput = ({
  label,
  name,
  type,
  register,
  error,
  customInput,
  ...props
}) => {
  const isTextArea = type === "textarea";
  const InputComponent = isTextArea ? "textarea" : "input";

  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <InputComponent
        id={name}
        type={isTextArea ? undefined : type}
        {...props}
        {...register(name, {
          valueAsNumber: type === "number",
        })}
        className={`rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 ${customInput}`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
    </div>
  );
};

// Komponen utama Booking.
const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [days, setDays] = useState(0);

  // Buat skema secara dinamis setelah data kamar (dan kapasitasnya) tersedia.
  const bookingSchema = createBookingSchema(room?.capacity);

  // Inisialisasi react-hook-form dengan Zod resolver.
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      adults: 1,
      children: 0,
      name: "",
      phone: "",
      email: "",
      request: "",
    },
  });

  // Gabungkan semua pesan error menjadi satu string untuk ditampilkan, meniru perilaku asli.
  const errorMessages = Object.values(errors)
    .map((e) => e.message)
    .join(" ");

  // Pantau perubahan pada tanggal check-in dan check-out untuk menghitung ulang biaya.
  const checkInValue = watch("checkIn");
  const checkOutValue = watch("checkOut");

  // useEffect untuk mengambil detail kamar saat komponen dimuat atau ID berubah.
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await apiClient.get(`/booking/${id}`);
        setRoom(response.data);
      } catch (error) {
        console.error("Gagal mengambil data kamar:", error);
        toast.error("Tidak dapat menemukan kamar yang diminta.");
      }
    };
    fetchRoom();
  }, [id]);

  // useEffect untuk menghitung total biaya setiap kali tanggal atau info kamar berubah.
  useEffect(() => {
    if (room && checkInValue && checkOutValue) {
      const checkInDate = new Date(checkInValue);
      const checkOutDate = new Date(checkOutValue);
      if (checkOutDate > checkInDate) {
        const calculatedDays = Math.ceil(
          (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24),
        );
        setDays(calculatedDays);
        setTotalCost(room.price_per_night * calculatedDays);
      } else {
        setDays(0);
        setTotalCost(0);
      }
    }
  }, [checkInValue, checkOutValue, room]);

  // Fungsi handler untuk submit.
  // Menerima data form yang sudah divalidasi dari react-hook-form.
  const onSubmit = async (data) => {
    const bookingData = {
      ...data,
      roomId: room.id,
      roomType: room.type,
      totalCost,
      days,
      guests: data.adults + data.children,
    };

    try {
      const response = await apiClient.post("/confirm", bookingData);
      toast.success(response.data.confirmationMessage || "Pemesanan berhasil!");
      navigate(`/invoice/${response.data.booking.id}`);
    } catch (error) {
      console.error("Error saat konfirmasi pemesanan:", error);
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan saat pemesanan.",
      );
    }
  };

  if (!room) {
    return (
      <div className="flex h-screen items-center justify-center">Memuat...</div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className="w-screen-xl m-auto flex h-screen max-w-screen-2xl items-center justify-center text-primary">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-14 top-5 text-2xl"
        >
          <MdOutlineArrowBackIos />
        </button>
        <div className="flex h-screen max-h-[1000px] w-full flex-col justify-center px-6 pt-16 sm:w-2/3 sm:px-14">
          <h1 className="w-full text-3xl font-bold">
            Konfirmasi Reservasi Anda
          </h1>
          <h2 className="mb-6 text-2xl font-semibold">{room.type}</h2>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex w-full flex-wrap justify-between gap-4">
              <div className="flex gap-5">
                <FormInput
                  label="Tanggal Check-In"
                  type="date"
                  name="checkIn"
                  register={register}
                  error={errors.checkIn}
                  required
                  customInput={"w-36"}
                />
                <FormInput
                  label="Tanggal Check-Out"
                  type="date"
                  name="checkOut"
                  register={register}
                  error={errors.checkOut}
                  required
                  customInput={"w-36"}
                />
              </div>
              <div className="flex gap-3">
                <FormInput
                  label="Dewasa"
                  type="number"
                  name="adults"
                  register={register}
                  error={errors.adults}
                  min="1"
                  required
                  customInput={"w-14"}
                />
                <FormInput
                  label="Anak-anak"
                  type="number"
                  name="children"
                  register={register}
                  error={errors.children}
                  min="0"
                  customInput={"w-14"}
                />
              </div>
            </div>
            <FormInput
              label="Nama"
              type="text"
              name="name"
              register={register}
              error={errors.name}
              required
              customInput={"w-full"}
            />
            <FormInput
              label="Telepon"
              type="tel"
              name="phone"
              register={register}
              error={errors.phone}
              required
              customInput={"w-full"}
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              register={register}
              error={errors.email}
              required
              customInput={"w-full"}
            />
            <FormInput
              label="Ada Permintaan?"
              type="textarea"
              name="request"
              register={register}
              error={errors.request}
              customInput={"w-full h-16"}
            />
            {errorMessages && (
              <p className="mt-2 text-red-600">{errorMessages}</p>
            )}
            <div className="mt-6">
              <strong className="text-lg font-semibold">
                Total Biaya: ${totalCost.toLocaleString()} untuk {days}{" "}
                {days === 1 ? "malam" : "malam"}
              </strong>
            </div>
            <button
              type="submit"
              className="mt-4 w-64 rounded-2xl bg-primary px-4 py-2 text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Pesan Sekarang
            </button>
          </form>
        </div>

        <div className="hidden w-fit sm:block">
          <img
            src={
              room.image ||
              "https://placehold.co/600x700/E2E8F0/4A5568?text=Room+Image"
            }
            alt={room.type}
            className="m-auto h-screen max-h-[700px] max-w-[700px] rounded-bl-[5%] rounded-tl-[5%] object-cover object-center"
          />
        </div>
      </div>
    </>
  );
};

export default Booking;
