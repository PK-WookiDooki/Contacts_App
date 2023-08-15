import { Form, useNavigate, useParams } from "react-router-dom";
import { CButton, Loader } from "..";
import { BsStar, BsStarFill } from "react-icons/bs";
import {
    useDeleteContactMutation,
    useGetContactByIdQuery,
    useUpdateContactMutation,
} from "../../features/apis/contactApi";

const Contact = () => {
    const { contactId } = useParams();
    const { data, isLoading, isFetching } = useGetContactByIdQuery(contactId);
    const [updateContact] = useUpdateContactMutation();
    const [deleteContact] = useDeleteContactMutation();
    const nav = useNavigate();

    const contact = data?.data;

    const handleDelete = async () => {
        try {
            const { data } = await deleteContact(contact?._id);
            if (data) {
                nav("/");
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const handleFavorite = async () => {
        const updatedFav = contact?.favorite ? false : true;

        const updatedContact = { ...contact, favorite: updatedFav };

        try {
            const { data } = await updateContact({
                id: contact?._id,
                contact: updatedContact,
            });
            if (data?.success) {
                nav(`/contacts/${contact?._id}`);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    if (isLoading || isFetching) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <section className="h-full flex items-center justify-center md:items-start md:justify-normal">
            <section className="flex flex-col lg:flex-row text-center lg:text-left justify-center md:justify-normal items-center gap-3 p-3 rounded-md w-full md:bg-black/10">
                <div className="min-w-[208px] max-w-[208px] h-52 rounded-md overflow-hidden">
                    <img
                        src={
                            contact?.avatar
                                ? contact?.avatar
                                : "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
                        }
                        alt={contact?.name}
                        className=" object-cover object-center h-full w-full"
                    />
                </div>
                <div className=" flex flex-col gap-3">
                    <div className="flex items-center gap-2 justify-center lg:justify-normal">
                        <h2 className="font-bold text-3xl capitalize">
                            {contact?.name ? contact?.name : "Unknown"}
                        </h2>
                        <button
                            onClick={handleFavorite}
                            className=" text-yellow-400 text-xl"
                        >
                            {contact?.favorite ? <BsStarFill /> : <BsStar />}
                        </button>
                    </div>

                    {contact?.phone ? (
                        <a
                            className=" md:pointer-events-none "
                            href={`tel:${contact?.phone}`}
                        >
                            {" "}
                            {contact?.phone}{" "}
                        </a>
                    ) : (
                        ""
                    )}

                    {contact?.notes ? <p> {contact?.notes} </p> : ""}

                    <div className="flex gap-3 justify-center lg:justify-normal">
                        <Form action="edit">
                            <CButton
                                title={"edit"}
                                path={`/contacts/${contact?._id}/edit`}
                            />
                        </Form>
                        <Form
                            method="post"
                            action="destroy"
                            onSubmit={(event) => {
                                if (
                                    !confirm(
                                        "Please confirm you want to delete this record."
                                    )
                                ) {
                                    event.preventDefault();
                                }
                            }}
                        >
                            <CButton title={"delete"} event={handleDelete} />
                        </Form>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Contact;
