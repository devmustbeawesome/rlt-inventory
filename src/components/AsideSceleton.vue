<script setup lang="ts">
import SceletonStub from '@/components/SceletonStub.vue'
</script>

<template>
  <div class="aside-sceleton">
    <img class="aside-sceleton__image" src="/skeleton-img.jpg" alt="left side skeleton image" />
    <SceletonStub style="width: 80%; height: 0.625rem" />
    <SceletonStub style="width: 90%; height: 2rem" />
    <SceletonStub style="width: 60%; height: 0.625rem" />
    <SceletonStub style="width: 75%; height: 0.625rem" />
    <SceletonStub style="width: 80%; height: 0.625rem" />
    <SceletonStub style="width: 75%; height: 0.625rem" />
    <SceletonStub style="width: 50%; height: 0.625rem" />
  </div>
</template>

<style lang="scss">
.aside-sceleton {
  width: 236px;
  height: 500px;
  background-color: var(--vt-c-black-soft);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.125rem;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
}
.aside-sceleton__image {
  border-radius: 0.5rem;
  width: 100%;
}
</style>
