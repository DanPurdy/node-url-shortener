<template>
  <ul class="url-list-container">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UrlListContainer',
});
</script>

<style scoped>
.url-list-container {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 0.5vw;
}

@media screen and (max-width: 1300px) {
  .url-list-container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media screen and (max-width: 960px) {
  .url-list-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media screen and (max-width: 768px) {
  .url-list-container {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
