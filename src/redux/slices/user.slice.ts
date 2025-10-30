import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { InitialUserValue } from '../../utils/user.value';
import type { DetailUser } from '../../types/user.type';

export const usersSlice = createSlice({
  name: 'users',
  initialState: InitialUserValue,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setUser(state, action: PayloadAction<DetailUser[]>) {
      state.listUsers = action.payload.reverse();
    },
    setSelectedUser(state, action: PayloadAction<number | undefined>) {
      state.selectedUserById =
        state.listUsers.find(item => item.id === action.payload) || ({} as DetailUser);
    },
    setIsModal(state, action: PayloadAction<boolean>) {
      state.isModal = action.payload;
    },
    setAddUser(state, action: PayloadAction<DetailUser>) {
      console.log(action.payload);
      state.listUsers = [action.payload, ...state.listUsers];
    },
    setEditUser(state, action: PayloadAction<DetailUser>) {
      const getUserId = state.listUsers.findIndex(item => item.id === action.payload.id);
      if (getUserId < 0) return;

      try {
        (Object.keys(action.payload) as (keyof DetailUser)[]).forEach((key: keyof DetailUser) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (state.listUsers[getUserId] as any)[key] = action.payload[key];
        });
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    setType(state, action: PayloadAction<'edit' | 'delete' | 'add' | ''>) {
      state.type = action.payload;
    },
    setModalDelete: (state, action: PayloadAction<boolean>) => {
      state.isDelete = action.payload;
    },
    setDeleteUser(state) {
      state.listUsers = state.listUsers.filter(item => item.email !== state.selectedUserById.email);
    },
    // setError(state, action: PayloadAction<string | null>) {

    // },
  },
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;
