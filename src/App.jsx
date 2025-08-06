import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import RoomList from "./Pages/Rooms";
import Booking from "./Pages/Booking";
import Invoice from "./Pages/Invoice";
import { ToastContainer } from "react-toastify";
import SearchRoom from "./Pages/SearchRoom";

const App = () => {
  return (
    <Router>
      <ToastContainer
        position="top-center" // Centers the toast horizontally
        autoClose={3000} // Auto close after 5 seconds
        hideProgressBar={true} // Hides the progress bar
        newestOnTop={false} // Places the newest toast at the bottom
        closeButton={false} // Removes the close button (optional)
        pauseOnFocusLoss
        draggable
      />{" "}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<RoomList />}></Route>
        <Route path="/search" element={<SearchRoom />}></Route>
        <Route path="/booking/:id" element={<Booking />} />{" "}
        <Route path="/invoice/:id" element={<Invoice />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
