import { MenuDashboard } from "@/components/Dashboard/MenuDashboard";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div>
            <MenuDashboard />
            {children}

        </div>
    );
}
