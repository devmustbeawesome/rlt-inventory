import { reactive, ref, toValue, type Reactive } from 'vue'
type InventoryItem = {
  id: number
  count: number
  imgUrl: string
  position: number
}
type InvetoryMap = Array<InventoryItem>
const STORAGE_KEY = 'inventory'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
window.addEventListener('storage', (e) => {
  state.value = reactive(getInvventoryFromLocalStorage())
})
function getInvventoryFromLocalStorage(): InvetoryMap {
  const jsonInventory = localStorage.getItem(STORAGE_KEY)
  let inventory: InvetoryMap
  if (jsonInventory) inventory = JSON.parse(jsonInventory)
  else {
    let id = 0
    inventory = [
      {
        id: id++,
        count: 23,
        imgUrl: new URL('/item-image-3.png', import.meta.url).href,
        position: 0,
      },
      {
        id: id++,
        count: 6,
        imgUrl: new URL('/item-image-1.png', import.meta.url).href,
        position: 2,
      },
      {
        id: id++,
        count: 4,
        imgUrl: new URL('/item-image-3.png', import.meta.url).href,
        position: 3,
      },
    ]
  }
  return inventory
}
function setInvventoryToLocalStorage(inventory: Reactive<InvetoryMap> | InvetoryMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory))
}

const state = ref(getInvventoryFromLocalStorage())
function moveItem(from: number, to: number) {
  const fromIndex = state.value.findIndex((item) => item.position == from)
  const toIndex = state.value.findIndex((item) => item.position == to)
  if (~fromIndex) state.value[fromIndex].position = to
  if (~toIndex) state.value[toIndex].position = from
  setInvventoryToLocalStorage(toValue(state.value))
}
function getItem(id: number) {
  return state.value.find((item) => item.id == id)
}
function changeItem(newItem: InventoryItem) {
  const index = state.value.findIndex((item) => item.id == newItem.id)
  if (~index) state.value[index] = newItem
  setInvventoryToLocalStorage(toValue(state.value))
}
function addItem(item: InventoryItem) {
  state.value.push(item)
  setInvventoryToLocalStorage(toValue(state.value))
}

export default {
  state,
  moveItem,
  getItem,
  changeItem,
  addItem,
}
