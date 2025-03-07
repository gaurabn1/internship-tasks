import fetchData from "@/features/actions/fetch-data";

const users = async () => {
  return fetchData("users")
};

export default users;
