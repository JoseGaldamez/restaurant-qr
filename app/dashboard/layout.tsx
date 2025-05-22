import { MenuDashboard } from "@/components/Dashboard/MenuDashboard";
import { getLoggedUserInfo } from "@/server/users";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    const user = await getLoggedUserInfo(data?.user?.id || '');

    return (
        <div>
            <MenuDashboard user={user.data} />
            {children}

        </div>
    );
}
