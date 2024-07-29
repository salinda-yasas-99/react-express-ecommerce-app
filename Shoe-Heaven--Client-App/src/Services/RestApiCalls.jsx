import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7000/api",
});

export default API;

export const getAllUsers = async () => {
  const authToken = localStorage.getItem("access_token");

  try {
    const authAxios = axios.create({
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    const response = await authAxios.get(
      "http://localhost:7000/api/users/getAllUsers/user"
    );
    //console.log(response);
    return response.data;
  } catch (err) {
    console.log({ err: `${err}` });
  }
};

export const getAllAdmins = async () => {
  const authToken = localStorage.getItem("access_token");
  try {
    const authAxios = axios.create({
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    const response = await authAxios.get(
      "http://localhost:7000/api/users/getAllUsers/admin"
    );
    //console.log(response);
    return response.data;
  } catch (err) {
    console.log({ err: `${err}` });
  }
};
