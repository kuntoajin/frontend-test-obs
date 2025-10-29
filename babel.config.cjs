// babel.config.cjs

/**
 * Konfigurasi Babel untuk Komponen React dengan TypeScript dan Jest.
 * File ini menangani transpiling sintaks modern (ESNext), JSX, dan TypeScript.
 */
module.exports = {
  // PENGATURAN UTAMA: Presets
  // Presets adalah sekumpulan plugin yang menentukan bagaimana kode modern ditranspilasi.
  presets: [
    
    // 1. @babel/preset-env
    // Transpiling fitur JS modern (ES2015+) berdasarkan target lingkungan.
    [
      '@babel/preset-env',
      {
        // PENTING: Menggunakan setting target untuk Node.js untuk Jest
        // dan setting target untuk browser untuk aplikasi biasa.
        // Konfigurasi ini biasanya disetel dalam environment Jest
        // atau dibiarkan pada setting default jika tidak ada environment yang spesifik.
        targets: {
            node: 'current', // Agar Jest tahu fitur Node mana yang harus dipertahankan
        },
      },
    ],
    
    // 2. @babel/preset-react
    // PENTING: Untuk mengerti dan mentranspilasi sintaks JSX.
    [
      '@babel/preset-react',
      {
        // Menggunakan runtime 'automatic' menghilangkan kebutuhan 'import React from "react"'
        // di setiap file (cocok untuk React 17+).
        runtime: 'automatic', 
      },
    ],
    
    // 3. @babel/preset-typescript
    // PENTING: Untuk menghapus tipe TypeScript dan mentranspilasi fitur TS ke JS biasa.
    // HARUS selalu berada paling akhir dalam daftar presets.
    [
      '@babel/preset-typescript',
      {
        // Tidak perlu pengaturan tambahan di sini
      },
    ],
  ],

  // PENGATURAN TAMBAHAN: Plugins
  // Plugins digunakan untuk fitur JS yang lebih spesifik atau eksperimental.
  plugins: [
    // PENTING: Digunakan untuk mengaktifkan fitur impor/ekspor dinamis di CommonJS
    // Ini membantu kompatibilitas modul saat testing.
    '@babel/plugin-transform-modules-commonjs',
    
    // Plugin lain yang mungkin Anda perlukan:
    // ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    // '@babel/plugin-proposal-class-properties',
  ],

  // PENGATURAN UNTUK JEST
  // Konfigurasi khusus yang mungkin diperlukan saat menjalankan Jest
  env: {
    test: {
        // Mengaktifkan CommonJS saat tes berjalan (jika tidak menggunakan module.exports)
        // Jika Anda menghadapi masalah import/export di tes, pastikan ini aktif.
        plugins: ['@babel/plugin-transform-modules-commonjs'], 
    },
  },
};