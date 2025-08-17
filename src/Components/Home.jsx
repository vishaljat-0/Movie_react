import React, { useEffect, useState } from "react";
import Sidenav from "./Templates/Sidenav";
import Topnav from "./Templates/Topnav";
import Frontheading from "./Templates/Frontheading";
import axios from "../Components/Utils/axios";
import Horizontalcards from "./Templates/Horizontalcards";
import Dropdowen from "./Templates/Dropdowen";
import Loader from "../images/Loader";
function Home() {
  const [wallpepar, setwallpepar] = useState(null);
  const [Trending, setTrending] = useState([]);
  const [Category, setcategory] = useState("all");

  let getheaderwallpepar = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);

      const randomeone =
        data.results[Math.floor(Math.random() * data.results.length)];
      console.log("data in header wallpepar", randomeone);
      setwallpepar(randomeone);
    } catch (error) {
      console.log("error in header wallpepar", error);
    }
  };
  let gettrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${Category}/day`);

      setTrending(data.results);
    } catch (error) {
      console.log("error in header wallpepar", error);
    }
  };
  console.log(Trending, "trending data");

  useEffect(() => {
    gettrending();
    !getheaderwallpepar();
  }, []);

  useEffect(() => {
    gettrending();
  }, [Category]);

  return wallpepar && Trending ? (
    ((document.title = "VMAP   Homepage"),
    (
      <>
        <Sidenav />
        <div className="w-[80%] h-full overflow-auto  overflow-x-hidden bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40]">
          <Topnav />
          <Frontheading wallpepar={wallpepar} />
          <div className="flex items-center px-4 justify-between mb-4">
            <h2 className="text-white text-2xl font-bold mb-4">
              🔥 Trending Now
            </h2>
            <Dropdowen
              title={"Filter"}
              option={["all", "movie", "tv"]}
              fun={(e) => setcategory(e.target.value)}
            />
          </div>
          <Horizontalcards data={Trending} />
        </div>
      </>
    ))
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  );
}

export default Home;
