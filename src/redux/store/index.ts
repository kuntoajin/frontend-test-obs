import { configureStore } from '@reduxjs/toolkit';
// Impor reducer dari slice yang telah Anda buat
import usersReducer from '../slices/user.slice'; 

// Konfigurasi Store
export const store = configureStore({
  // Objek reducer mendefinisikan struktur state Anda
  // Kunci (key) di sini akan menjadi nama state di root store (misalnya: state.users)
  reducer: {
    users: usersReducer,
    // Tambahkan reducer lain di sini jika ada (misal: posts: postsReducer)
  },
  // Middleware, DevTools, dll. dikonfigurasi secara otomatis oleh RTK
});

// Tipe untuk state root (penting untuk TypeScript)
export type RootState = ReturnType<typeof store.getState>;
// Tipe untuk fungsi dispatch (penting untuk TypeScript dengan thunks)
export type AppDispatch = typeof store.dispatch;