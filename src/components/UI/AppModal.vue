<script setup>
const emits = defineEmits(['close-modal']);
const closeModal = () => {
  emits('close-modal');
};
</script>

<template>
  <div class="modal__wrapper">
    <div class="modal">
      <button 
        @click="closeModal" 
        class="modal__close-btn"
      >
        <img src="@/assets/icons/close.svg">
      </button>
      <div class="modal__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal__wrapper {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  margin: auto;
  background-color: var(--main-white);
  border-radius: 16px;
  padding: 28px;
  width: 90%;
  max-width: 500px;
  overflow-y: auto;
}

.modal__close-btn {
  background-color: var(--main-white);
  float: right;
}

.modal__close-btn img {
  width: 18px;
  height: 18px;
}

.modal__content {
  margin: 18px 0px;
  padding: 24px;
}

@media (min-width: 768px) and (max-width: 1169px) {
  .modal {
    border-radius: 12px;
    padding: 20px;
    width: 85%;
    max-width: 450px;
  }

  .modal__close-btn img {
    width: 14px;
    height: 14px;
  }

  .modal__content {
    margin: 14px 0px;
    padding: 16px;
  }
}

@media (max-width: 767px) {
  .modal__wrapper {
    padding: 20px;
    align-items: flex-start;
    padding-top: 10vh;
  }

  .modal {
    border-radius: 12px;
    padding: 20px;
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
    max-height: 80vh;
  }

  .modal__close-btn img {
    width: 16px;
    height: 16px;
  }

  .modal__content {
    margin: 12px 0px;
    padding: 16px;
  }
}
</style>