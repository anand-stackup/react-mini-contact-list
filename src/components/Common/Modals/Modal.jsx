import React, { useState } from "react";
import "./Modal.css";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";
import Message from "./Message";
import BlockForm from "./BlockForm";

const AddModal = ({
    setOpenModal,
    addModal,
    setAddModal,
    editModal,
    setEditModal,
    editId,
    deleteModal,
    setDeleteModal,
    deleteId,
    setBlockModal,
    blockModal,
    blockId,
    tab,
    currentPage,
    maxCount
}) => {
    const [message, setMessage] = useState("");
    const [messageModal, setMessageModal] = useState(false);

    return (
        <div className="overlay">
            {addModal ? (
                <AddForm
                    setOpenModal={setOpenModal}
                    setAddModal={setAddModal}
                    setMessage={setMessage}
                    setMessageModal={setMessageModal}
                    tab={tab}
                    currentPage={currentPage}
                    maxCount={maxCount}
                />
            ) : (
                ""
            )}
            {editModal ? (
                <EditForm
                    setOpenModal={setOpenModal}
                    setEditModal={setEditModal}
                    editId={editId}
                    setMessage={setMessage}
                    setMessageModal={setMessageModal}
                    tab={tab}
                    currentPage={currentPage}
                    maxCount={maxCount}
                />
            ) : (
                ""
            )}
            {deleteModal ? (
                <DeleteForm
                    setOpenModal={setOpenModal}
                    setDeleteModal={setDeleteModal}
                    deleteId={deleteId}
                    setMessage={setMessage}
                    setMessageModal={setMessageModal}
                />
            ) : (
                ""
            )}
            {blockModal ? (
                <BlockForm
                    setOpenModal={setOpenModal}
                    setBlockModal={setBlockModal}
                    blockModal={blockModal}
                    blockId={blockId}
                />
            ) : (
                ""
            )}
            {messageModal ? (
                <Message
                    message={message}
                    setMessageModal={setMessageModal}
                    setOpenModal={setOpenModal}
                />
            ) : (
                ""
            )}
        </div>
    );
};

export default AddModal;
