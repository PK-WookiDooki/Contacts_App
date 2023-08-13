import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { ErrorPage, HomePage } from "./pages";
import { CContact, Contact, EContact } from "./components";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: "contacts/:contactId",
                    children: [
                        {
                            index: true,
                            element: <Contact />,
                        },
                        {
                            path: "edit",
                            element: <EContact />,
                        },
                    ],
                },
                {
                    path: "create_contact",
                    element: <CContact />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
