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
            text: "Add Teacher",
            slug: "add",
          },
          {
            text: "View Teachers",
            slug: "list",
          },
        ]}
      />
      {children}
    </div>
  );
}
