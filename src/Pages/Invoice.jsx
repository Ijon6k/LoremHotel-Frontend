import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "/image/WebLogo.png";

const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Untuk navigasi ke halaman Home
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/confirmed-booking/${id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch booking details");
        }
        const data = await response.json();
        setBookingDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  const handleConfirm = () => {
    // Navigasi ke halaman Home setelah konfirmasi
    navigate("/");
  };

  const handlePrint = () => {
    // Menyembunyikan bagian yang tidak ingin dicetak

    // Menyembunyikan elemen yang tidak perlu dicetak (misal tombol)
    const otherElements = document.querySelectorAll(".no-print");
    otherElements.forEach((el) => (el.style.display = "none"));

    // Memanggil dialog print
    window.print();

    // Menampilkan kembali elemen yang disembunyikan
    otherElements.forEach((el) => (el.style.display = "block"));
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-xl text-gray-600">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-xl text-red-600">{error}</h2>
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-xl text-gray-600">No booking details available.</h2>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-white">
      <div className="mx-auto h-screen w-[800px] max-w-screen-2xl">
        <div className="mx-auto flex h-52 items-center bg-[url('/image/invoiceBG.png')] pl-20 text-white">
          <div className="">
            <h1 className="text-5xl font-bold">Invoice</h1>
            <h1 className="text-3xl font-semibold">Lorem Hotel.</h1>
            <p>Jl. Kusuma Bangsa No.3 Grand Indonesia</p>
            <p>loremhotel@gmail.com</p>
          </div>
        </div>
        <div
          id="print-content"
          className="relative -mt-6 h-auto min-h-[calc(100vh-240px)] w-full rounded-tl-3xl rounded-tr-3xl border-2 border-primary/30 bg-[#FDF7F1] px-10 pt-5"
        >
          {/*  */}
          <img src={Logo} className="absolute bottom-10 right-10 h-8" />
          {/*  */}
          <div className="relative text-sm font-semibold text-[#625A5A]">
            <p className="absolute right-0 top-0">
              Invoice Number: #0{bookingDetails.id}
            </p>
            <p>Guest Name:</p>
            <strong className="text-xl font-bold text-primary">
              {bookingDetails.name}
            </strong>
            <p className="text-xs">{bookingDetails.email}</p>
            <p className="text-xs">{bookingDetails.phone}</p>
            <h1 className="text-xl font-bold text-primary">
              Room Type: {bookingDetails.roomType}
            </h1>
            <h1>
              Capacity:{" "}
              {(bookingDetails.adults || 0) + (bookingDetails.children || 0)}{" "}
            </h1>

            <p>Check-in Date:</p>
            <h1>{bookingDetails.checkIn}</h1>
            <p>Check-out Date:</p>
            <h1>{bookingDetails.checkOut}</h1>
            <p>Stay Days: {bookingDetails.days}</p>
          </div>
          <div className="w-full pt-10">
            <div className="flex w-full justify-between px-5 font-semibold text-[#625A5A]">
              <p>Qty</p>
              <p className="w-96">Room/Product</p>
              <p>Price</p>
            </div>

            <div className="mt-5 flex w-full justify-between border-2 border-primary px-8 py-8 text-lg font-semibold text-[#625A5A]">
              <p>1</p>
              <p className="text-center">Room: {bookingDetails.roomType}</p>
              <p>$ {bookingDetails.totalCost}</p>
            </div>
            <p className="pt-5 text-end font-bold text-[#625A5A]">
              Total: $ {bookingDetails.totalCost}
            </p>
          </div>
          <div className="flex justify-end gap-4 pt-5">
            <button
              onClick={handlePrint}
              className="no-print rounded border-2 border-primary px-6 py-2 font-semibold text-primary"
            >
              Print
            </button>
            <button
              onClick={handleConfirm}
              className="rounded bg-primary px-6 py-2 font-semibold text-white"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
