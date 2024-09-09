import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const getTeachers = () => {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/teachers`).then((res) =>
    res.json()
  );
};

export const useStudents = () => {
  return useSuspenseQuery<Student[]>({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/students`
      );
      const data = await response.json();

      return data;
    },
  });
};

export type Student = {
  id: string;
  name: string;
};
export const usePostStudents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-students"],
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
    mutationFn: async (data: Student) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/students`,
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
