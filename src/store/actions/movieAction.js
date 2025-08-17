export { removemovie } from "../reducers/Movieslice";
import {loadmovie} from "../reducers/Movieslice";
import axios from "../../Components/Utils/axios";

export const fetchMovie = (id) => async (dispatch, getstate) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalId = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const credits = await axios.get(`/movie/${id}/credits`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchProviders = await axios.get(`/movie/${id}/watch/providers`);
    const alldata = {
      detail: detail.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      credits: credits.data,
      videos: videos.data.results.find(m => m.type==="Trailer" || m.site==="YouTube"),
      watchProviders: watchProviders.data.results.IN,
    };
    console.log(alldata);
     dispatch(loadmovie(alldata));
  } catch (error) {
    console.log(error + "error in fetchMovie action");
  }
};
