import type { User } from "../types/user.type";

export const InitialUserValue: User = {
    listUsers: [],
    selectedUserById: {
        name: '',
        username: '',
        email: '',
        phone: '',
        website: ''
    },
    isLoading: false,
    isModal: false,
    isDelete: false,
    type: ''
}