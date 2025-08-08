import "../App.css";
import { NavLink } from "react-router-dom";

const LandingPage = ({name}) => {
  return (
    <section className="w-full px-6 md:px-8 py-14 bg-[#f5faff]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div>
          <p className="text-sm text-indigo-600 font-medium uppercase tracking-wider mb-3">
            Welcome to
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight font-serif">
            {name}
          </h1>
          <p className="text-gray-700 text-base sm:text-lg mb-8 leading-relaxed">
            Discover a wide selection of high-quality products at unbeatable prices. From everyday essentials to exclusive finds, Market Store is your one-stop shop for everything you need—all in one place.
          </p>
          <NavLink to="/products">
            <button className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-base font-medium px-7 py-3 rounded-md shadow-md transition duration-300 ease-in-out">
              Shop Now
            </button>
          </NavLink>
        </div>

        {/* RIGHT IMAGE with BLUE BOX */}
        <div className="relative w-full max-w-md mx-auto md:mx-0">
          {/* Blue Box behind image */}
          <div className="absolute -top-6 -right-6 w-full h-full bg-indigo-300 z-0 rounded-lg shadow-lg"></div>
          <img
            src="/images/landing-page.png"
            alt="family shopping"
            className="w-full rounded-lg shadow-xl relative z-10 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
