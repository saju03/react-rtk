
import type { IUser } from "../../../interface";

export const updateUser = (state: IUser, action: { payload: Partial<IUser> }): IUser => {
    return {
        ...state,
        ...action.payload,
    };
};

export const logoutUser = (_state: IUser): IUser => {
    return {
        userName: "",
        status: false,
    };
};

export const loginUser = (_state: IUser, action: { payload: IUser }): IUser => {
    return {
        userName: action.payload.userName,
        status: action.payload.status,
    };
};

export const registerUser = (_state: IUser, action: { payload: IUser }): IUser => {
    return {
        userName: action.payload.userName,
        status: action.payload.status,
    };
};
