import PageWrapper from "../Components/PageWrapper";
import hotelvector from "/image/hotelvector.png";
// import SearchHome from "../Components/SearchHome";
import deluxe from "/image/deluxe.png";
import suite from "/image/suite.png";
import standard from "/image/standard.png";
import family from "/image/family.png";
import { IoPerson } from "react-icons/io5";
import { useRef } from "react";

const Home = () => {
  const roomOptionsRef = useRef(null);

  const scrollToRoomOptions = () => {
    window.scrollTo({
      top: roomOptionsRef.current.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <PageWrapper customClass=" h-screen">
      <main className="flex h-full max-h-[1200px] w-full items-center justify-center bg-[url('/image/landingBG.png')] bg-cover bg-center text-[#FDF7F1]">
        <div className="mb-24 text-center">
          <h1 className="text-5xl font-bold">Welcome to Lorem Hotel.</h1>
          <p className="w-full text-xl">
            Experience unmatched comfort and unforgettable moments. Your perfect
            stay awaits.
          </p>
          <button
            onClick={scrollToRoomOptions}
            className="hover:bg-primary-dark mt-5 rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-white"
          >
            View Room Options
          </button>
        </div>
      </main>

      <section className="w-screen-2xl flex h-screen max-h-[1000px] flex-col items-center justify-center p-10 text-center text-primary sm:flex-row sm:p-0 sm:text-start">
        <div className="w-full sm:w-1/2">
          <h1 className="text-5xl font-bold">Welcome to Lorem Hotel.</h1>
          <br />
          <p className="text-xl font-medium">
            With a perfect blend of comfort and luxury, our hotel is designed to
            provide a peaceful retreat for all guests. Enjoy our modern
            facilities and inviting atmosphere, whether you’re visiting for
            business or leisure.
          </p>
          <br />
          <p>Lorem Hotel. – The essence of relaxation.</p>
        </div>
        <div className="w-96 sm:w-[500px]">
          <img src={hotelvector} className="" />
        </div>
      </section>

      {/* room section */}

      <section
        ref={roomOptionsRef}
        className="mx-auto h-full max-w-screen-xl px-10 text-2xl"
      >
        {/* Header */}
        <div className="pb-10 text-center text-primary">
          <h1 className="text-4xl font-semibold">Room Option</h1>
          <p>
            Discover a variety of room options at Lorem Hotel, where every stay
            is tailored to your needs:
          </p>
        </div>

        {/* Room Cards */}
        <div className="flex flex-wrap gap-10">
          {/* Standard Room */}
          <div className="relative flex w-full flex-col overflow-hidden rounded-md bg-gray-200 sm:w-[48%]">
            <img
              src={standard}
              alt="Standard Room"
              className="h-[250px] w-full object-cover object-center"
            />
            <p className="absolute left-5 top-5 text-3xl font-semibold text-white">
              Standard room
            </p>
            <div className="absolute bottom-0 flex w-full bg-primary px-10 py-2">
              <div className="flex items-center gap-2 text-white">
                <span>2</span>
                <IoPerson size={30} />
              </div>
              <p className="w-full text-end font-semibold text-[#F8D7A4]">
                100$/Night
              </p>
            </div>
          </div>

          {/* Suite Room */}
          <div className="relative flex w-full flex-col overflow-hidden rounded-md bg-gray-200 sm:w-[48%]">
            <img
              src={suite}
              alt="Suite Room"
              className="h-[250px] w-full object-cover object-center"
            />
            <p className="absolute left-5 top-5 text-3xl font-semibold text-white">
              Suite room
            </p>
            <div className="absolute bottom-0 flex w-full bg-primary px-10 py-2">
              <div className="flex items-center gap-2 text-white">
                <span>6</span>
                <IoPerson size={30} />
              </div>
              <p className="w-full text-end font-semibold text-[#F8D7A4]">
                900$/Night
              </p>
            </div>
          </div>

          {/* Family Room */}
          <div className="relative flex w-full flex-col overflow-hidden rounded-md bg-gray-200 sm:w-[48%]">
            <img
              src={family}
              alt="Family Room"
              className="h-[250px] w-full object-cover object-center"
            />
            <p className="absolute left-5 top-5 text-3xl font-semibold text-white">
              Family room
            </p>
            <div className="absolute bottom-0 flex w-full bg-primary px-10 py-2">
              <div className="flex items-center gap-2 text-white">
                <span>5</span>
                <IoPerson size={30} />
              </div>
              <p className="w-full text-end font-semibold text-[#F8D7A4]">
                100$/Night
              </p>
            </div>
          </div>

          {/* Deluxe Room */}
          <div className="relative flex w-full flex-col overflow-hidden rounded-md bg-gray-200 sm:w-[48%]">
            <img
              src={deluxe}
              alt="Deluxe Room"
              className="h-[250px] w-full object-cover object-center"
            />
            <p className="absolute left-5 top-5 text-3xl font-semibold text-white">
              Deluxe room
            </p>
            <div className="absolute bottom-0 flex w-full bg-primary px-10 py-2">
              <div className="flex items-center gap-2 text-white">
                <span>2</span>
                <IoPerson size={30} />
              </div>
              <p className="w-full text-end font-semibold text-[#F8D7A4]">
                300$/Night
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Home;
