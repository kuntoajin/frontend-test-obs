import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import type { DetailUser } from '../types/user.type';
import MenuActions from './MenuActions';
import FormEdit from './Modal';
import { Box, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { usersSlice } from '../redux/slices/user.slice';
import ModalDelete from './ModalDelete';
import { AppDispatch, RootState } from '../redux/store';
import { ChangeEvent, JSX, useState } from 'react';
import { COLUMNS } from '../constants/Column';

export default function TableUsers({ data }: { data: DetailUser[] | null }): JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { isLoading } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddModal = () => {
    dispatch(usersSlice.actions.setIsModal(true));
    dispatch(usersSlice.actions.setType('add'));
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '20px',
        }}
      >
        <Paper
          sx={{
            width: {
              xs: '100%',
              md: 1200,
            },
            overflow: 'hidden',
          }}
        >
          <Button variant="contained" sx={{ mt: 2, ml: 2 }} onClick={handleAddModal}>
            Add User
          </Button>
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {COLUMNS.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row: DetailUser) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {COLUMNS.map(column => {
                          const value = (row as DetailUser)[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'action' ? <MenuActions id={row.id} /> : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <FormEdit />
      <ModalDelete />
    </>
  );
}
