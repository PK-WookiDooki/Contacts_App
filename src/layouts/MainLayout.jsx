import React from "react";
import { Aside } from "../components";
import { Outlet } from "react-router-dom";
import { useGetAllContactsQuery } from "../features/apis/contactApi";
const MainLayout = () => {
    const { data } = useGetAllContactsQuery();

    const contacts = data?.data;

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
