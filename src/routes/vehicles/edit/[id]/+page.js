import axios from "axios";

export const load = async ({ params }) => {
  console.log(params);
  const fetchVehicle = async (id) => {
    const res = await axios.get(`http://127.0.0.1:8080/api/vehicle/get/${id}`);
    const data = res.data.data;
    return data;
  };

  return {
    vehicleDetails: await fetchVehicle(params.id),
  };
};
