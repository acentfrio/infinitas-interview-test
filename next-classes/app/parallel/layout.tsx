export default function RootLayout({
  children,
  teachers,
  students,
}: Readonly<{
  children: React.ReactNode;
  teachers: React.ReactNode;
  students: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {teachers}
        {students}
      </div>
    </div>
  );
}
