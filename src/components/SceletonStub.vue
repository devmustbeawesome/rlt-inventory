<template>
  <div class="stub"></div>
</template>
<style lang="scss">
.stub {
  background: linear-gradient(90deg, #3c3c3c 0%, #444444 51.04%, #333333 100%);
  border-radius: 0.25rem;
  margin: auto;
  background-size: 400% 400%;
  animation: gradient 3s ease infinite;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
