import React from "react";
import { useDispatch } from "react-redux";
import {
    editContacts,
    getContacts,
} from "../../../Redux/Contacts/ContactsSlice";

const BlockForm = ({ setOpenModal, setBlockModal, blockId }) => {
    const dispatch = useDispatch();

    function close() {
        setOpenModal(false);
        setBlockModal(false);
    }

    const formData = new FormData();
    formData.append("status", "blocked");

    function blockContact({ id, updatedData }) {
        dispatch(editContacts({ id, updatedData }));
        dispatch(getContacts());
        close();
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
                <span>Are you sure you want to block the contact</span>
                <div className="delete-btns">
                    <button
                        type="button"
                        className="delete-btn delete-modal delete"
                        onClick={() => {
                            blockContact({
                                id: blockId,
                                updatedData: formData,
                            });
                        }}
                    >
                        BLOCK
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

export default BlockForm;
