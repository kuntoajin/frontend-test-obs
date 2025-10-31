import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './redux/store';
import { getUsersData } from './redux/thunk/user.thunk';
import TableUsers from './components/Table';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { listUsers } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getUsersData());
  }, []);

  return <TableUsers data={listUsers} />;
}

export default App;
