import { TabGroup } from "@/components/ui/tab-group";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      <TabGroup
        path="/parallel"
        items={[
          {
            text: "Home",
          },
          {
            text: "Add Student",
            slug: "add",
          },
          {
            text: "View Students",
            slug: "list",
          },
        ]}
      />
      {children}
    </div>
  );
}
