import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    contacts: [],
    status: "idle",
    error: null,
};


// getContacts action 
export const getContacts = createAsyncThunk(
    "contacts/getContacts",
    async ({ currentPage, maxCount, tab }) => {
        console.log(tab);
        const response = await axios.get(`http://localhost:4000/contacts/?page=${currentPage}&limit=${maxCount}&tab=${tab}`);
        return response.data;
    }
);

// searchContacts action 
export const searchContacts = createAsyncThunk(
    "contacts/searchContacts",
    async (search) => {
        // console.log(search);
        const response = await axios.get(`http://localhost:4000/contacts/search/?q=${search}`);
        return response.data;
    }
);

// addContacts action 
export const addContacts = createAsyncThunk(
    "contacts/addContacts",
    async (newData) => {
        const response = await axios.post("http://localhost:4000/contacts", newData)
        return response.data;
    }
);

// deleteContacts action 
export const deleteContacts = createAsyncThunk(
    "contacts/deleteContacts",
    async (id) => {
        const response = await axios.delete(`http://localhost:4000/contacts/${id}`)
        return response.data;
    }
);

// editContacts action 
export const editContacts = createAsyncThunk(
    "contacts/editContacts",
    async ({ id, updatedData }) => {
        // console.log(updatedData);
        const response = await axios.put(`http://localhost:4000/contacts/${id}`, updatedData)
        return response.data;
    }
);

export const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get reducer 
            .addCase(getContacts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getContacts.fulfilled, (state, action) => {
                state.status = "idle";
                state.contacts = action.payload;
            })
            .addCase(getContacts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // search reducer 
            .addCase(searchContacts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(searchContacts.fulfilled, (state, action) => {
                state.status = "idle";
                state.contacts = action.payload;
            })
            .addCase(searchContacts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // add reducer 
            .addCase(addContacts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addContacts.fulfilled, (state) => {
                state.status = "idle";
            })
            .addCase(addContacts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // delete reducer 
            .addCase(deleteContacts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteContacts.fulfilled, (state) => {
                state.status = "idle";
            })
            .addCase(deleteContacts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // edit reducer 
            .addCase(editContacts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(editContacts.fulfilled, (state) => {
                state.status = "idle";
            })
            .addCase(editContacts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    },
});

export default contactSlice.reducer;
