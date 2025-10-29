const mockSetAddUser = jest.fn();
const mockSetEditUser = jest.fn();
const mockSetIsModal = jest.fn();
const mockSetModalDelete = jest.fn();

jest.isolateModules(() => {
  jest.mock('../redux/slices/user.slice', () => ({
    __esModule: true, // penting untuk named import
    usersSlice: {
      actions: {
        setAddUser: mockSetAddUser,
        setEditUser: mockSetEditUser,
        setIsModal: mockSetIsModal,
        setModalDelete: mockSetModalDelete,
      },
    },
    setAddUser: mockSetAddUser,
    setEditUser: mockSetEditUser,
    setIsModal: mockSetIsModal,
    setModalDelete: mockSetModalDelete,
  }));
});

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// ------------------------------------------------------------------
// 1. IMPORT KOMPONEN YANG DIUJI
import FormEdit from '../components/Modal';

// ------------------------------------------------------------------
// 2. DATA MOCK (TIDAK BERUBAH)
// ...
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// 3. MOCKING REDUX ACTIONS & HOOKS
// ------------------------------------------------------------------

// --- A. DEKLARASI MOCK ACTIONS (HARUS DI ATAS jest.mock) ---
// Note: Menggunakan const/let di sini aman jika diletakkan sebelum jest.mock

// --- C. MOCKING useDispatch dan useSelector ---
const mockUseSelector = jest.fn();
const mockUseDispatch = jest.fn();

// Mock ini juga aman karena merujuk const yang sudah dideklarasikan
jest.mock('react-redux', () => ({
  useSelector: selector => mockUseSelector(selector),
  useDispatch: () => mockUseDispatch,
}));

// ------------------------------------------------------------------
// 4. TEST SUITE
// ------------------------------------------------------------------

describe('FormEdit Component', () => {
  beforeEach(() => {
    // Membersihkan riwayat panggilan mock sebelum setiap tes
    jest.clearAllMocks();
  });

  // Fungsi helper untuk mengatur state yang akan dikembalikan oleh useSelector
  const setupSelector = (isModal = true, type = 'add', selectedUser = null) => {
    mockUseSelector.mockReturnValue({
      isModal,
      selectedUserById: selectedUser,
      type,
    });
  };

  // =================================================================
  // SKENARIO 1: RENDERING & DEFAULT VALUES
  // =================================================================

  test('Modal harus dirender dan field terisi dengan data pengguna lama saat type="edit"', () => {
    // Setup: Modal terbuka, type 'edit', dengan data lama
    setupSelector(true, 'edit', MOCK_USER_EDIT);

    // 1. Render komponen
    render(<FormEdit />);

    // 2. Assertion: Cek elemen dialog dan default value
    const dialogTitle = screen.getByRole('heading', { name: /edit user/i });
    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /edit/i });

    // Cek dialog dan tombol
    expect(dialogTitle).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Cek default value
    expect(nameInput).toHaveValue(MOCK_USER_EDIT.name);
    expect(screen.getByLabelText(/username/i)).toHaveValue(MOCK_USER_EDIT.username);
  });

  test('Modal harus menampilkan "Add" di tombol submit saat type="add"', () => {
    // Setup: type 'add'
    setupSelector(true, 'add', null);
    render(<FormEdit />);

    const submitButton = screen.getByRole('button', { name: /add/i });

    expect(submitButton).toBeInTheDocument();
  });

  // =================================================================
  // SKENARIO 2: SUBMISSION (MODE 'add')
  // =================================================================

  test('Submission di mode "add" harus memanggil setAddUser dengan data form baru dan menutup modal', async () => {
    // Setup: Modal terbuka, type 'add', tanpa data lama
    setupSelector(true, 'add', null);
    render(<FormEdit />);

    // 1. Interaksi: Mengisi form
    await userEvent.type(screen.getByLabelText(/name/i), MOCK_USER_NEW.name);
    await userEvent.type(screen.getByLabelText(/username/i), MOCK_USER_NEW.username);
    await userEvent.type(screen.getByLabelText(/email address/i), MOCK_USER_NEW.email);
    await userEvent.type(screen.getByLabelText(/phone/i), MOCK_USER_NEW.phone);
    await userEvent.type(screen.getByLabelText(/website/i), MOCK_USER_NEW.website);

    // 2. Interaksi: Submit form (Mengklik tombol 'Add')
    const submitButton = screen.getByRole('button', { name: /add/i });
    await userEvent.click(submitButton);

    // --- Assertion ---

    // Cek total dispatch: 1x setAddUser + 1x setIsModal(false) = 2
    expect(mockUseDispatch).toHaveBeenCalledTimes(2);

    // Verifikasi Action 1: setAddUser dipanggil dengan data yang benar
    expect(mockSetAddUser).toHaveBeenCalledTimes(1);
    expect(mockSetAddUser).toHaveBeenCalledWith(MOCK_USER_NEW); // Memastikan payload form dikirim

    // Verifikasi Action 2: setIsModal(false) dipanggil (untuk menutup modal)
    expect(mockSetIsModal).toHaveBeenCalledWith(false);
    expect(mockSetIsModal).toHaveBeenCalledTimes(1);
  });

  // =================================================================
  // SKENARIO 3: SUBMISSION (MODE 'edit')
  // =================================================================

  test('Submission di mode "edit" harus memanggil setEditUser dan menutup modal', async () => {
    // Setup: Modal terbuka, type 'edit', dengan data lama
    setupSelector(true, 'edit', MOCK_USER_EDIT);
    render(<FormEdit />);

    // Data yang dikirim adalah data lama + perubahan (kita hanya mengubah nama)
    const EDITED_PAYLOAD = { ...MOCK_USER_EDIT, name: 'Budi Edited' };

    // 1. Interaksi: Mengubah field Name saja
    const nameInput = screen.getByLabelText(/name/i);
    await userEvent.clear(nameInput); // Hapus nilai lama
    await userEvent.type(nameInput, EDITED_PAYLOAD.name); // Isi nilai baru

    // 2. Interaksi: Submit form (Mengklik tombol 'Edit')
    const submitButton = screen.getByRole('button', { name: /edit/i });
    await userEvent.click(submitButton);

    // --- Assertion ---

    // Cek total dispatch: 1x setEditUser + 1x setIsModal(false) = 2
    expect(mockUseDispatch).toHaveBeenCalledTimes(2);

    // Verifikasi Action 1: setEditUser dipanggil dengan payload yang diubah
    expect(mockSetEditUser).toHaveBeenCalledTimes(1);
    // Note: Payload yang dikirim adalah hasil dari formData, yang akan berisi SEMUA field
    expect(mockSetEditUser).toHaveBeenCalledWith(EDITED_PAYLOAD);

    // Verifikasi Action 2: setIsModal(false) dipanggil (untuk menutup modal)
    expect(mockSetIsModal).toHaveBeenCalledWith(false);
  });

  // =================================================================
  // SKENARIO 4: CANCEL BUTTON & CLOSE MODAL
  // =================================================================

  test('Mengklik tombol "Cancel" harus memanggil setIsModal(false)', async () => {
    setupSelector(true, 'add', null);
    render(<FormEdit />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);

    // Assertion
    expect(mockUseDispatch).toHaveBeenCalledTimes(1);
    expect(mockSetIsModal).toHaveBeenCalledWith(false);
  });
});
