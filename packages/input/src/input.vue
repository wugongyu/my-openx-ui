<template>
  <div>
    <input
      type="text"
      :value="modelValue"
      @input="handleInputChange"
    />
  </div>
</template>

<script setup lang="ts">
import { hello } from "@openxui/shared";
const props = withDefaults(defineProps<{
  modelValue?: string;
}>(), {
  modelValue: '',
});

const emit = defineEmits<{
    (event: 'update:modelValue', val: string): void;
  }>();

const handleInputChange = (e) => {
  const currentValue = e.target.value;
  emit('update:modelValue', currentValue);
  hello(currentValue);
}
</script>

<style scoped lang="scss">
</style>