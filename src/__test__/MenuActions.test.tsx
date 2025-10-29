const mockSetIsModal = jest.fn(payload => ({ type: 'users/setIsModal', payload }));
const mockSetSelectedUser = jest.fn(payload => ({ type: 'users/setSelectedUser', payload }));
const mockSetType = jest.fn(payload => ({ type: 'users/setType', payload }));
const mockSetModalDelete = jest.fn(payload => ({ type: 'users/setModalDelete', payload }));

// gunakan jest.isolateModules untuk memastikan mock di-load dulu
jest.isolateModules(() => {
  jest.mock('../redux/slices/user.slice', () => ({
    __esModule: true, // penting untuk named import
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

// setelah mock siap, baru import komponen
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import MenuActions from '../components/MenuActions';
import '@testing-library/jest-dom';

// --- B. MOCKING useDispatch ---
// Kita butuh mock useDispatch untuk menghitung berapa kali dispatch dipanggil
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('MenuActions Component', () => {
  // Gunakan ID tetap untuk verifikasi payload
  const TEST_USER_ID = 1;

  beforeEach(() => {
    // Membersihkan riwayat panggilan mock sebelum setiap tes
    jest.clearAllMocks();
  });

  // =================================================================
  // SKENARIO 1: INTERAKSI MENU (STATE LOKAL & DOM)
  // =================================================================
  test('Mengklik "Edit" memanggil actions yang benar', async () => {
    render(<MenuActions id={1} />);
    const button = screen.getByRole('button', { name: /actions/i });
    await userEvent.click(button);
    const editItem = screen.getByRole('menuitem', { name: /edit/i });
    await userEvent.click(editItem);

    // 🔍 Sekarang kita cek dispatch-nya, bukan mock action-nya langsung
    expect(mockDispatch).toHaveBeenCalledTimes(3);

    // Dan pastikan dispatch dipanggil dengan hasil dari action
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/setIsModal', payload: true });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/setSelectedUser', payload: 1 });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/setType', payload: 'edit' });
  });

  // =================================================================
  // SKENARIO 3: MENU ITEM "DELETE" (VERIFIKASI ACTIONS)
  // =================================================================
  test('Mengklik "Delete" harus dispatch actions setModalDelete dan setSelectedUser dengan payload yang benar', async () => {
    // 1. Render komponen
    render(<MenuActions id={TEST_USER_ID} />);

    // 2. Buka Menu
    const actionButton = screen.getByRole('button', { name: /actions/i });
    await userEvent.click(actionButton);

    // 3. Interaksi (RTL): Cari menu item "Delete" dan klik
    const deleteMenuItem = screen.getByRole('menuitem', { name: /delete/i });
    await userEvent.click(deleteMenuItem);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/setModalDelete', payload: true });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'users/setSelectedUser', payload: 1 });
  });
});
