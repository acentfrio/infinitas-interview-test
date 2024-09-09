import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Student } from "./students";

export const getTeachers = () => {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/teachers`).then((res) =>
    res.json()
  );
};

export const useTeachers = () => {
  return useSuspenseQuery<Teacher[]>({
    queryKey: ["teachers"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/teachers`
      );
      const data = await response.json();

      return data;
    },
  });
};

export type Teacher = {
  id: string;
  name: string;
  students: Student[];
};
export const usePostTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-teacher"],
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["teachers"] }),
    mutationFn: async (data: Teacher) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/teachers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      return res;
    },
  });
};
