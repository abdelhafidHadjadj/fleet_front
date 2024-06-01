import axios from "axios";

export const load = async ({ params }) => {
  console.log(params);
  const fetchDriver = async (id) => {
    const res = await axios.get(`http://127.0.0.1:8080/api/driver/get/${id}`);
    const data = res.data.data;
    return data;
  };

  return {
    driverData: await fetchDriver(params.id),
  };
};
