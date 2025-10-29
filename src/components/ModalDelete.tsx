import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { usersSlice } from '../redux/slices/user.slice';
import type { AppDispatch, RootState } from '../redux/store';

export default function ModalDelete() {
    const { isDelete } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();

    const handleDeleteUser = () => {
        dispatch(usersSlice.actions.setDeleteUser());
        dispatch(usersSlice.actions.setModalDelete(false));
    }

  return (
    <Dialog
      open={isDelete}
      onClose={() => dispatch(usersSlice.actions.setModalDelete(false))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Delete user
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this user?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(usersSlice.actions.setModalDelete(false))}>Cancel</Button>
        <Button onClick={handleDeleteUser} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
