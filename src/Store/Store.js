import { configureStore } from "@reduxjs/toolkit";
import ContactsSlice from "../Redux/Contacts/ContactsSlice";

export const store = configureStore({
    reducer: {
        contacts: ContactsSlice
    }
})