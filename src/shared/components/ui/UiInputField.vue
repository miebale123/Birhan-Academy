<script setup>
import { computed, useAttrs, useSlots } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const modelValue = defineModel({
  type: [String, Number],
  default: '',
})

const props = defineProps({
  hint: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
  invalid: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  scheme: {
    type: String,
    default: 'dark',
  },
  type: {
    type: String,
    default: 'text',
  },
})

const attrs = useAttrs()
const slots = useSlots()

const hasLeading = computed(() => Boolean(slots.leading))
const hasTrailing = computed(() => Boolean(slots.trailing))

const classNames = computed(() => {
  return [
    'ui-field',
    `ui-field--${props.scheme}`,
    {
      'ui-field--invalid': props.invalid,
      'ui-field--with-leading': hasLeading.value,
      'ui-field--with-trailing': hasTrailing.value,
    },
  ]
})

function handleInput(event) {
  modelValue.value = event.target.value
}
</script>

<template>
  <div :class="classNames">
    <label v-if="label" :for="id" class="ui-field__label">
      {{ label }}
    </label>

    <div class="ui-field__control">
      <span v-if="hasLeading" class="ui-field__leading" aria-hidden="true">
        <slot name="leading"></slot>
      </span>

      <input
        :id="id"
        :type="type"
        :value="modelValue"
        class="ui-field__input"
        v-bind="attrs"
        @input="handleInput"
      />

      <span v-if="hasTrailing" class="ui-field__trailing">
        <slot name="trailing"></slot>
      </span>
    </div>

    <p v-if="hint" class="ui-field__hint">
      {{ hint }}
    </p>
  </div>
</template>

<style scoped>
.ui-field {
  display: flex;
  flex-direction: column;
}

.ui-field__label {
  margin-bottom: 0.4rem;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.ui-field--dark .ui-field__label {
  color: rgba(241, 245, 249, 0.95);
}

.ui-field--light .ui-field__label {
  color: rgba(15, 23, 42, 0.92);
}

.ui-field__control {
  position: relative;
}

.ui-field__leading,
.ui-field__trailing {
  position: absolute;
  top: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
}

.ui-field__leading {
  left: 0.92rem;
  width: 1rem;
  height: 1rem;
  color: rgba(100, 116, 139, 0.95);
  pointer-events: none;
}

.ui-field__trailing {
  right: 0.5rem;
}

.ui-field__leading :deep(svg) {
  width: 100%;
  height: 100%;
}

.ui-field__trailing :deep(button) {
  display: inline-flex;
  width: 2.2rem;
  height: 2.2rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.08);
  color: #334155;
  transition:
    background-color 0.18s ease,
    color 0.18s ease;
}

.ui-field__trailing :deep(button:hover) {
  background: rgba(15, 23, 42, 0.12);
  color: #0f172a;
}

.ui-field__trailing :deep(svg) {
  width: 1rem;
  height: 1rem;
}

.ui-field__input {
  width: 100%;
  min-height: 3.1rem;
  border-radius: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.26);
  background: rgba(248, 250, 252, 0.98);
  padding: 0.82rem 0.95rem;
  font-size: 0.94rem;
  font-weight: 500;
  color: #0f172a;
  outline: none;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.ui-field--with-leading .ui-field__input {
  padding-left: 2.7rem;
}

.ui-field--with-trailing .ui-field__input {
  padding-right: 3.35rem;
}

.ui-field__input::placeholder {
  color: rgba(100, 116, 139, 0.82);
}

.ui-field--dark .ui-field__input:focus {
  border-color: rgba(251, 191, 36, 0.9);
  background: #fff;
  box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.16);
  transform: translateY(-1px);
}

.ui-field--light .ui-field__input:focus {
  border-color: rgba(56, 189, 248, 0.85);
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.18);
}

.ui-field--invalid .ui-field__input {
  border-color: rgba(244, 63, 94, 0.52);
}

.ui-field__hint {
  margin: 0.45rem 0 0;
  font-size: 0.8rem;
  line-height: 1.55;
}

.ui-field--dark .ui-field__hint {
  color: rgba(203, 213, 225, 0.76);
}

.ui-field--light .ui-field__hint {
  color: rgba(71, 85, 105, 0.82);
}
</style>
