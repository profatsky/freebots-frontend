import { ref, computed } from 'vue';

export const collapsed = ref(false)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)

export const SIDEBAR_WIDTH = ref(280);
export const SIDEBAR_WIDTH_COLLAPSED = ref(96);

export const sidebarWidth = computed(() => {
  resizeSidebar();
  return `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED.value : SIDEBAR_WIDTH.value}px`
});

export const resizeSidebar = () => {
  if (window.innerWidth > 1169) {
    SIDEBAR_WIDTH.value = 280;
    SIDEBAR_WIDTH_COLLAPSED.value = 96;
  } else if (window.innerWidth <= 1169 && window.innerWidth >= 768) {
    SIDEBAR_WIDTH.value = 240;
    SIDEBAR_WIDTH_COLLAPSED.value = 80;
  } else {
    SIDEBAR_WIDTH.value = 200;
    SIDEBAR_WIDTH_COLLAPSED.value = 64;
  }
};
