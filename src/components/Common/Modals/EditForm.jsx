import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EditForm.css";
import {
    editContacts,
    getContacts,
} from "../../../Redux/Contacts/ContactsSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditForm = ({
    setOpenModal,
    setEditModal,
    editId,
    setMessage,
    setMessageModal,
    tab,
    currentPage,
    maxCount
}) => {
    const contacts = useSelector((state) => state.contacts.contacts.data);
    const [currentContact] = contacts.filter((data) => data._id === editId);

    const dispatch = useDispatch();

    const [data, setData] = useState(currentContact);

    // console.log(data.avatar);

    function inputData(e) {
        if (e.target.type === "file") {
            setData({ ...data, avatar: e.target.files[0] });
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    }

    if (data.avatar instanceof Blob && data.avatar !== null) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(data.avatar);
        fileReader.addEventListener("load", function () {
            const imgBox = document.getElementById("imgBox");
            if (imgBox) {
                imgBox.innerHTML = `<img src="${this.result}" alt="" />`;
            }
        });
    }

    const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

    const formik = useFormik({
        initialValues: {
            data,
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string()
                .min(2, "Too Short")
                .max(50, "Too Long")
                .required("Firstname required"),
            lastName: Yup.string().required("Lastname required"),
            email: Yup.string()
                .email("Invalid email")
                .required("Email required"),
            phone: Yup.string()
                .required("Phone required")
                .matches(phoneRegExp, "Phone number is not valid")
                .min(10, "too short")
                .max(10, "too long"),
        }),
        onSubmit: (values) => {
            console.log("Submitting form");
            appendData(values);
        },
    });

    const formData = new FormData();

    function appendData(values) {
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("phone", values.phone);

        if (data.avatar !== null) {
            formData.append("avatar", data.avatar);
        }

        editContact({ id: data._id, updatedData: formData });
    }

    function close() {
        setEditModal(false);
        setOpenModal(false);
    }

    function editContact({ id, updatedData }) {
        console.log('edit');
        dispatch(editContacts({ id, updatedData }));
        dispatch(getContacts({
            currentPage: currentPage,
            maxCount: maxCount,
            tab: tab,
        }));
        setEditModal(false);
        setMessageModal(true);
        setMessage("edit");
    }

    return (
        <>
            <form
                action=""
                className="edit-form"
                id="editForm"
                onSubmit={formik.handleSubmit}
            >
                <div className="edit-header">
                    <h2>EDIT CONTACT</h2>
                    <button
                        type="button"
                        onClick={() => {
                            close();
                        }}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="img-prev">
                    <div className="img-prev-box" id="imgBox">
                        <img
                            src={`http://localhost:4000/${data.avatar}`}
                            alt=""
                        />
                    </div>
                    <input
                        type="file"
                        onChange={inputData}
                        name="avatar"
                        id="avatar"
                    />
                </div>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formik.values.firstName}
                    placeholder="Enter Firstname"
                    onChange={(e) => {
                        inputData(e);
                        formik.handleChange(e);
                    }}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <span className="error">{formik.errors.firstName}</span>
                ) : null}
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formik.values.lastName}
                    placeholder="Enter Lastname"
                    onChange={(e) => {
                        inputData(e);
                        formik.handleChange(e);
                    }}
                />
                 {formik.touched.lastName && formik.errors.lastName ? (
                    <span className="error">{formik.errors.lastName}</span>
                ) : null}
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    placeholder="Enter email"
                    onChange={(e) => {
                        inputData(e);
                        formik.handleChange(e);
                    }}
                />
                {formik.touched.email && formik.errors.email ? (
                    <span className="error">{formik.errors.email}</span>
                ) : null}
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formik.values.phone}
                    placeholder="Enter phone"
                    onChange={(e) => {
                        inputData(e);
                        formik.handleChange(e);
                    }}
                />
                {formik.touched.phone && formik.errors.phone ? (
                    <span className="error">{formik.errors.phone}</span>
                ) : null}
                <button
                    type="submit"
                    className="edit-btn edit-modal"
                >
                    UPDATE
                </button>
            </form>
        </>
    );
};

export default EditForm;
