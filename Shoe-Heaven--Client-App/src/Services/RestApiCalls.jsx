import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7000/api",
});

export default API;

export const getAllUsers = async () => {
  try {
    const response = await API.get("/users/getAllUsers");
    //console.log(response);
    return response.data;
  } catch (err) {
    console.log({ err: `${err}` });
  }
};
