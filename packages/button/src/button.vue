<template>
  <button
    class="op-button"
    :class="classes"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
// packages/button/src/button.vue
import { computed } from 'vue';
import { defaultButtonProps, ButtonProps } from './button';

const props = withDefaults(
  defineProps<ButtonProps>(),
  defaultButtonProps(),
);

const classes = computed(() => {
  const result: string[] = [];
  const { type, plain, disabled } = props;
  if (type) {
    result.push(`op-button--${type}`);
  }

  if (plain) {
    result.push('op-button--plain');
  }

  if (disabled) {
    result.push('op-button--disabled');
  }

  return result;
});

</script>
