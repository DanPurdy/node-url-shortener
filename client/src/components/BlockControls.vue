<template>
  <div class="block-controls">
    <v-button
      class="btn btn--secondary btn--small"
      v-if="shortUrl"
      :type="'button'"
      @click="onClickVisit"
      >Visit</v-button
    >
    <v-button
      class="btn btn--small"
      :class="[alternateCopyTheme ? 'btn--secondary' : 'btn--success']"
      v-if="shortUrl"
      :type="'button'"
      @click="onClickCopy"
      >Copy</v-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import Button from './Form/Button.vue';

export default defineComponent({
  name: 'BlockControls',
  components: {
    'v-button': Button,
  },
  props: {
    alternateCopyTheme: {
      type: Boolean as PropType<boolean>,
      default: false,
      required: false,
    },
    shortUrl: {
      required: true,
      type: String as PropType<string>,
    },
  },
  setup(props) {
    const onClickVisit = () => {
      window.open(props.shortUrl);
    };

    const onClickCopy = () => {
      if (props.shortUrl) {
        navigator.clipboard.writeText(props.shortUrl);
      }
    };

    return {
      onClickCopy,
      onClickVisit,
    };
  },
});
</script>

<style scoped>
.block-controls {
  padding: 0.5rem 0;
  text-align: right;
}

.block-controls > button:last-of-type {
  margin-left: 0.4rem;
}
</style>
