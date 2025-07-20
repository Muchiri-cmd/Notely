import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (data: {
      firstName?: string;
      lastName?: string;
      userName?: string;
      email?: string;
      avatar?: string;
    }) => {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.patch("/user/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res)
      return res;
    },
  });
};
