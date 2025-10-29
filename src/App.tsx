import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from './redux/store'
import { getUsersData } from './redux/thunk/user.thunk'
import TableUsers from './components/Table'

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: any) => state.users);

  useEffect(() => {
    dispatch(getUsersData());  
  }, []);

  return (
    <TableUsers data={data?.listUsers} />
  )
}

export default App
