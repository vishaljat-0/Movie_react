import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaLinkedin, FaGithub } from "react-icons/fa";
import vishal from "../../images/Vishal.jpg"; // Developer's image

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-[#1F1E24] flex flex-col">
      {/* Header Section */}
      <div className="mt-5 px-10 w-full flex items-center">
        <i
          onClick={() => navigate(-1)}
          className="text-white bg-[#6556CD] p-3 rounded-full shadow-md hover:bg-[#5248b2] mr-3 transition-all duration-300 transform hover:scale-110 hover:rotate-[-10deg] hover:shadow-2xl cursor-pointer"
        >
          <FaArrowLeft className="text-sm" />
        </i>
        <h1 className="text-2xl font-semibold text-zinc-300">
          About This Project
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col items-center justify-center flex-1 px-5 bg-gradient-to-b from-[#1F1E24] to-[#161616]">
        <div className="bg-[#2A2A2A] rounded-2xl shadow-lg p-8 max-w-2xl text-center border border-zinc-700">
          <h2 className="text-3xl font-bold text-[#FFDD57] mt-2 mb-4">
            Welcome to SCSDB 🎬
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            <span className="font-semibold text-[#FFDD57]">SCSDB</span> is your
            ultimate destination for discovering{" "}
            <span className="text-white">Movies</span> and{" "}
            <span className="text-white">TV Shows</span>.  
            Browse through{" "}
            <span className="font-semibold">trending, popular, and top-rated</span>{" "}
            titles, explore recommendations, watch trailers, and access complete
            details — all in one place.  
          </p>
          <p className="text-zinc-300 mt-3 leading-relaxed">
            Our goal is to deliver a{" "}
            <span className="text-[#FFDD57]">seamless and modern UI</span> for
            your entertainment exploration. With smooth navigation and real-time
            data from TMDB API, SCSDB ensures you{" "}
            <span className="font-semibold">never miss what’s hot & trending!</span>
          </p>
        </div>

        {/* Developer Section */}
        <div className="mt-10 flex flex-col items-center">
          <img
            src={vishal}
            alt="Developer"
            className="w-28 h-28 rounded-full border-4 border-[#FFDD57] shadow-lg object-cover"
          />
          <h3 className="text-xl font-semibold text-[#FFDD57] mt-3">
            Vishal Jat
          </h3>
          <p className="text-zinc-300">Full Stack Developer | UI Designer</p>
          <div className="flex gap-5 mt-4">
            <a
              href="https://www.linkedin.com/in/Vishal9685"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#FFDD57] hover:text-[#5248b2] transition-all duration-300"
            >
              <FaLinkedin className="mr-2" /> LinkedIn
            </a>
            <a
              href="https://github.com/Vishal9685"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#FFDD57] hover:text-[#5248b2] transition-all duration-300"
            >
              <FaGithub className="mr-2" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
