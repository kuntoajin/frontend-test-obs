const mockSetIsModal = jest.fn(payload => ({ type: 'users/setIsModal', payload }));
const mockSetSelectedUser = jest.fn(payload => ({ type: 'users/setSelectedUser', payload }));
const mockSetType = jest.fn(payload => ({ type: 'users/setType', payload }));
const mockSetModalDelete = jest.fn(payload => ({ type: 'users/setModalDelete', payload }));

jest.isolateModules(() => {
  jest.mock('../redux/slices/user.slice', () => ({
    __esModule: true,
    usersSlice: {
      actions: {
        setIsModal: mockSetIsModal,
        setSelectedUser: mockSetSelectedUser,
        setType: mockSetType,
        setModalDelete: mockSetModalDelete,
      },
    },
    setIsModal: mockSetIsModal,
    setSelectedUser: mockSetSelectedUser,
    setType: mockSetType,
    setModalDelete: mockSetModalDelete,
  }));
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import MenuActions from '../components/MenuActions';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('MenuActions Component', () => {
  const TEST_USER_ID = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Clicking "Edit" invokes the correct action', async () => {
    render(<MenuActions id={1} />);
    const button = screen.getByRole('button', { name: /actions/i });
    await userEvent.click(button);
    const editItem = screen.getByRole('menuitem', { name: /edit/i });
    await userEvent.click(editItem);

    expect(mockDispatch).toHaveBeenCalledTimes(3);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/setIsModal', payload: true });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/setSelectedUser', payload: 1 });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/setType', payload: 'edit' });
  });

  test('Clicking "Delete" should dispatch the actions setModalDelete and setSelectedUser with the correct payload', async () => {
    render(<MenuActions id={TEST_USER_ID} />);

    const actionButton = screen.getByRole('button', { name: /actions/i });
    await userEvent.click(actionButton);

    const deleteMenuItem = screen.getByRole('menuitem', { name: /delete/i });
    await userEvent.click(deleteMenuItem);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/setModalDelete', payload: true });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/setSelectedUser', payload: 1 });
  });
});
