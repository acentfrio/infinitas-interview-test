"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStudents } from "@/providers/api/students";
import {
  useAssignStudentToTeacher,
  useTeachers,
} from "@/providers/api/teachers";
import { useState } from "react";

export default function Page() {
  const { mutate: assignStudentToTeacher } = useAssignStudentToTeacher();
  const [studentEditingId, setUserEditingId] = useState<string | null>(null);

  const handleAssignStudent = () => {
    if (teacherEditingId && newAssignedStudentId) {
      console.log({ studentEditingId, newAssignedStudentId, teacherEditingId });
      assignStudentToTeacher({
        teacherId: teacherEditingId,
        studentId: newAssignedStudentId,
      });
    }

    setTeacherEditingId(null);
    setNewAssignedStudentId(null);
  };
  const [teacherEditingId, setTeacherEditingId] = useState<string | null>(null);
  const [newAssignedStudentId, setNewAssignedStudentId] = useState<
    string | null
  >(null);

  const { data: teachers } = useTeachers();
  const { data: students } = useStudents();
  return (
    <div>
      <Table>
        <TableCaption>A list of teachers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Name</TableHead>
            <TableHead>Students</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell className="w-[50px]">{teacher.name}</TableCell>
              <TableCell>
                <ul>
                  {teacher.students.map((s) => (
                    <li key={s.id}>
                      {students.map((s1) => (s.id === s1.id ? s1.name : ""))}
                    </li>
                  ))}
                </ul>
                {teacher.id === teacherEditingId ? (
                  <>
                    <Select
                      value={newAssignedStudentId || ""}
                      onValueChange={(value) => setNewAssignedStudentId(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Assign" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Students</SelectLabel>
                          {students.map((student) => (
                            <SelectItem
                              key={student.id}
                              value={student.id}
                              disabled={
                                !!teacher.students.find(
                                  (s) => s.id === student.id
                                )
                              }
                            >
                              {student.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Button onClick={handleAssignStudent}>Assign</Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setTeacherEditingId(teacher.id)}
                  >
                    Assign student
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
