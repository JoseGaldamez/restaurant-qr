import { MenuPublic } from "@/components/MenuPublic/MenuPublic";

interface MenuPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function MenuPage({ params }: MenuPageProps) {
    const { id } = await params;

    if (!id) {
        return <div>Error: Menu ID is required.</div>;
    }

    return (
        <div>
            <MenuPublic menu_id={id} />
        </div>
    );
}