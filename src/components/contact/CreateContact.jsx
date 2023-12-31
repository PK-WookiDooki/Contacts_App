import { useEffect, useState } from "react";
import { Alert, Form, Input } from "antd";
import {
    useCreateNewContactMutation,
    useGetAllContactsQuery,
} from "../../features/apis/contactApi";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { Loader, Spinner } from "..";

const CreateContact = () => {
    const [form] = Form.useForm();
    const [canSave, setCanSave] = useState(false);
    const [contactId, setContactId] = useState(1);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formData = Form.useWatch([], form);
    const [createNewContact] = useCreateNewContactMutation();
    const {
        data: contactsList,
        isLoading,
        isFetching,
    } = useGetAllContactsQuery();
    const nav = useNavigate();

    useEffect(() => {
        form.validateFields({
            validateOnly: true,
        }).then(
            () => {
                setCanSave(true);
            },
            () => {
                setCanSave(false);
            }
        );

        if (contactsList?.length > 0) {
            const nextContactId =
                contactsList.length < 0
                    ? 1
                    : contactsList[contactsList.length - 1].id + 1;
            setContactId(nextContactId);
        }
    }, [formData, contactsList]);

    const handleSubmit = async (data) => {
        const contact = { id: contactId, ...data, favorite: false };
        setIsSubmitting(true);
        try {
            const { data } = await createNewContact(contact);
            data?.message ? setError(data?.message) : false;
            if (data?.success) {
                nav("/");
                setIsSubmitting(false);
            }
        } catch (err) {
            throw new Error(err);
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
        <section className="h-full flex w-full items-center">
            <section className="shadow-md rounded-md p-3 max-w-lg mx-auto bg-gray-100 items-center w-full">
                <h2 className="text-xl font-bold mb-5">Create New Contact</h2>

                {error ? (
                    <Alert
                        className="font-sans p-3 my-3"
                        description={error}
                        type="error"
                        closable
                    />
                ) : (
                    ""
                )}

                <Form onFinish={handleSubmit} form={form} layout="vertical">
                    <Form.Item
                        className=""
                        label={
                            <label className="font-sans font-medium text-[16px]">
                                Name
                            </label>
                        }
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Name is required!",
                            },
                        ]}
                    >
                        <Input className="p-2 font-sans text-[16px]" />
                    </Form.Item>
                    <Form.Item
                        label={
                            <label className="font-sans font-medium text-[16px]">
                                Phone No.
                            </label>
                        }
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Phone No. is required!",
                            },
                            {
                                pattern: new RegExp(/^[0-9]\d{8,10}$/),
                                message: "Please provide valid phone number!",
                            },
                        ]}
                    >
                        <Input
                            type="number"
                            className="p-2 font-sans text-[16px]"
                            maxLength={11}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <label className="font-sans font-medium text-[16px]">
                                Profile URL
                            </label>
                        }
                        name="avatar"
                    >
                        <Input className="p-2 font-sans text-[16px]" />
                    </Form.Item>
                    <Form.Item
                        label={
                            <label className="font-sans font-medium text-[16px]">
                                Notes
                            </label>
                        }
                        name="notes"
                    >
                        <TextArea
                            className=" resize-none p-2 font-sans text-[16px]"
                            rows={5}
                        />
                    </Form.Item>

                    <button
                        className={` font-sans font-medium ${
                            canSave
                                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md"
                                : "bg-gray-200 text-gray-400 "
                        } w-28 h-10 rounded-md duration-200 flex items-center justify-center text-[16px]
                         `}
                        disabled={!canSave || isSubmitting}
                    >
                        {isSubmitting ? <Spinner /> : "Submit"}
                    </button>
                </Form>
            </section>
        </section>
    );
};

export default CreateContact;
