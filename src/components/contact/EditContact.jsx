import { useEffect, useRef, useState } from "react";
import { Form, Input } from "antd";
import {
    useGetContactByIdQuery,
    useUpdateContactMutation,
} from "../../features/apis/contactApi";
import { useNavigate, useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { Loader, Spinner } from "..";

const EditContact = () => {
    const { contactId } = useParams();
    const [form] = Form.useForm();
    const [canSave, setCanSave] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formData = Form.useWatch([], form);
    const [updateContact] = useUpdateContactMutation();
    const { data, isLoading, isFetching } = useGetContactByIdQuery(contactId);

    const currentContact = data?.data;
    const nav = useNavigate();
    const formRef = useRef();

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
    }, [formData]);

    const handleSubmit = async (data) => {
        const contact = { ...data, favorite: currentContact.favorite };
        setIsSubmitting(true);
        try {
            const { data } = await updateContact({ id: contactId, contact });
            if (data?.success) {
                setIsSubmitting(false);
                nav(`/contacts/${contactId}`);
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
            <section className=" shadow-md rounded-md p-3 max-w-lg mx-auto w-full h-fit bg-gray-100">
                <h2 className="text-xl font-bold mb-5">Update Contact</h2>

                <Form
                    initialValues={currentContact}
                    onFinish={handleSubmit}
                    form={form}
                    layout="vertical"
                    ref={formRef}
                >
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
                        <Input className="p-2 font-sans text-[16px]" />
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
                            className="p-2 font-sans text-[16px]"
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

export default EditContact;
