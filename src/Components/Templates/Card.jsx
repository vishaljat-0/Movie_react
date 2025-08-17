import React from "react";
import { Link } from "react-router-dom";
import Noimage from "../../../src/images/Noimage.png";

function Card({ data, title }) {
  console.log(title);
  console.log(data);
  

  return (
    <div className="w-full overflow-x-hidden p-[2%] bg-[#101018] ">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map((c, index) => (
          <Link
              to={`/${c.media_type
 || title}/details/${c.id}`}
            key={index}
            className="bg-[#1e1e2f] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <img
              src={
                c.backdrop_path || c.poster_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${
                      c.backdrop_path ||
                      c.poster_path ||
                      c.profile_path
                    }`
                  : Noimage
              }
              alt={c.title || c.name}
              className="w-full h-64 object-cover"               
            />
            <div className="p-3">
              <h2 className="text-white text-sm font-medium truncate">
                {c.title || c.name}
              </h2>
              <div className="flex items-center mt-1">
                <i className="ri-star-fill text-yellow-400 mr-1"></i>
                <span className="text-zinc-300 text-sm">
                  {c.vote_average?.toFixed(1) ||
                    c.popularity?.toFixed(1) ||
                    "N/A"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Card;
