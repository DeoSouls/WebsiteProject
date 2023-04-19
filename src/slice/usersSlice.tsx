import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from './store';
import { $api } from "../axios-service";
import axios from "axios";

interface IUser {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    accessToken: String,
    isActivate: boolean,
}

export type SliceUser = {userData: IUser, isLoading: boolean, error: Object};

const initialState: SliceUser = { 
    userData: {} as IUser,
    error: {},
    isLoading: false
}

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        const api = $api();
        dispatch(usersSlice.actions.fetchUserActivateLoading());
        const response = await api.get<IUser>('http://localhost:5000/api/refresh');
        dispatch(usersSlice.actions.fetchUserActivateSucceed(response.data));
    } catch (e) {
        dispatch(usersSlice.actions.fetchUserActivateError('Не удалось получить данные о пользователе'));
    }
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUserActivateLoading(state) {
            state.isLoading = true;
        },
        fetchUserActivateSucceed(state, action: PayloadAction<IUser>) {
            state.isLoading = false;
            state.userData = action.payload;
        },
        fetchUserActivateError(state, action: PayloadAction<Object>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default usersSlice.reducer;