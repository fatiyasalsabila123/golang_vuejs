// Import fungsi createRouter dan createWebHistory dari vue-router
import { createRouter, createWebHistory } from 'vue-router'

// Import komponen HomeView dari direktori views
import HomeView from '../views/main.vue'

// Buat instance router menggunakan createRouter
const router = createRouter({
  // Menggunakan createWebHistory untuk membuat mode history
  history: createWebHistory(import.meta.env.BASE_URL),

  // Daftar rute yang akan digunakan dalam aplikasi
  routes: [
    {
      // Rute untuk halaman beranda
      path: '/',
      name: 'home', // Nama rute, bisa digunakan untuk navigasi
      component: HomeView // Komponen yang akan ditampilkan untuk rute ini
    },
    {
      // Rute untuk halaman utama
      path: '/main',
      name: 'main',
      // Menggunakan fungsi () => import() untuk memuat komponen secara asinkron
      component: () => import('../views/main.vue')
    }
  ]
})

// Export instance router untuk digunakan dalam aplikasi Vue
export default router
