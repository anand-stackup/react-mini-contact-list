import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContacts } from "../../../../Redux/Contacts/ContactsSlice";
import Menu from "./Menu";

const List = ({
    setEditId,
    setOpenModal,
    setEditModal,
    setDeleteModal,
    setDeleteId,
    setBlockModal,
    setBlockId,
    currentPage,
    maxCount,
    tab,
    setIsLoading,
}) => {
    const contacts = useSelector((state) => state.contacts.contacts);
    const status = useSelector((state) => state.contacts.status);
    const [id, setId] = useState("");
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true)

        if (status === "idle") {
            dispatch(
                getContacts({
                    currentPage: currentPage,
                    maxCount: maxCount,
                    tab: tab,
                })
            );
        }

        setTimeout(() => {
            setIsLoading(false)
          }, "1000");

    }, [dispatch, currentPage, tab]);

    function openEdit() {
        setEditModal(true);
        setOpenModal(true);
    }

    function openDelete() {
        setDeleteModal(true);
        setOpenModal(true);
    }

    function openBlock() {
        setOpenModal(true);
        setBlockModal(true);
    }

    return (
        <>
            {contacts.data &&
                contacts.data.map((data, index) => (
                    <tr key={data._id}>
                        <td>{index + 1}</td>
                        <td className="img-td">
                            {data.avatar ? (
                                <div className="image">
                                    <img
                                        src={`http://localhost:4000/${data.avatar}`}
                                        alt=""
                                    />
                                </div>
                            ) : (
                                <span className="initials">
                                    {data.firstName.slice(0, 1).toUpperCase()}
                                    {data.lastName.slice(0, 1).toUpperCase()}
                                </span>
                            )}
                        </td>
                        <td>
                            <span>
                                {data.firstName} {data.lastName}
                            </span>
                        </td>
                        <td>{data.email}</td>
                        <td>{data.phone}</td>
                        <td className="btn-td">
                            <button
                                className="menu-btn"
                                onClick={() => {
                                    setId(data._id);
                                    setOpen(!open);
                                }}
                            >
                                <i className="fa-solid fa-ellipsis"></i>
                            </button>
                            <Menu
                                data={data}
                                id={id}
                                open={open}
                                setEditId={setEditId}
                                openEdit={openEdit}
                                setDeleteId={setDeleteId}
                                openDelete={openDelete}
                                openBlock={openBlock}
                                setBlockId={setBlockId}
                            />
                        </td>
                    </tr>
                ))}
        </>
    );
};

export default List;
