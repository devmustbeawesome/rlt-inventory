<script setup lang="ts">
import { computed } from 'vue'
import CloseIcon from './icons/closeIcon.vue'
import SceletonStub from '@/components/SceletonStub.vue'
const props = defineProps<{
  show: boolean
  closeable?: boolean
}>()
const emits = defineEmits<{
  hide: []
}>()
const show = computed(() => props.show)
</script>

<template>
  <div class="banner" v-if="show">
    <button class="banner_close-button" @click="emits('hide')">
      <CloseIcon />
    </button>
    <slot>
      <SceletonStub style="width: 90%; height: 2rem" />
    </slot>
  </div>
</template>
<style lang="scss">
.banner {
  width: 100%;
  background-color: var(--vt-c-black-soft);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  position: relative;
  padding: 1rem 2rem 1rem 1rem;
}
.banner_close-button {
  position: absolute;
  right: 1rem;
  top: 1rem;
  background: inherit;
  border: none;
  cursor: pointer;
}
</style>
