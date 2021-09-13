<template>
  <div class="result-block">
    <p>Result: {{ item.shortUrl }}</p>
    <block-controls :alternateCopyTheme="true" :shortUrl="item.shortUrl" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import { IUrlItem } from '../sdk/urls/fetch';
import BlockControls from './BlockControls.vue';

export default defineComponent({
  name: 'ResultBlock',
  components: {
    'block-controls': BlockControls,
  },
  props: {
    item: {
      required: true,
      type: Object as PropType<IUrlItem>,
    },
  },

  setup(props) {
    const onClickCopy = () => {
      navigator.clipboard.writeText(props.item.shortUrl);
    };

    const onClickVisit = () => {
      window.open(props.item.shortUrl);
    };

    return {
      onClickCopy,
      onClickVisit,
    };
  },
});
</script>

<style scoped>
.result-block {
  color: var(--light-body-text-color);
  background-color: var(--background-color-success);
  padding: 0.4rem 1rem;
  border: 1px solid #ffffff;
  border-radius: var(--border-radius);
  text-align: center;
  max-width: 500px;
  margin: 1rem auto;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media screen and (max-width: 550px) {
  .result-block {
    flex-direction: column;
  }
}
</style>
