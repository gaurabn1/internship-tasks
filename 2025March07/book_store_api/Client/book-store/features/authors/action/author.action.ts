import { BASE_URL } from "@/constants";

const authors = async () => {
  const res = await fetch(`${BASE_URL}/authors/`);
  const data = await res.json();
  return data
};

export default authors;
