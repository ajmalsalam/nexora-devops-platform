import { TCreateFormSchema, TEditFormSchema } from "@/schemas/task-schema";
import { useAuthStore } from "@/stores/auth-store";
import { Task } from "@/types/types";
import api from "./client";

export const getTasksOnUserAPI = async () => {
  const token = useAuthStore.getState().token;

  const response = await api.get<Task[]>(
    "tasks/user",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getArchivedTasksOnUserAPI = async () => {
  const token = useAuthStore.getState().token;

  const response = await api.get<Task[]>(
    "tasks/user/archived",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const toggleArchiveAPI = async (data: {
  taskId: number;
  token: string | null;
}) => {
  const { token, taskId } = data;

  await api.patch(
    `tasks/${taskId}/toggle-archive`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const createTaskAPI = async (data: {
  formData: TCreateFormSchema;
  token: string | null;
}) => {
  const { formData, token } = data;

  await api.post("/tasks", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTaskAPI = async (data: {
  formData: TEditFormSchema;
  taskId: number;
  token: string | null;
}) => {
  const { formData, token, taskId } = data;

  await api.put(`/tasks/${taskId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTaskAPI = async (data: {
  taskId: number;
  token: string | null;
}) => {
  const { token, taskId } = data;

  await api.delete(`/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
