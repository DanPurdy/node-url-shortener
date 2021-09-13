<template>
  <div>
    <div class="inline-input">
      <label for="inline-input"> Enter a Url </label>
      <input
        :disabled="disabled"
        id="inline-input"
        type="text"
        name="url"
        @input="onChange"
        placeholder="https://example.com"
        required
      />
      <v-button
        class="btn btn--primary js-submit-button"
        :disabled="disabled"
        :type="'submit'"
        >{{ disabled ? 'Saving..' : 'Submit' }}</v-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import Button from './Button.vue';

export default defineComponent({
  name: 'InlineInput',
  components: {
    'v-button': Button,
  },
  emits: {
    changeEvent(payload: string) {
      return !!payload;
    },
  },
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
    },
  },
  setup(props, { emit }) {
    function onChange(event: Event) {
      const { value } = event.target as HTMLInputElement;
      emit('change-event', value);
    }

    return {
      onChange,
    };
  },
});
</script>

<style scoped>
.inline-input {
  position: relative;
  display: flex;
  overflow: hidden;
  max-width: 600px;
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  margin: 0 auto;
}

.inline-input > label {
  position: absolute;
  left: 5px;
  top: 5px;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.inline-input > input {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--input-text-color);
  letter-spacing: -0.3px;
  width: 100%;
  appearance: none;
  border: 3px solid var(--input-border-color);
  padding: 1.4rem 0.3rem 0.9rem;
  background: var(--input-background-color);
  outline: 0px;
  opacity: 1;
  transition: border-color 0.2s ease-in-out;
}

.inline-input > input::placeholder {
  opacity: 0.5;
}

.inline-input > input:focus {
  border: 3px solid var(--input-outline-color);
}

.inline-input > button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

@media (prefers-reduced-motion: reduce) {
  .inline-input > input {
    transition: none;
  }
}

@media screen and (max-width: 600px) {
  .inline-input {
    flex-direction: column;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .inline-input > button {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    text-align: center;
  }
}
</style>
