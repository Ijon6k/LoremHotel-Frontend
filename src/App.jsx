import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import RoomList from "./Pages/Rooms";
import BookingForm from "./Pages/SearchRoom";
import Booking from "./Pages/Booking";
import Invoice from "./Pages/Invoice";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<RoomList />}></Route>
        <Route path="/search" element={<BookingForm />}></Route>
        <Route path="/booking/:id" element={<Booking />} />{" "}
        <Route path="/invoice/:id" element={<Invoice />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
