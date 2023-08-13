import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <section className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col gap-5 text-center">
                <h2 className="text-5xl font-bold">Oops!</h2>
                <p className="text-lg">
                    {" "}
                    Sorry, an unexpected error has occurred.{" "}
                </p>
                <p className=" italic text-gray-400">
                    {error.statusText || error.message}
                </p>
                <Link
                    to={"/"}
                    className="px-5 py-2 rounded-md bg-gray-600 text-white w-fit mx-auto hover:bg-gray-500 duration-300"
                >
                    Go Back
                </Link>{" "}
            </div>
        </section>
    );
};

export default ErrorPage;
