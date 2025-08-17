import React from "react";
import { Link } from "react-router-dom";

function Sidenav() {
  return (
    <div className="min-h-screen w-[70%] sm:w-[50%] md:w-[40%] lg:w-[20%] bg-gray-900 p-4 border-r border-zinc-700">
      {/* Logo */}
      <h1 className="text-lg sm:text-xl md:text-2xl text-white font-bold flex items-center gap-2 mb-8">
        <i className="ri-tv-fill text-[#6556CD] text-xl md:text-2xl"></i>
        <span>V-MAP</span>
      </h1>

      {/* Section: New Feeds */}
      <h2 className="text-white text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
        New Feeds
      </h2>
      <nav className="flex flex-col gap-2 text-white">
        {[
        { icon: "ri-fire-fill", label: "Trending", to:"/Trending" },
  { icon: "ri-star-fill", label: "Popular", to: "/Popular" },
  { icon: "ri-movie-2-fill", label: "Movies", to: "/Movies" },
  { icon: "ri-tv-2-fill", label: "TV Shows", to: "/TVShows" },
  { icon: "ri-user-3-fill", label: "People", to: "/People" },
        ].map(({ icon, label  ,to }, i) => (
          <Link
            to={to}
            key={i}
            // to={`/${label.toLowerCase().replace(" ", "")}`}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#6556CD] transition"
          >
            <i className={`${icon} hidden sm:block text-lg`}></i>
            <span className="text-sm sm:text-base">{label}</span>
          </Link>
        ))}
      </nav>

      <hr className="my-6 border-gray-600" />

      {/* Section: Website Info */}
      <h2 className="text-white text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
        Website Info
      </h2>
      <nav className="flex flex-col gap-2 text-white">
        <Link
          to="/about"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#6556CD] transition"
        >
          <i className="ri-information-fill hidden sm:block text-lg"></i>
          <span className="text-sm sm:text-base">About</span>
        </Link>
        <Link
          to="/Contact"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#6556CD] transition"
        >
          <i className="ri-mail-send-fill hidden sm:block text-lg"></i>
          <span className="text-sm sm:text-base">Contact Us</span>
        </Link>
      </nav>
    </div>
  );
}

export default Sidenav;
