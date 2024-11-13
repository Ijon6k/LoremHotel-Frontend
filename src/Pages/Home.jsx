import PageWrapper from "../Components/PageWrapper";
import hotelvector from "/image/hotelvector.png";
import SearchHome from "../Components/SearchHome";
import deluxe from "/image/deluxe.png";
import suite from "/image/suite.png";
import standard from "/image/standard.png";
import family from "/image/family.png";
import { IoPerson } from "react-icons/io5";

const Home = () => {
  return (
    <PageWrapper customClass=" h-screen">
      <main className="relative h-[85%] max-h-[800px] w-full bg-[url('/image/landingBG.png')] bg-cover bg-center">
        <SearchHome customClass="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 mt-10 shadow-lg" />

        <div className="absolute left-10 top-1/3 text-[#FDF7F1]">
          <h1 className="text-5xl font-bold">Welcome to Lorem Hotel.</h1>
          <p className="w-[75%] text-xl">
            Experience unmatched comfort and unforgettable moments. Your perfect
            stay awaits.
          </p>
        </div>
      </main>

      <section className="w-screen-2xl flex h-screen max-h-[1000px] items-center justify-center text-primary">
        <div className="w-1/2">
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
        <div className="w-[500px]">
          <img src={hotelvector} className="" />
        </div>
      </section>

      {/* room section */}

      <section className="mx-auto h-auto max-w-screen-xl px-10 text-2xl">
        {/*  */}
        <div className="pb-10 text-center text-primary">
          <h1 className="text-4xl font-semibold">Room Option</h1>
          <p>
            Discover a variety of room options at Lorem Hotel, where every stay
            is tailored to your needs:
          </p>
        </div>
        {/*  */}
        <div className="flex h-[350px] w-full gap-10">
          <div className="relative h-full w-[30%] overflow-hidden rounded-md">
            <img
              src={standard}
              className="h-full w-full object-cover object-center"
            />
            <p className="absolute left-5 top-5 text-3xl font-semibold text-white">
              Standard room
            </p>
            <div className="absolute bottom-0 flex w-full bg-primary px-10 py-2">
              <div className="flex h-fit items-center gap-2 text-white">
                <span className="h-fit">2</span>{" "}
                <span>
                  <IoPerson size={30} />
                </span>
              </div>
              <p className="w-full text-end font-semibold text-[#F8D7A4]">
                100$/Night
              </p>
            </div>
          </div>
          <div className="relative h-full w-[70%] overflow-hidden rounded-md">
            <img
              src={suite}
              alt=""
              className="h-full w-full object-cover object-center"
            />
            <p className="absolute left-5 top-5 text-3xl font-semibold text-white">
              Suite room
            </p>
            <div className="absolute bottom-0 flex w-full bg-primary px-10 py-2">
              <p className="flex h-fit w-fit items-center gap-2 text-white">
                <span className="h-fit">6</span>{" "}
                <span>
                  <IoPerson size={30} />
                </span>{" "}
              </p>
              <p className="w-full text-end font-semibold text-[#F8D7A4]">
                900$/Night
              </p>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="mt-10 flex h-[350px] w-full gap-10">
          <div className="relative h-full w-1/2 overflow-hidden rounded-md">
            <img
              src={family}
              className="h-full w-full object-cover object-center"
            />
            <p className="absolute left-5 top-5 text-3xl font-semibold text-white">
              Family room
            </p>
            <div className="absolute bottom-0 flex w-full bg-primary px-10 py-2 text-white">
              <p className="flex h-fit items-center gap-2">
                <span className="h-fit">5</span>{" "}
                <span>
                  <IoPerson size={30} />
                </span>{" "}
              </p>
              <p className="w-full text-end font-semibold text-[#F8D7A4]">
                {" "}
                100$/Night
              </p>
            </div>
          </div>
          <div className="relative h-full w-1/2 overflow-hidden rounded-md">
            <img
              src={deluxe}
              alt=""
              className="h-full w-full object-cover object-center"
            />
            <p className="absolute left-5 top-5 text-3xl font-semibold text-white">
              Deluxe room
            </p>
            <div className="absolute bottom-0 flex w-full bg-primary px-10 py-2 text-white">
              <p className="flex h-fit items-center gap-2">
                <span className="h-fit">2</span>{" "}
                <span>
                  <IoPerson size={30} />
                </span>{" "}
              </p>
              <p className="w-full text-end font-semibold text-[#F8D7A4]">
                {" "}
                300$/Night
              </p>
            </div>
          </div>
        </div>

        {/*  */}
      </section>
    </PageWrapper>
  );
};

export default Home;
