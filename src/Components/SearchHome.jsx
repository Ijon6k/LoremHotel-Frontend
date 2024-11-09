import { FaSearch } from "react-icons/fa";

const SearchHome = ({ customClass }) => {
  return (
    <div className={`flex ${customClass} overflow-hidden rounded-xl`}>
      <div
        className={`mx-auto flex max-w-3xl items-end space-x-4 bg-white px-10 py-3 font-bold text-primary shadow-md`}
      >
        {/* Check-in Date */}
        <div className="flex w-fit flex-grow flex-col">
          <label className="mb-1 text-sm">Check-In</label>
          <input
            type="date"
            className="rounded-xl border-2 border-primary p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Check-out Date */}
        <div className="flex flex-grow flex-col">
          <label className="mb-1 text-sm">Check-Out</label>
          <input
            type="date"
            className="rounded-xl border-2 border-primary p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Adults */}
        <div className="flex flex-grow flex-col">
          <label className="mb-1 text-center text-sm">Adults</label>
          <input
            type="number"
            min="1"
            defaultValue="1"
            className="w-14 rounded-2xl border-2 border-primary p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Children */}
        <div className="flex flex-grow flex-col">
          <label className="mb-1 text-center text-sm">Children</label>
          <input
            type="number"
            min="0"
            defaultValue="0"
            className="w-14 rounded-2xl border-2 border-primary p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Search Button */}
      </div>

      <button className="bg-primary px-16 py-2 text-white transition duration-200 hover:bg-blue-900">
        <FaSearch color="white" size={25} />
      </button>
    </div>
  );
};

export default SearchHome;
