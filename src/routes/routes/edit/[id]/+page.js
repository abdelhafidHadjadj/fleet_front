import axios from "axios";

export const load = async ({ params }) => {
  console.log(params);
  const fetchRoute = async (id) => {
    const res = await axios.get(`http://127.0.0.1:8080/api/route/get/${id}`);
    const data = res.data.data;
    return data;
  };

  return {
    routeData: await fetchRoute(params.id),
  };
};
