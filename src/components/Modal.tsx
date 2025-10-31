import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { usersSlice } from '../redux/slices/user.slice';
import type { AppDispatch, RootState } from '../redux/store';
import { DetailUser } from '../types/user.type';
import { FormEvent, JSX, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

export default function FormEdit(): JSX.Element {
  const { isModal, selectedUserById, type, listUsers } = useSelector(
    (state: RootState) => state.users
  );
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formJson = Object.fromEntries((formData as any).entries()) as DetailUser;
    if (type === 'add') {
      const nextId = (listUsers?.[0]?.id ?? 0) + 1;
      dispatch(usersSlice.actions.setAddUser({ id: nextId, ...formJson }));
    } else if (type === 'edit') {
      dispatch(usersSlice.actions.setEditUser({ id: selectedUserById.id, ...formJson }));
    }

    dispatch(usersSlice.actions.setIsModal(false));
  };

  const handleCloseModal = () => {
    dispatch(usersSlice.actions.setIsModal(false));
  };

  const handleImageLoad = () => {
    setIsLoadingImage(false);
  };

  return (
    <>
      <Dialog
        open={isModal}
        onClose={() => dispatch(usersSlice.actions.setModalDelete(false))}
        id="modal-form"
      >
        <DialogContent>
          {type === 'edit' && isLoadingImage && (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '12px',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            </div>
          )}
          {type === 'edit' && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <img
                src={`https://picsum.photos/seed/${selectedUserById?.id}200/200`}
                onLoad={handleImageLoad}
                alt="image"
              />
            </div>
          )}
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={type === 'edit' ? selectedUserById?.name : ''}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="username"
              name="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={type === 'edit' ? selectedUserById?.username : ''}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              defaultValue={type === 'edit' ? selectedUserById?.email : ''}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="phone"
              name="phone"
              label="Phone"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={type === 'edit' ? selectedUserById?.phone : ''}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="website"
              name="website"
              label="Website"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={type === 'edit' ? selectedUserById?.website : ''}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            {type === 'add' ? 'Add' : 'Edit'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
