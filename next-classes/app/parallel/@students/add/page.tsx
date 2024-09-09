"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePostStudents } from "@/providers/api/students";
export default function Page() {
  const { mutate } = usePostStudents();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.currentTarget;
    const name = target.student.value;
    const id = crypto.randomUUID();
    mutate({
      name,
      id,
    });

    target.reset();
  };
  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <Input type="text" id="student" name="student" placeholder="Name" />
        <Button variant="outline" type="submit">
          Add Student
        </Button>
      </form>
    </div>
  );
}
