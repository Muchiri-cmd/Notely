import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

export const useCreateNote = () => {
  return useMutation({
    mutationKey: ["create-note"],
    mutationFn: async (data: {
      title: string;
      synopsis: string;
      content: string;
    }) => {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post("/entries", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    },
  });
};

export const useDeleteNote = () => {
  return useMutation({
    mutationKey: ["delete-note"],
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.delete(`/entries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    },
  });
};

export const useUpdateNote = () => {
  return useMutation({
    mutationKey: ["update-note"],
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: {
        title: string;
        synopsis: string;
        content: string;
      };
    }) => {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.patch(`/entries/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    },
  });
};
