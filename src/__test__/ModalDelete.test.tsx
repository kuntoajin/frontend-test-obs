import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ModalDelete from '../components/ModalDelete';
import { usersSlice } from '../redux/slices/user.slice';
import type { RootState } from '../redux/store';

const mockUseSelector = jest.fn();
const mockUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: RootState) => mockUseSelector(selector),
  useDispatch: () => mockUseDispatch,
}));

describe('ModalDelete Component', () => {
  beforeEach(() => {
    mockUseDispatch.mockClear();
  });

  test('Modal harus ditampilkan ketika isDelete adalah TRUE', () => {
    mockUseSelector.mockReturnValue({ isDelete: true });

    render(<ModalDelete />);

    const dialogTitle = screen.getByText(/Delete user/i);

    expect(dialogTitle).toBeInTheDocument();
  });

  test('Modal harus disembunyikan ketika isDelete adalah FALSE', () => {
    mockUseSelector.mockReturnValue({ isDelete: false });

    render(<ModalDelete />);

    const dialogTitle = screen.queryByText(/Delete user/i);

    expect(dialogTitle).not.toBeInTheDocument();
  });

  test('Mengklik tombol "Cancel" harus memanggil action setModalDelete(false)', async () => {
    mockUseSelector.mockReturnValue({ isDelete: true });

    render(<ModalDelete />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    await userEvent.click(cancelButton);

    expect(mockUseDispatch).toHaveBeenCalledTimes(1);

    expect(mockUseDispatch).toHaveBeenCalledWith(usersSlice.actions.setModalDelete(false));
  });

  test('Mengklik tombol "Delete" harus memanggil 2 actions Redux', async () => {
    mockUseSelector.mockReturnValue({ isDelete: true });

    render(<ModalDelete />);

    const deleteButton = screen.getByRole('button', { name: /delete$/i });

    await userEvent.click(deleteButton);

    expect(mockUseDispatch).toHaveBeenCalledTimes(2);

    expect(mockUseDispatch).toHaveBeenNthCalledWith(1, usersSlice.actions.setDeleteUser());

    expect(mockUseDispatch).toHaveBeenNthCalledWith(2, usersSlice.actions.setModalDelete(false));
  });
});
