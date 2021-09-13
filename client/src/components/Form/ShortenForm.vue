<template>
  <form @submit="handleSubmit">
    <inline-input @change-event="onChange" :disabled="isSaving" />
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/runtime-core';
import InlineInput from './InlineInput.vue';

export default defineComponent({
  name: 'ShortenForm',
  components: {
    'inline-input': InlineInput,
  },
  emits: {
    submitEvent(payload: string) {
      return !!payload;
    },
  },
  props: {
    isSaving: {
      required: true,
      type: Boolean as PropType<boolean>,
    },
  },
  setup(props, { emit }) {
    const longUrl = ref<string>('');

    const handleSubmit = (event: Event) => {
      event.preventDefault();
      emit('submitEvent', longUrl.value);
    };

    const onChange = (url: string) => {
      longUrl.value = url;
    };

    return {
      handleSubmit,
      props,
      longUrl,
      onChange,
    };
  },
});
</script>
