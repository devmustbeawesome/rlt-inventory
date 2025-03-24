<script setup lang="ts">
import vDragNDrop from '@/directives/vDragNDrop'
import useInventoryStore from '@/stores/useInventoryStore'
import { computed, ref, watch } from 'vue'
import AsideModal from './AsideModal.vue'
import SceletonStub from './SceletonStub.vue'
import RedButton from './RedButton.vue'

const INVENTORY_SIZE = 25
const inventory = computed(() => {
  const map = new Map(new Array(INVENTORY_SIZE).entries())
  useInventoryStore.state.value.forEach((item) => {
    map.set(item.position, item)
  })
  return map
})
const activeItemId = ref<number | null>(null)
const activeItem = computed(() => {
  if (activeItemId.value !== null) return useInventoryStore.getItem(activeItemId.value)
  return undefined
})
const showModal = ref(false)
watch(activeItemId, () => {
  showModal.value = true
})
const showForm = ref(false)
const counterInput = ref(0)
function itemCountDecrease() {
  if (activeItem.value === undefined) return false
  activeItem.value.count -= counterInput.value
  if (activeItem.value.count < 0) activeItem.value.count = 0
  useInventoryStore.changeItem(activeItem.value)
}
</script>

<template>
  <div class="invetory__wrapper">
    <ul class="invetory-grid">
      <li
        v-for="[key, item] in inventory"
        :key="item?.id"
        class="invetory-grid__cell droppable"
        :data-position="key"
      >
        <div
          v-if="item"
          class="item"
          v-drag-n-drop="{
            onDrop: (itemElement: HTMLElement, CellElement: HTMLElement) => {
              const newPosition = CellElement.dataset.position
              const oldPosition = (
                itemElement.closest('.invetory-grid__cell.droppable') as HTMLElement
              ).dataset.position
              if (newPosition && oldPosition) useInventoryStore.moveItem(+oldPosition, +newPosition)
            },
            dropable: '.droppable',
            dropableActiveClass: 'invetory-grid__cell--active',
            dragableActiveClass: 'item--dragging',
          }"
          @click="activeItemId = item.id"
        >
          <img class="item__img" :src="item.imgUrl" alt="" draggable="false" />
          <div class="item__counter">{{ item.count }}</div>
        </div>
      </li>
    </ul>
    <AsideModal v-model="showModal">
      <template v-slot:body>
        <div class="item-editing">
          <img
            class="item-editing__img"
            :src="activeItem?.imgUrl"
            alt=""
            height="130"
            width="130"
          />
          <div class="stubs-group">
            <SceletonStub style="width: 100%; height: 2rem; margin-bottom: 1rem" />
            <SceletonStub style="width: 100%; height: 1rem" />
            <SceletonStub style="width: 100%; height: 1rem" />
            <SceletonStub style="width: 100%; height: 1rem" />
            <SceletonStub style="width: 80%; height: 1rem" />
            <SceletonStub style="width: 50%; height: 1rem" />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <form action="#" v-show="showForm" class="remove-form" @submit.prevent="itemCountDecrease">
          <input
            type="number"
            v-model="counterInput"
            class="remove-form__input"
            placeholder="введите количество"
          />
          <div class="remove-form__footer">
            <button
              type="button"
              @click="showForm = false"
              class="remove-form__cancel"
              style="width: calc(50% - 0.5rem); float: right"
            >
              Отмена
            </button>
            <RedButton class="remove-form__submit">Подтвердить</RedButton>
          </div>
        </form>
        <RedButton v-show="!showForm" @click="showForm = true" style="width: 100%"
          >удалить</RedButton
        >
      </template>
    </AsideModal>
  </div>
</template>

<style lang="scss">
.invetory__wrapper {
  position: relative;
  width: fit-content;
  height: fit-content;
  overflow: hidden;
}
.invetory-grid {
  width: 525px;
  height: 500px;
  border: 1px solid $color-border;
  border-radius: 0.75rem;
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 1px;
  background-color: $color-border;
  overflow: hidden;
}
.invetory-grid__cell {
  background-color: $color-bkg-soft;
}
.invetory-grid__cell--active {
  background-color: $color-bkg-soft-hover;
}
.item {
  width: 100%;
  height: 100%;
  position: relative;
}
.item--dragging {
  border: 1px solid $color-border;
  background-color: $color-bkg-soft;
  border-radius: 1.5rem;
  .item__counter {
    display: none;
  }
}
.item__counter {
  position: absolute;
  right: 0;
  bottom: 0;
  border-top: 1px solid $color-border;
  border-left: 1px solid $color-border;
  border-top-left-radius: 0.375rem;
  padding: 0.25rem;
  font-family: Inter;
  font-weight: 500;
  font-size: 10px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
}
.item__img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.item-editing {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  width: 100%;
  overflow: auto;
  height: auto;
}
.item-editing__description {
  overflow: auto;
}
.remove-form__input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid $color-border;
  border-radius: 0.25rem;
}
.remove-form__cancel {
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  width: calc(50% - 0.5rem);
  float: left;
}
.remove-form__footer {
  margin-top: 1rem;
}
.remove-form__footer:after {
  content: '';
  display: table;
  clear: both;
}
.remove-form__input {
  color: $color-text;
  background-color: $color-bkg-soft;
  border: 1px solid $color-border;
}
.remove-form__input:hover {
  background-color: $color-bkg-soft-hover;
}
.remove-form__input {
  -moz-appearance: textfield;
}
.remove-form__input::-webkit-outer-spin-button,
.remove-form__input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.stubs-group {
  border-top: 1px solid $color-border;
  padding: 1rem 0;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 100%;
}
</style>
