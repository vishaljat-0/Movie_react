import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/Sidebarpages/Trending";
import Popular from "./Components/Sidebarpages/Popular";
import Movies from "./Components/Sidebarpages/Movies";
import Tv from "./Components/Sidebarpages/Tv";
import People from "./Components/Sidebarpages/People";
import Moviedetails from "./Components/Sidebarpages/Moviedetails";
import Persondetails from "./Components/Sidebarpages/Persondetails";
import Tvdetails from "./Components/Sidebarpages/Tvdetails";
import About from "./Components/Sidebarpages/About";
import Contact from "./Components/Sidebarpages/Contact";

function App() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40]  flex ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/Popular" element={<Popular />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/movie/details/:id" element={<Moviedetails />} />

        <Route path="/TVShows" element={<Tv />} />

        <Route path="/tv/details/:id" element={<Tvdetails />} />

        <Route path="/People" element={<People />} />

        <Route path="/person/details/:id" element={<Persondetails />} />
        <Route    path="/About" element={<About/>}   />
                <Route    path="/Contact" element={<Contact/>}   />

      </Routes>
    </div>
  );
}

export default App;
