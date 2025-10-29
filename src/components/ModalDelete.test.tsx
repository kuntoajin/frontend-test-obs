/// <reference types="jest" />
// __tests__/ModalDelete.test.tsx atau ModalDelete.test.js

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
// @ts-ignore: no type declarations for redux-mock-store
import configureStore from 'redux-mock-store';
import ModalDelete from '../components/ModalDelete'; 

// Import actions dari slice yang di-mock
import { usersSlice } from '../redux/slices/user.slice'; 

// Membuat mock store
const mockStore = configureStore([]);

// Mock actions (Pastikan usersSlice.actions diimpor dari lokasi yang benar)
// Dalam tes, kita memverifikasi apakah action creators ini dipanggil.
const setModalDeleteMock = jest.spyOn(usersSlice.actions, 'setModalDelete');
const setDeleteUserMock = jest.spyOn(usersSlice.actions, 'setDeleteUser');

describe('ModalDelete Component', () => {
    let store;

    // Reset mock sebelum setiap tes
    beforeEach(() => {
        // Mocking store dengan state awal yang diperlukan oleh useSelector
        store = mockStore({
            users: {
                isDelete: true, // Asumsikan modal terbuka untuk pengujian
            },
        });
        // Clear history of dispatch calls
        store.clearActions(); 

        // Reset spy history
        setModalDeleteMock.mockClear();
        setDeleteUserMock.mockClear();
    });

    // Helper function untuk merender komponen dengan Provider
    const renderComponent = (initialState) => {
        store = mockStore(initialState);
        return render(
            <Provider store={store}>
                <ModalDelete />
            </Provider>
        );
    };

    // --- Tes 1: Modal Ditampilkan Sesuai State Redux ---
    test('should render the Dialog when isDelete state is true', () => {
        renderComponent({ users: { isDelete: true } });
        
        // Memverifikasi bahwa judul dialog ditampilkan
        const titleElement = screen.getByText(/Use Google's location service?/i);
        expect(titleElement).toBeInTheDocument();
        
        // Memverifikasi tombol Delete ada
        const deleteButton = screen.getByRole('button', { name: /Delete/i });
        expect(deleteButton).toBeInTheDocument();
    });

    // --- Tes 2: Modal Tidak Ditampilkan Ketika isDelete false ---
    test('should not render the Dialog when isDelete state is false', () => {
        renderComponent({ users: { isDelete: false } });
        
        // Menggunakan queryByText karena kita berharap elemen TIDAK ada
        const titleElement = screen.queryByText(/Use Google's location service?/i);
        expect(titleElement).not.toBeInTheDocument();
    });

    // --- Tes 3: Menutup Modal (Cancel) ---
    test('should dispatch setModalDelete(false) when Cancel button is clicked', () => {
        renderComponent({ users: { isDelete: true } });
        
        const cancelButton = screen.getByRole('button', { name: /Cancel/i });
        fireEvent.click(cancelButton);

        // Verifikasi bahwa action setModalDelete(false) dipanggil
        expect(setModalDeleteMock).toHaveBeenCalledWith(false);
        // Verifikasi bahwa dispatch dipanggil dengan action setModalDelete(false)
        expect(store.getActions()).toEqual([
             usersSlice.actions.setModalDelete(false)
        ]);
    });

    // --- Tes 4: Menutup Modal (Close Button/Backdrop) ---
    test('should dispatch setModalDelete(false) when Dialog onClose is triggered', () => {
        renderComponent({ users: { isDelete: true } });
        
        // Mensimulasikan trigger onClose (misalnya klik backdrop atau Esc)
        // Kita mencari elemen Dialog itu sendiri dan memicu onClose
        const dialogElement = screen.getByRole('dialog');
        fireEvent.keyDown(dialogElement, { key: 'Escape', code: 'Escape' }); 

        // Karena onClose={() => dispatch(usersSlice.actions.setModalDelete(false))},
        // kita verifikasi bahwa action setModalDelete(false) dipanggil
        expect(setModalDeleteMock).toHaveBeenCalledWith(false);
    });

    // --- Tes 5: Menangani Penghapusan Pengguna (Delete Button) ---
    test('should dispatch setDeleteUser() and setModalDelete(false) when Delete button is clicked', () => {
        renderComponent({ users: { isDelete: true } });
        
        const deleteButton = screen.getByRole('button', { name: /Delete/i });
        fireEvent.click(deleteButton);

        // Verifikasi bahwa DUA action telah dipanggil
        expect(setDeleteUserMock).toHaveBeenCalledWith(); // Dipanggil tanpa payload
        expect(setModalDeleteMock).toHaveBeenCalledWith(false); 
        
        // Verifikasi urutan dan konten dispatch (handleDeleteUser)
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual([
            usersSlice.actions.setDeleteUser(),
            usersSlice.actions.setModalDelete(false)
        ]);
    });
});