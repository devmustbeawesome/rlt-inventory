<script setup lang="ts">
import CloseIcon from './icons/closeIcon.vue'

const show = defineModel<boolean>()
</script>

<template>
  <Transition name="aside-modal">
    <div class="aside-modal" v-show="show">
      <div class="aside-modal__body">
        <slot name="body"></slot>
      </div>
      <div class="aside-modal__footer">
        <slot name="footer"></slot>
      </div>
      <button class="aside-modal__close-button" @click="show = false">
        <CloseIcon />
      </button>
    </div>
  </Transition>
</template>
<style lang="scss">
.aside-modal {
  position: absolute;
  padding: 2rem 1rem 1rem 1rem;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #26262680;
  width: 250px;
  backdrop-filter: blur(16px);
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.aside-modal__close-button {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  border: none;
  background: inherit;
}
.aside-modal__body {
  overflow: auto;
  height: auto;
  scrollbar-width: none;
}
.aside-modal-enter-active {
  transition: all 0.3s linear;
}

.aside-modal-leave-active {
  transition: all 0.3s linear;
}

.aside-modal-enter-from,
.aside-modal-leave-to {
  transform: translateX(100%);
}
.aside-modal__footer {
  padding-top: 1.25rem;
  width: 100%;
  height: fit-content;
  border-top: 1px solid $color-border;
}
</style>
