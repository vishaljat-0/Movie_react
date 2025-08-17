import axios from "axios";
 const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGY3ZWVjNjM0YjcxYTJhYjVmOTE1N2YyNWVlYmUzYiIsIm5iZiI6MTczMDEwODIzOS45OTQsInN1YiI6IjY3MWY1YjRmMjY4NWNiNjU2M2MxNDZmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kHheWIWup_3KljPhLRTZOt6MhE4dnGzPvIq6V3SiLHQ",
  },
});

export default instance;