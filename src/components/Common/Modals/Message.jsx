import React from "react";
import "./Message.css";

const Message = ({ message, setMessageModal, setOpenModal }) => {
    return (
        <>
            <div action="" className="message-div" id="message">
                <button
                    type="button"
                    onClick={() => {
                        setMessageModal(false);
                        setOpenModal(false);
                    }}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="message-header">
                    {message === "add" ? (
                        <h2>Employee Added Successfully</h2>
                    ) : (
                        ""
                    )}
                    {message === "edit" ? (
                        <h2>Employee Edited Successfully</h2>
                    ) : (
                        ""
                    )}
                    {message === "delete" ? (
                        <h2>Employee Deleted Successfully</h2>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
};

export default Message;
