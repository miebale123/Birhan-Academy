<script setup>
import { computed, useAttrs } from 'vue'
import { RouterLink } from 'vue-router'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  block: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: null,
  },
  iconOnly: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
  },
  to: {
    type: [String, Object],
    default: null,
  },
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
})

const attrs = useAttrs()

const isDisabled = computed(() => props.disabled || props.loading)
const componentTag = computed(() => {
  if (props.to) {
    return RouterLink
  }

  if (props.href) {
    return 'a'
  }

  return 'button'
})

const componentProps = computed(() => {
  if (props.to) {
    return {
      ...attrs,
      to: props.to,
      'aria-disabled': isDisabled.value || undefined,
      tabindex: isDisabled.value ? -1 : attrs.tabindex,
    }
  }

  if (props.href) {
    return {
      ...attrs,
      href: props.href,
      'aria-disabled': isDisabled.value || undefined,
      tabindex: isDisabled.value ? -1 : attrs.tabindex,
    }
  }

  return {
    ...attrs,
    type: props.type,
    disabled: isDisabled.value,
    'aria-busy': props.loading || undefined,
  }
})

const classNames = computed(() => {
  return [
    'ui-button',
    `ui-button--${props.variant}`,
    `ui-button--${props.size}`,
    {
      'ui-button--block': props.block,
      'ui-button--disabled': isDisabled.value,
      'ui-button--icon-only': props.iconOnly,
      'ui-button--loading': props.loading,
    },
  ]
})

function handleClick(event) {
  if (isDisabled.value && (props.to || props.href)) {
    event.preventDefault()
    event.stopPropagation()
  }
}
</script>

<template>
  <component
    :is="componentTag"
    v-bind="componentProps"
    :class="classNames"
    @click="handleClick"
  >
    <span v-if="$slots.leading" class="ui-button__icon ui-button__icon-leading">
      <slot name="leading"></slot>
    </span>
    <span v-if="loading" class="ui-button__spinner" aria-hidden="true"></span>
    <span v-if="!iconOnly" class="ui-button__label">
      <slot></slot>
    </span>
    <span v-if="$slots.trailing" class="ui-button__icon ui-button__icon-trailing">
      <slot name="trailing"></slot>
    </span>
    <span v-if="iconOnly && !$slots.default" class="sr-only">Action</span>
  </component>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  border-radius: 999px;
  border: 1px solid transparent;
  font-weight: 700;
  text-align: center;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    opacity 160ms ease,
    transform 160ms ease,
    box-shadow 160ms ease;
}

.ui-button:hover {
  transform: translateY(-1px);
}

.ui-button:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 3px rgba(245, 185, 63, 0.2),
    0 0 0 1px rgba(245, 185, 63, 0.45);
}

.ui-button--block {
  width: 100%;
}

.ui-button--disabled {
  cursor: not-allowed;
  opacity: 0.7;
  transform: none;
}

.ui-button--icon-only {
  gap: 0;
}

.ui-button--sm {
  min-height: 2.25rem;
  padding: 0.6rem 0.95rem;
  font-size: 0.88rem;
}

.ui-button--md {
  min-height: 2.9rem;
  padding: 0.78rem 1.25rem;
  font-size: 0.95rem;
}

.ui-button--lg {
  min-height: 3.15rem;
  padding: 0.88rem 1.5rem;
  font-size: 1rem;
}

.ui-button--icon {
  width: 2.75rem;
  min-width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.ui-button--primary {
  background: #fcd34d;
  color: #0f172a;
  box-shadow: 0 18px 36px rgba(245, 158, 11, 0.2);
}

.ui-button--primary:hover {
  background: #fde68a;
}

.ui-button--secondary {
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.ui-button--secondary:hover,
.ui-button--icon:hover {
  background: rgba(255, 255, 255, 0.1);
}

.ui-button--ghost {
  background: transparent;
  color: rgba(226, 232, 240, 0.88);
}

.ui-button--ghost:hover {
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.ui-button--danger {
  border-color: rgba(248, 113, 113, 0.22);
  background: rgba(248, 113, 113, 0.08);
  color: #fecaca;
}

.ui-button--danger:hover {
  background: rgba(248, 113, 113, 0.12);
}

.ui-button__icon,
.ui-button__spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ui-button__icon :deep(svg) {
  width: 1rem;
  height: 1rem;
}

.ui-button__spinner {
  width: 0.95rem;
  height: 0.95rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 999px;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
