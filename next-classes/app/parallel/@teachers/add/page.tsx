"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePostTeacher } from "@/providers/api/teachers";
export default function Page() {
  const { mutate } = usePostTeacher();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.currentTarget;
    const teacherName = target.teacher.value;
    const id = crypto.randomUUID();
    mutate({
      name: teacherName,
      id,
      students: [],
    });

    target.reset();
  };
  return (
    <div>
      <h2>Add Teacher</h2>

      <form onSubmit={handleSubmit}>
        <Input type="text" id="teacher" name="teacher" placeholder="Name" />
        <Button variant="outline" type="submit">
          Add Teacher
        </Button>
      </form>
    </div>
  );
}
