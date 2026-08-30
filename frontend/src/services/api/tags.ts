import { Tag } from "@/types/types";
import api from "./client";

export const getTagsAPI = async () => {
  const response = await api.get<Tag[]>("/tags");

  return response.data;
};
