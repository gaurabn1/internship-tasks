import { BASE_URL } from "@/constants";

const fetchData = async (fetch_data: string) => {
  const res = await fetch(`${BASE_URL}/${fetch_data}/`);
  const data = await res.json();
  return data
};

export default fetchData;
