export { removeperson } from "../reducers/personSlice";
import { loadperson } from "../reducers/personSlice";
import axios from "../../Components/Utils/axios";

export const fetchPerson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalId = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const images = await axios.get(`/person/${id}/images`);

    const alldata = {
      detail: detail.data,
      externalId: externalId.data,
      combinedCredits: combinedCredits.data.cast, // shows all movies/series they acted in
      images: images.data.profiles,              // array of profile images
    };

    console.log("PERSON DATA:", alldata);
    dispatch(loadperson(alldata));
  } catch (error) {
    console.log(error + " error in fetchPerson action");
  }
};
