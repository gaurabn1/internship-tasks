import { BASE_URL } from "@/constants";

const carts = async () => {
  const res = await fetch(`${BASE_URL}/carts/`);
  const data = await res.json();
  return data
};

export default carts;
