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

export const useSoftDeleteNote = () => {
  return useMutation({
    mutationKey: ["soft-delete-note"],
    mutationFn: async ({
      id,
      note,
    }: {
      id: string;
      note: {
        title: string;
        synopsis: string;
        content: string;
      };
    }) => {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.patch(
        `/entries/soft-delete/${id}`,
        note,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res;
    },
  });
};

export const useRestoreNote = () => {
  return useMutation({
    mutationKey: ["restore-note"],
    mutationFn: async ({
      id,
      note,
    }: {
      id: string;
      note: {
        title: string;
        synopsis: string;
        content: string;
      };
    }) => {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.patch(`/entries/restore/${id}`, note, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    },
  });
};

export const useGetSummary = () => {
  return useMutation({
    mutationKey: ["get-summary"],
    mutationFn: async ({ content }: { content: string }) => {
      const token = localStorage.getItem("token");

      const res = await axiosInstance.post(
        `/entries/summarize`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
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
        isPinned: boolean;
        isBookMarked: boolean;
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

export const useAskAI = () => {
  return useMutation({
    mutationFn: async ({
      content,
      question,
    }: {
      content: string;
      question: string;
    }) => {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/entries/ask",
        { content, question },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
    },
  });
};

export const useSuggestNote = () => {
  return useMutation({
    mutationFn: async ({
      title,
      synopsis,
      content,
    }: {
      title: string;
      synopsis: string;
      content: string;
    }) => {
      const token = localStorage.getItem("token");

      const res = await axiosInstance.post(
        "/entries/suggest",
        { title, synopsis, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    },
  });
};
