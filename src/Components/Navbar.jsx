import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 z-10 mx-auto flex h-14 w-screen max-w-screen-2xl items-center border-b-2 border-primary bg-[#FDF7F1]">
      <ul className="mx-10 flex w-full items-center justify-between gap-7 text-primary md:text-xl md:font-semibold">
        <li className="text-2xl font-extrabold">
          <Link to={"/"}>Lorem Hotel.</Link>
        </li>
        <div className="flex gap-7">
          <li>
            <Link to="/">Room</Link>
          </li>
          <li className="border-l-2 border-r-2 border-primary px-5">
            <Link to="/">Gallery</Link>
          </li>
          <li>
            <Link to="/">Contact Us</Link>
          </li>
        </div>

        <li>
          <Link
            to="/search"
            className="rounded-3xl border-2 border-primary px-3 py-1 text-lg font-semibold transition-all duration-200 hover:bg-primary hover:text-white"
          >
            Reserve Now
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
