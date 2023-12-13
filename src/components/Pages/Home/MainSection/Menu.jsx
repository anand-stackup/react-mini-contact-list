import React from "react";

const Menu = ({
    data,
    id,
    open,
    setEditId,
    openEdit,
    setDeleteId,
    openDelete,
    openBlock,
    setBlockId,
}) => {
    const check = id === data._id;
    return (
        <>
            {open && check ? (
                <div className="menu" key={data._id}>
                    <button
                        type="button"
                        className="edit-btn"
                        onClick={() => {
                            setEditId(data._id);
                            openEdit();
                        }}
                    >
                        <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                        type="button"
                        className="delete-btn"
                        onClick={() => {
                            setDeleteId(data._id);
                            openDelete();
                        }}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                    <button
                        type="button"
                        className="delete-btn"
                        onClick={() => {
                            setBlockId(data._id);
                            openBlock();
                        }}
                    >
                        <i className="fa-solid fa-ban"></i>
                    </button>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default Menu;
