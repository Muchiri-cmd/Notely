import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: {
      userName?: string;
      email?: string;
      password: string;
    }) => {
      const res = await axiosInstance.post("/auth/login", data);
      return res;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      userName: string;
      email: string;
      password: string;
    }) => {
      const res = await axiosInstance.post("/auth/register", data);
      return res;
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationKey: ["update-password"],
    mutationFn: async (data: {
      current_password: string;
      password: string;
    }) => {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post("/auth/password", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    },
  });
};
