import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

export const useGetNotes = () => {
  return useQuery({
    queryKey: ["fetch-notes"],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      const res = await axiosInstance.get("/entries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data)
      return res.data;
    },
  });
};
