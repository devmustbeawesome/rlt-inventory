<script setup lang="ts">
import AsideSkeleton from '@/components/AsideSceleton.vue'
import InventoryGrid from '@/components/InvetoryGrid.vue'
import BannerBlock from './components/BannerBlock.vue'
import { ref } from 'vue'
const showBanner = ref(true)
</script>

<template>
  <div class="invetory-page">
    <AsideSkeleton />
    <InventoryGrid />
    <BannerBlock :show="showBanner" @hide="showBanner = false"></BannerBlock>
  </div>
</template>

<style lang="scss">
.invetory-page {
  padding: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 869px;
  height: 660px;
}
</style>
