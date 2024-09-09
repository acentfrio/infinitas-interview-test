"use client";
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

function List() {
  const { data } = useStudents();
  return (
    <div>
      <Table>
        <TableCaption>A list of Students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function Page() {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <List />
    // </Suspense>
  );
}
