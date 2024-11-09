import Navbar from "./Navbar";

const PageWrapper = ({ children, customClass }) => {
  return (
    <div
      className={`${customClass} mx-auto h-auto min-h-screen w-screen max-w-screen-2xl pb-20 pt-14`}
    >
      <Navbar></Navbar>
      {children}
    </div>
  );
};

export default PageWrapper;
