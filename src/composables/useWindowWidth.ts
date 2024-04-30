import { ref, onMounted, onUnmounted } from 'vue'

export default function useWindowWidth() {
  const isMobile = ref(window.innerWidth <= 640)
  const isMedium = ref(window.innerWidth <= 1022)

  function updateWindowWidth() {
    isMobile.value = window.innerWidth <= 640
    isMedium.value = window.innerWidth <= 1022
  }

  onMounted(() => {
    window.addEventListener('resize', updateWindowWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowWidth)
  })

  return { isMobile, isMedium }
}
