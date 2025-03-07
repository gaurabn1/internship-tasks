import { BASE_URL } from "@/constants";

const categories = async () => {
  const res = await fetch(`${BASE_URL}/categories/`);
  const data = await res.json();
  return data
};

export default categories;
