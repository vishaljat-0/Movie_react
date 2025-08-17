import React, { useState, useEffect } from "react";
import axios from "../Utils/axios";
import { Link } from "react-router-dom";
import Noimage from "../../../src/images/Noimage.png";

function Topnav() {
  const [query, setquery] = useState("");
  const [data, setdata] = useState([]);

  const getsearch = async () => {
    try {
      if (query.trim() === "") {
        setdata([]);
        return;
      }
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setdata(data.results || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      getsearch();
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    
      <div className="relative w-full md:w-3/4 lg:w-1/2 p-[1%] mx-auto">
        {/* Search bar */}
        <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 shadow-lg w-full">
          <i className="ri-search-line text-gray-400 text-xl" />
          <input
            type="text"
            value={query}
            onChange={(e) => setquery(e.target.value)}
            placeholder="Search "
            className="bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 text-base ml-4 flex-grow  md:block"
          />
          <i
            onClick={() => setquery("")}
            className={`ri-close-line text-gray-400 text-2xl cursor-pointer ml-2 ${
              query ? "visible" : "invisible"
            }`}
          ></i>
        </div>

        {/* Dropdown - absolutely positioned to avoid pushing layout */}
        {query && data.length > 0 && (
          <div className="absolute left-0 top-full mt-2 w-full bg-[#6556CD] max-h-[50vh] overflow-auto rounded-lg shadow-xl z-20">
            {data.map((s, i) => (
              <Link
                key={i}
                to={`/${s.media_type || "movie"}/details/${s.id}`}
                className="flex z-1 items-center p-4 bg-gradient-to-r from-[#484848] to-[#6556CD] hover:bg-[#555] border-b border-gray-600"
              >
                <img
                  src={
                    s.poster_path || s.profile_path || s.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${
                          s.poster_path || s.profile_path || s.backdrop_path
                        }`
                      : Noimage
                  }
                  alt=""
                  className="w-12 h-12 rounded-full object-cover mr-4 shadow-lg"
                />
                <span className="text-white font-semibold text-lg">
                  {s.title || s.name || s.original_title || s.original_name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
   
  );
}

export default Topnav;
