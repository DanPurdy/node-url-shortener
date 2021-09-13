<template>
  <div class="error-block">
    <p><slot></slot></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'ErrorBlock',
});
</script>

<style scoped>
.error-block {
  color: var(--light-body-text-color);
  background-color: #e63737;
  padding: 0.4rem 1rem;
  border: 1px solid #ffffff;
  border-radius: var(--border-radius);
  text-align: center;
  max-width: 500px;
  margin: 1rem auto;
  font-weight: 700;
}
</style>
