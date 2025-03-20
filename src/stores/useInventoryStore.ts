import { computed, reactive, toValue, type Reactive } from 'vue'
type InventoryItem = {
  id: number
  count: number
  imgUrl: string
}
type InvetoryMap = Map<number, InventoryItem | undefined>
const INVENTORY_SIZE = 25
const STORAGE_KEY = 'inventory'
// refresh invetory by change storage
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) state = reactive(getInvventoryFromLocalStorage())
})
function getInvventoryFromLocalStorage(): InvetoryMap {
  const jsonInventory = localStorage.getItem(STORAGE_KEY)
  let inventory: InvetoryMap
  if (jsonInventory) inventory = new Map(JSON.parse(jsonInventory))
  else {
    inventory = new Map(new Array(INVENTORY_SIZE).entries())
  }
  return inventory
}
function setInvventoryToLocalStorage(inventory: Reactive<InvetoryMap> | InvetoryMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(inventory.entries())))
}

let state = reactive(getInvventoryFromLocalStorage())
function moveItem(from: number, to: number) {
  const oldItem = state.get(to)
  const newItem = state.get(from)
  state.set(from, oldItem)
  state.set(to, newItem)
  setInvventoryToLocalStorage(toValue(state))
}
function getItem(position: number) {
  return state.get(position)
}
function setItem(position: number, item: InventoryItem) {
  state.set(position, item)
  setInvventoryToLocalStorage(toValue(state))
}
const itemsMap = computed(() => state)

export default {
  itemsMap,
  moveItem,
  getItem,
  setItem,
}
