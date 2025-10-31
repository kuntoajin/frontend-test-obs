import axios, { AxiosError } from 'axios';
import type { AppDispatch } from '../store';
import { usersSlice } from '../slices/user.slice';
import { DetailUser } from '../../types/user.type';

export const getUsersData = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(usersSlice.actions.setLoading(true));
    try {
      const { data } = await axios.get<DetailUser[]>('https://jsonplaceholder.typicode.com/users');

      dispatch(usersSlice.actions.setUser(data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error('Error fetching users data:', err.message);
      }
    } finally {
      dispatch(usersSlice.actions.setLoading(false));
    }
  };
};
