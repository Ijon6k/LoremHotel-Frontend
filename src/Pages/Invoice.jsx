import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "/image/WebLogo.png";

// Buat instance Axios dengan baseURL untuk semua permintaan API.
const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        // Gunakan apiClient untuk membuat permintaan GET ke endpoint yang benar.
        const response = await apiClient.get(`/confirmed-booking/${id}`);
        setBookingDetails(response.data);
      } catch (err) {
        // Tangani error jika permintaan gagal.
        console.error("Gagal mengambil detail pemesanan:", err);
        setError("Gagal mengambil detail pemesanan");
      } finally {
        // Pastikan loading diatur ke false setelah permintaan selesai.
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  const handleConfirm = () => {
    navigate("/"); // Navigasi ke halaman Home setelah konfirmasi
  };

  const handlePrint = () => {
    // Menyembunyikan elemen yang tidak perlu dicetak
    const elementsToHide = document.querySelectorAll(".no-print");
    elementsToHide.forEach((el) => (el.style.display = "none"));

    // Memanggil dialog print
    window.print();

    // Menampilkan kembali elemen yang disembunyikan setelah print
    elementsToHide.forEach((el) => (el.style.display = ""));
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-xl text-gray-600">Memuat...</h2>
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
        <h2 className="text-xl text-gray-600">
          Tidak ada detail pemesanan yang tersedia.
        </h2>
      </div>
    );
  }

  // Struktur JSX dan styling tetap sama persis.
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
          className="relative -mt-6 h-auto min-h-[calc(100vh-190px)] w-full rounded-tl-3xl rounded-tr-3xl border-2 border-primary/30 bg-[#FDF7F1] px-10 pt-5"
        >
          <img
            src={Logo}
            className="absolute bottom-10 left-10 h-8"
            alt="Logo"
          />
          <div className="relative text-sm font-semibold text-[#625A5A]">
            <p className="absolute right-0 top-0">
              Nomor Invoice: #0{bookingDetails.id}
            </p>
            <p>Nama Tamu:</p>
            <strong className="text-xl font-bold text-primary">
              {bookingDetails.name}
            </strong>
            <p className="text-xs">{bookingDetails.email}</p>
            <p className="text-xs">{bookingDetails.phone}</p>
            <h1 className="text-xl font-bold text-primary">
              Tipe Kamar: {bookingDetails.roomType}
            </h1>
            <h1>
              Kapasitas:{" "}
              {(bookingDetails.adults || 0) + (bookingDetails.children || 0)}{" "}
              Tamu
            </h1>

            <p>Tanggal Check-in: {bookingDetails.checkIn}</p>
            <p>Tanggal Check-out: {bookingDetails.checkOut}</p>

            <p>Lama Menginap: {bookingDetails.days} hari</p>
          </div>
          <div className="w-full pt-5">
            <div className="flex w-full justify-between px-5 font-semibold text-[#625A5A]">
              <p>Jml</p>
              <p className="w-96">Kamar/Produk</p>
              <p>Harga</p>
            </div>

            <div className="mt-2 flex w-full justify-between border-2 border-primary px-8 py-8 text-lg font-semibold text-[#625A5A]">
              <p>1</p>
              <p className="text-center">Kamar: {bookingDetails.roomType}</p>
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
              Cetak
            </button>
            <button
              onClick={handleConfirm}
              className="no-print rounded bg-primary px-6 py-2 font-semibold text-white"
            >
              Konfirmasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
