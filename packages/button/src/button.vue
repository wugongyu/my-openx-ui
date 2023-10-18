<template>
  <div>
    <button @click="clickHandler">
      <slot></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import { hello } from '@openxui/shared';
const props = withDefaults(defineProps<{
  text?: string;
}>(), {
  text: 'openxUi',
});
const clickHandler = () => {
  hello(props.text);
}
</script>

<style scoped lang="scss">
</style>