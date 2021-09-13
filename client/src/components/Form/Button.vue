<template>
  <button
    :class="classNames"
    :disabled="disabled"
    :type="type"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    classNames: {
      type: String as PropType<string>,
      default: '',
    },
    disabled: Boolean as PropType<boolean>,
    onClick: {
      type: Function as PropType<(event: Event) => void>,
    },
    type: {
      type: String as PropType<'button' | 'submit'>,
      default: 'submit',
    },
  },
});
</script>

<style>
.btn {
  background-color: transparent;
  border: 3px solid black;
  border-radius: var(--border-radius);
  transition: border-color 0.2s ease-in-out;
  cursor: pointer;
  font-size: 1.4rem;
  padding: 1rem 3rem;
  outline: none;
  font-weight: bold;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.btn--block {
  display: block;
}

.btn--primary {
  color: var(--btn-primary-color);
  background-color: var(--btn-primary-bg-color);
  border: 3px solid var(--btn-primary-border-color);
}

.btn--primary:hover,
.btn--primary:focus {
  border: 3px solid var(--btn-primary-hover-color);
}

.btn--success {
  color: var(--btn-success-color);
  background-color: var(--btn-success-bg-color);
  border: 3px solid var(--btn-success-border-color);
}

.btn--success:hover,
.btn--success:focus {
  border: 3px solid var(--btn-success-hover-color);
}

.btn--small {
  font-size: 1rem;
  padding: 0.2rem 0.6rem;
}

.btn--secondary {
  background-color: var(--btn-secondary-bg-color);
  color: var(--btn-secondary-color);
  border: 3px solid var(--btn-secondary-border-color);
}

.btn--secondary:hover,
.btn--secondary:focus {
  border: 3px solid var(--btn-secondary-hover-color);
}

@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
}
</style>
