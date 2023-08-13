import React from "react";
import { Link } from "react-router-dom";

const CCard = ({ contact }) => {
    return (
        <Link
            to={`/contacts/${contact?._id}`}
            className=" w-44 h-44 rounded-md overflow-hidden border border-gray-600 block relative group"
        >
            <img
                src={
                    contact?.avatar
                        ? contact?.avatar
                        : "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
                }
                alt={contact?.name}
                className="w-full h-full object-cover object-center"
            />

            <div className="absolute bottom-0 left-0 w-full text-center bg-black/70 text-white transform translate-y-20 group-hover:translate-y-0 duration-300 py-2">
                <h2 className="font-bold"> {contact?.name} </h2>
                <p className="text-sm text-gray-300"> {contact?.phone} </p>
            </div>
        </Link>
    );
};

export default CCard;
