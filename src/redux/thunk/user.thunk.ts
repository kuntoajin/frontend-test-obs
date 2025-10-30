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
        // dispatch(customerActions.setError(err.response?.data?.ErrorMessage));
        // dispatch(loadingActions.setLoading(false));
      }
    } finally {
      dispatch(usersSlice.actions.setLoading(false));
    }
  };
};
