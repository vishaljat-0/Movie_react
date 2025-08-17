import React, { useEffect, useState } from "react";
import Topnav from "../Templates/Topnav";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../Templates/Dropdowen";
import axios from "../Utils/axios";
import Card from "../Templates/Card";
import Loader from "../../images/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
function Tv() {
 const navigate = useNavigate();
  const [Category, setCategory] = useState("top_rated");
//   const [duration, setduration] = useState("day");
  const [tv, seTtv] = useState([]);
  const [Pages, setPages] = useState(1);
   document.title = "VMAP   Popular " + Category.toLocaleLowerCase() ;

  let getTv = async () => {
    try {
      const { data } = await axios.get(`tv/${Category}?page=${Pages}`);
      // setTrending(data.results);   

      seTtv((prev) => [...prev, ...data.results]);
      setPages((prev) => prev + 1);
    } catch (error) {
      console.log("error in header wallpepar", error);
    }
  };
  console.log(tv, "trending data");

  useEffect(() => {
    seTtv([])
    setPages(1);
    document.title = "VMAP   Trending";
  getTv();
  }, [Category,]);
  return tv.length > 0 ? (
    <div  id="scrollableDiv" className="w-screen py-[1%] h-screen overflow-hidden overflow-y-auto bg-gradient-to-br from-[#1a1a25] to-[#000000] ">
      <div className="w-full flex items-center justify-between gap-4 flex-wrap px-4 py-2">
        {/* Left: Back button and title */}
        <div className="flex items-center gap-3">
          <i
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center bg-red-500 rounded-full ri-arrow-left-line text-xl text-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#6556cd]"
          ></i>

          <h1 className="text-2xl text-zinc-400 font-semibold">Popular</h1>
        </div>

        {/* Center: Topnav search */}
        <div className="flex-grow max-w-[800px]">
          <Topnav />
        </div>

        {/* Right: Dropdown filter */}
        <div className="  md:block">
          <Dropdown
            title="Category"
            option={[ "now_playing", "top_rated" , "airing_today", "on_the_air" , "popular"]}
            fun={(e) => setCategory(e.target.value)}
          />
        </div>
        {/* <div className="  md:block">
          <Dropdown
            title="Duration"
            option={["week", "day"]}
            fun={(e) => setduration(e.target.value)}
          />
        </div> */}
      </div>

      <div>
        <h1 className=" px-5 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6556CD] to-[#8c7ae6] tracking-wide capitalize">
          {Category}
        </h1>
        <InfiniteScroll
          dataLength={tv.length}
          hasMore={true}
          next={getTv}
          loader={<h1 className="bg-red-400"> Loading</h1>}
            scrollableTarget="scrollableDiv"
        >
          <Card data={tv} title="tv"  />

        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default Tv