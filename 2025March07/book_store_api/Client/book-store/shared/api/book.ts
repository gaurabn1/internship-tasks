import { BASE_URL } from "@/constants";

export const books = async () => {
  const res = await fetch(`${BASE_URL}/books/`);
  const data = await res.json();
  return data
};

