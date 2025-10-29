import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { usersSlice } from '../redux/slices/user.slice';

export default function ModalDelete() {
  const [open, setOpen] = React.useState(false);
    const { isDelete } = useSelector(state => state.users);
    const dispatch = useDispatch<AppDispatch>();
    console.log(isDelete)
    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteUser = () => {
        dispatch(usersSlice.actions.setDeleteUser());
        dispatch(usersSlice.actions.setModalDelete(false));
    }

  return (
    <React.Fragment>
      <Dialog
        open={isDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(usersSlice.actions.setModalDelete(false))}>Cancel</Button>
          <Button onClick={handleDeleteUser} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
