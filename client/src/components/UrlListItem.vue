<template>
  <li class="url-list-item">
    <div class="url-list-item__content">
      <h4>{{ shortUrl }}</h4>
      <span>{{ formattedLongUrl }}</span>
    </div>
    <block-controls :shortUrl="shortUrl" />
  </li>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import BlockControls from './BlockControls.vue';

export default defineComponent({
  name: 'UrlListItem',
  components: {
    'block-controls': BlockControls,
  },
  props: {
    shortUrl: String,
    longUrl: String,
  },
  setup(props) {
    const formattedLongUrl = computed(() => {
      if (props.longUrl) {
        return props.longUrl?.replace(/^https?:\/\//, '');
      }

      return null;
    });

    return {
      formattedLongUrl,
    };
  },
});
</script>

<style scoped>
.url-list-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--background-color-light);
  border-radius: var(--box-border-radius);
  word-break: break-all;
  padding: 0.5rem 1rem;
}

.url-list-item__content {
  margin-bottom: 1.3rem;
}
</style>
