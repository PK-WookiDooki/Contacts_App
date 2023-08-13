import React from "react";
import { Link } from "react-router-dom";

const CustomButton = ({ title, path, event }) => {
    return (
        <Link
            onClick={event ? event : null}
            to={path ? path : null}
            type="submit"
            className={`outline-none border border-gray-100/50 ${
                title === "new" || title === "edit"
                    ? "text-blue-600"
                    : title === "delete"
                    ? "text-red-600"
                    : "text-black"
            } bg-white rounded-md font-medium py-2 px-4 ${
                title === "new" || title === "edit"
                    ? "hover:bg-blue-600"
                    : title === "delete"
                    ? "hover:bg-red-600"
                    : "hover:bg-black"
            } hover:text-white duration-200 shadow-md capitalize`}
        >
            {" "}
            {title}{" "}
        </Link>
    );
};

export default CustomButton;
