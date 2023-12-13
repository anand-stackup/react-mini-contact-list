import React from "react";
import "./Pagination.css";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const Pagination = ({ maxCount, setCurrentPage }) => {
    const contacts = useSelector((state) => state.contacts.contacts);

    return (
        <>
            <ReactPaginate
                onPageChange={(event) => setCurrentPage(event.selected + 1)}
                pageCount={Math.ceil(contacts.length / maxCount)}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                containerClassName={"pagination"}
                pageLinkClassName={"page-number"}
                previousLinkClassName={"page-number"}
                nextLinkClassName={"page-number"}
                activeLinkClassName={"active"}
            />
        </>
    );
};

export default Pagination;
