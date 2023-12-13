import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    addContacts,
    getContacts,
} from "../../../Redux/Contacts/ContactsSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone";

const AddForm = ({
    setOpenModal,
    setAddModal,
    setMessage,
    setMessageModal,
    tab,
    currentPage,
    maxCount
}) => {
    
    const dispatch = useDispatch();

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        status: "active",
        avatar: null
    })

    function inputData(e) {
        if (e.target.type === 'file') {
            setData({ ...data, avatar: e.target.files[0] });
        }
    }

    if (data.avatar) {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(data.avatar)
        fileReader.addEventListener('load', function () {
            document.getElementById('imgBox').innerHTML = `<img src="${this.result}" alt="" />`
        })
    }

    const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/


    const formik = useFormik({
        initialValues: {
            data
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
                .matches(phoneRegExp, 'Phone number is not valid')
                .min(10, "too short")
                .max(10, "too long"),
        }),
        onSubmit: (values) => {
            appendData(values);
        },
    });

    const formData = new FormData();


    function appendData(values) {
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("status", values.status);
        formData.append("avatar", data.avatar);

        dispatch(addContacts(formData));
        addContact();
    }

    function clearForm() {
        document.getElementById("addForm").reset();
    }

    function close() {
        setOpenModal(false);
        setAddModal(false);
    }

    function addContact() {
        dispatch(getContacts({
            currentPage: currentPage,
            maxCount: maxCount,
            tab: tab,
        }));
        clearForm();
        setAddModal(false);
        setMessageModal(true);
        setMessage("add");
    }

    return (
        <>
            <form
                action=""
                className="add-form"
                id="addForm"
                onSubmit={formik.handleSubmit}
            >
                <div className="add-header">
                    <h2>ADD CONTACT</h2>
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
                    <div className="img-prev-box" id="imgBox"></div>
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        onChange={inputData}
                    />
                </div>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Enter Firstname"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <span className="error">{formik.errors.firstName}</span>
                ) : null}
                <input
                    type="text"
                    name="lastName"
                    placeholder="Enter Lastname"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <span className="error">{formik.errors.lastName}</span>
                ) : null}
                <input
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <span className="error">{formik.errors.email}</span>
                ) : null}
                <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone ? (
                    <span className="error">{formik.errors.phone}</span>
                ) : null}
                <button type="submit" className="add-btn add-modal">
                    ADD
                </button>
            </form>
        </>
    );
};

export default AddForm;
