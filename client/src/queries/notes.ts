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

export const useGetNote = (id: string) => {
  return useQuery({
    queryKey: ["fetch-note", id],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      const res = await axiosInstance.get(`/entries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    enabled: !!id,
  });
};
