import React, { useEffect, useState } from "react";
import "./Header.css";
import { useDispatch } from "react-redux";
import { searchContacts } from "../../../Redux/Contacts/ContactsSlice";

const Header = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    function handleInput(e) {
        setSearch(e.target.value);
    }

    useEffect(() => {
        if(search !== '') {
            dispatch(searchContacts(search));
        }
    }, [search, dispatch]);

    return (
        <div className="header">
            <h1>CONTACTS</h1>
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Search contacts"
                onChange={handleInput}
            />
        </div>
    );
};

export default Header;
