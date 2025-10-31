import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch } from 'react-redux';
import { usersSlice } from '../redux/slices/user.slice';
import type { AppDispatch } from '../redux/store';
import type { User } from '../types/user.type';
import { StyledMenu } from './StyledMenu';
import { MouseEvent, useState } from 'react';

export default function MenuActions({ id }: { id?: number }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (type: User['type']) => {
    setAnchorEl(null);
    dispatch(usersSlice.actions.setIsModal(true));
    dispatch(usersSlice.actions.setSelectedUser(id));
    dispatch(usersSlice.actions.setType(type));
  };

  const handleDeleteModal = () => {
    dispatch(usersSlice.actions.setModalDelete(true));
    dispatch(usersSlice.actions.setSelectedUser(id));
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Actions
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        slotProps={{
          list: {
            'aria-labelledby': 'demo-customized-button',
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClick}
      >
        <MenuItem onClick={() => handleMenuClick('edit')} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteModal} disableRipple>
          <FileCopyIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
