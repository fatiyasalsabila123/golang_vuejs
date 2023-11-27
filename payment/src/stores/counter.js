import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Mendefinisikan dan mengekspor store menggunakan Pinia
export const useCounterStore = defineStore('counter', () => {
  // State (berisi data yang bisa berubah)
  const count = ref(0)

  // State yang dihitung (derived state), nilai ini akan otomatis dihitung ulang ketika count berubah
  const doubleCount = computed(() => count.value * 2)

  // Mutasi (fungsi untuk mengubah state)
  function increment() {
    count.value++
  }

  // Menyediakan data yang akan diakses dari luar store
  return { count, doubleCount, increment }
})
