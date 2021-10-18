import axios from "axios";
import { get } from "mongoose";

export async function getSuggestedProfiles(_id, following) {
  // call a limited number of users
  const result = await axios({
    method: get,
    url: "/api/",
  });
  //return and filter based on your own following ids
}
