import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  userData } from "../models/Types";

interface userState {
    user: userData | null,
    error: string | null,
    loading:boolean 
}

const initialState: userState = {
    user: JSON.parse(localStorage.getItem('user')!)  ,
    error:null,
    loading:false
};

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/api/users', {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            const json = await response.json();


            if (!response.ok) {
                return rejectWithValue(json.message)
            }
            localStorage.setItem('user', JSON.stringify(json));
            return json
        } catch (error) {
            return rejectWithValue('An unexpected error occurred')
        }
    }
);
export const registerUser = createAsyncThunk('auth/register', async (data: userData, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:3000/api/users/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        const json = await response.json()

        if (!response.ok) {
            return rejectWithValue(json.message)
        }

        localStorage.setItem('user', JSON.stringify(json));
        return json
    } catch (error) {
        return rejectWithValue('An unexpected error occurred')
    }

})


export const loginUser = createAsyncThunk('auth/login', async (data: userData, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:3000/api/users/login`, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        const json = await response.json()

        if (!response.ok) {
            return rejectWithValue(json.message)
        }

        localStorage.setItem('user', JSON.stringify(json));
        return json
    } catch (error) {
        return rejectWithValue('An unexpected error occurred')
    }

})

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:3000/api/users/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        const json = await response.json()

        if (!response.ok) {
            return rejectWithValue(json.message)
        }

        localStorage.removeItem('user')
        return json
    } catch (error) {
        return rejectWithValue('An unexpected error occurred')
    }

})



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addXp: (state, action: PayloadAction<number>) => {
            state.user!.experience_points += action.payload
        },
        removeXp: (state, action: PayloadAction<number>) => {
            state.user!.experience_points -= action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<userData>) => {
            state.user = action.payload;
            state.error = null
            state.loading = false
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.error = action.payload as string
            state.user = null,
            state.loading = false
            console.error('fetch user failed:', action.payload)
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<userData>) => {
            state.user = action.payload;
            state.error = null
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.payload as string
            console.error('Login failed:', action.payload);
        });
        builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<userData>) => {
            state.error = null
            state.user = action.payload;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.error = action.payload as string
            console.error('register failed:', action.payload);
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null
        });
       
    },
})

export const { addXp,removeXp } = authSlice.actions

export default authSlice.reducer