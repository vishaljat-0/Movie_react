import React from "react";
import { Link } from "react-router-dom";
function Frontheading({ wallpepar }) {
  const imagePath =
    wallpepar.backdrop_path || wallpepar.poster_path || wallpepar.profile_path;

  return (
    <div className="relative  h-[50vh] mb-5  w-full overflow-hidden z-0">
      {/* Background Image */}
      <img
        src={`https://image.tmdb.org/t/p/original/${imagePath}`}
        alt={wallpepar.title || wallpepar.name}
        className="absolute h-full w-full object-cover object-top"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-[#00000088] to-transparent z-10 "></div>

      {/* Content */}
      <Link     to={`/${wallpepar.media_type}/details/${wallpepar.id}`}  className="relative z-20 h-full flex flex-col justify-end p-6 md:p-12 text-white">
        <h1 className="text-2xl md:text-4xl font-bold">
          {wallpepar.title || wallpepar.name}
        </h1>
        <p className="mt-2 text-sm md:text-lg max-w-2xl line-clamp-3">
          {wallpepar.overview || "No description available."}
        </p>

        {/* Ratings & Popularity */}
      <div className="mt-4 flex flex-col sm:flex-row sm:gap-4 gap-2 text-xs sm:text-sm md:text-base">
  <span className="bg-[#ffffff22] px-3 py-1 rounded-full w-max">
    ⭐ {wallpepar.vote_average?.toFixed(1) || "N/A"} / 10
  </span>
  <span className="bg-[#ffffff22] px-3 py-1 rounded-full w-max">
    🔥 Popularity: {Math.floor(wallpepar.popularity) || "N/A"}
  </span>
</div>

      </Link>
    </div>
  );
}

export default Frontheading;
