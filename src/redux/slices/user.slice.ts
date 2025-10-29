import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { InitialUserValue } from '../../utils/user.value';
import type { DetailUser, User } from '../../types/user.type';

export const updateUser = createAsyncThunk<User, Partial<User> & { id: string | number }, { rejectValue: string }>(
    'user/updateUser',
    async (payload, { rejectWithValue }) => {
        try {
            const { id, ...body } = payload;
            const res = await fetch(`/api/users/${encodeURIComponent(String(id))}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                const text = await res.text();
                return rejectWithValue(text || res.statusText);
            }
            const data = (await res.json()) as User;
            return data;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export const usersSlice = createSlice({
    name: 'users',
    initialState: InitialUserValue,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setUser(state, action: PayloadAction<DetailUser[]>) {
            state.listUsers = action.payload;
        },
        setSelectedUser(state, action: PayloadAction<number>) {
            state.selectedUserById = state.listUsers.find((item) => item.id === action.payload) || ({} as DetailUser);
        },
        setIsModal(state, action: PayloadAction<boolean>) {
            state.isModal = action.payload;
        },
        setAddUser(state, action: PayloadAction<DetailUser>) {
            state.listUsers = [action.payload, ...state.listUsers]
        },
        setEditUser(state, action: PayloadAction<DetailUser>) {
            const getUserId = state.listUsers.findIndex((item) => item.email === action.payload.email);
            (Object.keys(action.payload) as (keyof DetailUser)[]).forEach((key) => {
                (state.listUsers[getUserId] as any)[key] = action.payload[key];
            })
        },
        setType(state, action: PayloadAction<'edit' | 'delete' | 'add'>) {
            state.type = action.payload;
        },
        setModalDelete: (state, action: PayloadAction<boolean>) => {
            state.isDelete = action.payload;
        },
        setDeleteUser(state) {
            state.listUsers = state.listUsers.filter((item) => item.email !== state.selectedUserById.email);
        }
        // setError(state, action: PayloadAction<string | null>) {

        // },
    }
});

export const { setUser, setError } = usersSlice.actions;

export default usersSlice.reducer;
