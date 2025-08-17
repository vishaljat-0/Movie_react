import React, { useRef, useEffect } from "react";
import "./HorizontalCards.css"; // For custom scrollbar styles
import Dropdowen from "./Dropdowen";
import { Link } from "react-router-dom";

function HorizontalCards({ data }) {
  const scrollRef = useRef(null);

  // Horizontal scroll with mouse wheel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollTo({
        left: el.scrollLeft + e.deltaY,
        behavior: "smooth",
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="w-full h-[50vh]  overflow-hidden mb-5 px-4 py-6 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40]">
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto p-2 custom-scroll"
      >
        {data.map((d, idx) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={idx}
            className="relative min-w-[180px] h-[270px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden flex flex-col"
          >
            {/* Image Wrapper */}
            <div className="relative w-full h-[170px] overflow-hidden">
              <img
                src={
                  d.poster_path || d.profile_path || d.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500/${
                        d.poster_path || d.profile_path || d.backdrop_path
                      }`
                    : "https://via.placeholder.com/180x260?text=No+Image"
                }
                alt="Trending"
                className="w-full h-full object-cover"
              />
              <svg
                className="absolute bottom-0 left-0 w-full h-6"
                viewBox="0 0 800 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,20 Q400,60 800,20 L800,100 L0,100 Z"
                  fill="#1e1e2f"
                />
              </svg>
            </div>

            {/* Title */}
            <div className="h-[100px] px-3 flex items-center justify-center text-white font-semibold text-sm text-center overflow-hidden text-ellipsis">
              {d.title || d.name || d.original_title || d.original_name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HorizontalCards;
