<template>
  <button class="red-button">
    <slot></slot>
  </button>
</template>
<style lang="scss">
.red-button {
  background-color: #fa7272;
  border: none;
  color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  text-align: center;
}
.red-button:hover {
  background-color: #ff8888;
}
</style>
