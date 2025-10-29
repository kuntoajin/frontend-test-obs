import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ModalDelete from '../components/ModalDelete';
import { usersSlice } from '../redux/slices/user.slice';
import type { RootState } from '../redux/store';

// --- MOCKING HOOKS (Sama seperti di atas, ulangi untuk konteks) ---
// Note: Dalam proyek nyata, Anda akan memiliki setup global
const mockUseSelector = jest.fn();
const mockUseDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: (selector: RootState) => mockUseSelector(selector),
  useDispatch: () => mockUseDispatch,
}));
// --- END MOCKING HOOKS ---

describe('ModalDelete Component', () => {
  // Reset mock useDispatch sebelum setiap tes untuk memastikan tes bersih
  beforeEach(() => {
    mockUseDispatch.mockClear();
  });

  // =================================================================
  // SKENARIO 1: RENDERING (Visibility)
  // =================================================================
  test('Modal harus ditampilkan ketika isDelete adalah TRUE', () => {
    // 1. Setup: Atur mockUseSelector untuk mengembalikan isDelete: true
    mockUseSelector.mockReturnValue({ isDelete: true });

    // 2. Render komponen
    render(<ModalDelete />);

    // 3. Assertion (RTL): Cari teks yang hanya ada saat modal terlihat
    const dialogTitle = screen.getByText(/Delete user/i);

    // Jest + RTL Assertion: Memastikan elemen ada di DOM
    expect(dialogTitle).toBeInTheDocument();
  });

  test('Modal harus disembunyikan ketika isDelete adalah FALSE', () => {
    // 1. Setup: Atur mockUseSelector untuk mengembalikan isDelete: false
    mockUseSelector.mockReturnValue({ isDelete: false });

    // 2. Render komponen
    render(<ModalDelete />);

    // 3. Assertion (RTL): Cari teks menggunakan queryByText (untuk elemen yang mungkin tidak ada)
    const dialogTitle = screen.queryByText(/Delete user/i);

    // Jest + RTL Assertion: Memastikan elemen TIDAK ada di DOM
    expect(dialogTitle).not.toBeInTheDocument();
  });

  //   // =================================================================
  //   // SKENARIO 2: USER INTERACTION (Perilaku Tombol)
  //   // =================================================================
  test('Mengklik tombol "Cancel" harus memanggil action setModalDelete(false)', async () => {
    // 1. Setup: Modal harus terlihat untuk interaksi
    mockUseSelector.mockReturnValue({ isDelete: true });

    // 2. Render komponen
    render(<ModalDelete />);

    // 3. Interaksi (RTL): Cari tombol "Cancel" berdasarkan teksnya
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    // 4. Simulasi User Event
    await userEvent.click(cancelButton);

    // 5. Assertion (Jest Mocking): Memastikan dispatch dipanggil 1x
    expect(mockUseDispatch).toHaveBeenCalledTimes(1);

    // Memastikan action yang dipanggil adalah usersSlice.actions.setModalDelete(false)
    expect(mockUseDispatch).toHaveBeenCalledWith(usersSlice.actions.setModalDelete(false));
  });

  test('Mengklik tombol "Delete" harus memanggil 2 actions Redux', async () => {
    // 1. Setup: Modal harus terlihat untuk interaksi
    mockUseSelector.mockReturnValue({ isDelete: true });

    // 2. Render komponen
    render(<ModalDelete />);

    // 3. Interaksi (RTL): Cari tombol "Delete"
    // Catatan: Gunakan name: /delete/i karena ada 'Delete user' di title.
    const deleteButton = screen.getByRole('button', { name: /delete$/i });

    // 4. Simulasi User Event
    await userEvent.click(deleteButton);

    // 5. Assertion (Jest Mocking): Memastikan dispatch dipanggil 2x
    // (1x untuk setDeleteUser, 1x untuk setModalDelete)
    expect(mockUseDispatch).toHaveBeenCalledTimes(2);

    // Memastikan action PERTAMA adalah setDeleteUser
    expect(mockUseDispatch).toHaveBeenNthCalledWith(1, usersSlice.actions.setDeleteUser());

    // Memastikan action KEDUA adalah setModalDelete(false)
    expect(mockUseDispatch).toHaveBeenNthCalledWith(2, usersSlice.actions.setModalDelete(false));
  });
});
