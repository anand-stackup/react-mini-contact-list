import "./MainSection.css";
import List from "./List";
import Modal from "../../../Common/Modals/Modal";
import { useState } from "react";

const MainSection = ({ tab, currentPage, maxCount, setIsLoading }) => {
    const [openModal, setOpenModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editId, setEditId] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [blockModal, setBlockModal] = useState(false);
    const [blockId, setBlockId] = useState("");

    console.log(editId);
    return (
        <div className="main-section">
            <table className="table">
                <thead>
                    <tr>
                        <th>Sl.no.</th>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>
                            <button
                                type="button"
                                className="add-btn"
                                onClick={() => {
                                    setOpenModal(true);
                                    setAddModal(true);
                                }}
                            >
                                Add
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <List
                        setEditId={setEditId}
                        setOpenModal={setOpenModal}
                        setEditModal={setEditModal}
                        setDeleteModal={setDeleteModal}
                        setDeleteId={setDeleteId}
                        setBlockModal={setBlockModal}
                        setBlockId={setBlockId}
                        tab={tab}
                        currentPage={currentPage}
                        maxCount={maxCount}
                        setIsLoading={setIsLoading}
                    />
                </tbody>
            </table>

            {openModal ? (
                <Modal
                    setOpenModal={setOpenModal}
                    addModal={addModal}
                    setAddModal={setAddModal}
                    editModal={editModal}
                    setEditModal={setEditModal}
                    editId={editId}
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                    deleteId={deleteId}
                    blockModal={blockModal}
                    setBlockModal={setBlockModal}
                    blockId={blockId}
                    tab={tab}
                    currentPage={currentPage}
                    maxCount={maxCount}
                />
            ) : (
                ""
            )}
        </div>
    );
};

export default MainSection;
