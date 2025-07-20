import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      const res = await axiosInstance.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
  });
};
