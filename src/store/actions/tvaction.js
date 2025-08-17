// src/store/actions/tvaction.js
import { loadtv, removetv } from "../reducers/tvSlice";
import axios from "../../Components/Utils/axios";

export const fetchTv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalId = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const credits = await axios.get(`/tv/${id}/credits`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);

    const alldata = {
      detail: detail.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      credits: credits.data,
      videos: videos.data.results.find(
        (m) => m.type === "Trailer" && m.site === "YouTube"
      ),
      watchProviders: watchProviders.data.results?.IN, // safe access for India providers
    };

    console.log("TV DATA:", alldata);
    dispatch(loadtv(alldata));
  } catch (error) {
    console.log(error + " error in fetchTv action");
  }
};
