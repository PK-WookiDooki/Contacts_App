import { Aside, Loader } from "../components";
import { Outlet } from "react-router-dom";
import { useGetAllContactsQuery } from "../features/apis/contactApi";
const MainLayout = () => {
    const { data, isLoading, isFetching } = useGetAllContactsQuery();

    const contacts = data?.data;

    if (isLoading || isFetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <main className="flex min-h-screen">
            <Aside contacts={contacts} />

            <div className="w-full p-3">
                <Outlet />
            </div>
        </main>
    );
};

export default MainLayout;
