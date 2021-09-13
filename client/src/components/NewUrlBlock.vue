<template>
  <div>
    <div class="url-list-item__content">
      <h4>{{ shortUrl }}</h4>
      <span>{{ formattedLongUrl }}</span>
    </div>
    <div class="url-list-item__controls">
      <v-button
        class="btn btn--secondary btn--small"
        v-if="shortUrl"
        :type="'button'"
        @click="onClickVisit"
        >Visit</v-button
      >
      <v-button
        class="btn btn--success btn--small"
        v-if="shortUrl"
        :type="'button'"
        @click="onClickCopy"
        >Copy</v-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import Button from './Form/Button.vue';

export default defineComponent({
  name: 'UrlListItem',
  components: {
    'v-button': Button,
  },
  props: {
    shortUrl: String as PropType<string>,
    longUrl: String as PropType<string>,
  },
  setup(props) {
    const formattedLongUrl = computed(() => {
      if (props.longUrl) {
        return props.longUrl?.replace(/^https?:\/\//, '');
      }
    });

    const onClickVisit = () => {
      window.open(props.shortUrl);
    };

    const onClickCopy = () => {
      if (props.shortUrl) {
        navigator.clipboard.writeText(props.shortUrl);
      }
    };

    return {
      formattedLongUrl,
      onClickCopy,
      onClickVisit,
    };
  },
});
</script>

<style scoped>
.new-url-block {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--background-color-light);
  border-radius: var(--box-border-radius);
  word-break: break-all;
  padding: 0.5rem 1rem;
}
</style>
