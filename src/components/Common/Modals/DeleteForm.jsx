import React from "react";
import "./DeleteForm.css";
import { useDispatch } from "react-redux";
import {
    deleteContacts,
    getContacts,
    editContacts,
} from "../../../Redux/Contacts/ContactsSlice";

const DeleteForm = ({
    setOpenModal,
    setDeleteModal,
    deleteId,
    setMessage,
    setMessageModal,
}) => {
    const dispatch = useDispatch();

    function close() {
        setOpenModal(false);
        setDeleteModal(false);
    }

    const formData = new FormData();
    formData.append("status", "deleted");

    function deleteContact({ id, updatedData }) {
        dispatch(editContacts({ id, updatedData }));
        // dispatch(deleteContacts(deleteId))
        dispatch(getContacts());
        setDeleteModal(false);
        setMessageModal(true);
        setMessage("delete");
    }

    return (
        <>
            <form action="" className="delete-form" id="deleteForm">
                <div className="delete-header">
                    <h2>DELETE CONTACT</h2>
                    <button
                        type="button"
                        onClick={() => {
                            close();
                        }}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <span>Are you sure you want to delete the contact</span>
                <div className="delete-btns">
                    <button
                        type="button"
                        className="delete-btn delete-modal delete"
                        onClick={() => {
                            deleteContact({
                                id: deleteId,
                                updatedData: formData,
                            });
                        }}
                    >
                        DELETE
                    </button>
                    <button
                        type="button"
                        className="delete-btn delete-modal cancel"
                        onClick={() => {
                            close();
                        }}
                    >
                        CANCEL
                    </button>
                </div>
            </form>
        </>
    );
};

export default DeleteForm;
