<template>
  <UrlScreen msg="Pbid.io Shortener" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UrlScreen from './Pages/UrlScreen.vue';

export default defineComponent({
  name: 'App',
  components: {
    UrlScreen,
  },
});
</script>

<style>
#app {
  width: 100%;
}
</style>
