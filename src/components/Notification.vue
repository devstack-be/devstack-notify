<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import type { PropType } from 'vue'
import { twJoin, twMerge } from 'tailwind-merge'
import { Icon as Iconify } from '@iconify/vue'
import { useTimer } from '@/composables/useTimer'
import type { NotificationAction, NotificationColor } from '@/types/notification'
import { useNotificationsStore } from '@/composables/notificationsStore'

interface MergedProps {
  timeout: number
  color: NotificationColor
  icon: string | null
  closeIcon: string
}

function mergeProps(props: any, defaultConfig: any): MergedProps {
  return {
    timeout: props.timeout != null ? props.timeout : defaultConfig.timeout,
    color: props.color != null ? props.color : defaultConfig.color,
    icon: props.icon != null ? props.icon : defaultConfig.icon,
    closeIcon: props.closeIcon != null ? props.closeIcon : defaultConfig.closeIcon,
  }
}

export default defineComponent({
  components: {
    Iconify,
  },
  inheritAttrs: false,
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    closeButton: {
      type: Boolean,
      default: true,
    },
    actions: {
      type: Array as PropType<NotificationAction[]>,
      default: () => [],
    },
    callback: {
      type: Function,
      default: null,
    },
    timeout: {
      type: Number,
      default: null,
    },
    color: {
      type: String as PropType<NotificationColor>,
      default: null,
    },
    icon: {
      type: String,
      default: () => null,
    },
    closeIcon: {
      type: String,
      default: () => null,
    },
    class: {
      type: [String, Object, Array] as PropType<any>,
      default: () => '',
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const notificationsStore = useNotificationsStore()
    const ui = computed(() => notificationsStore.config)
    // Merge props with config
    const mergedProps = mergeProps(props, ui.value.default)

    let timer: any = null
    const remaining = ref(mergedProps.timeout)

    // Color variants
    const BgColorVariants = {
      blue: 'bg-blue-500 dark:bg-blue-400',
      red: 'bg-red-500 dark:bg-red-400',
      yellow: 'bg-yellow-500 dark:bg-yellow-400',
      indigo: 'bg-indigo-500 dark:bg-indigo-400',
      green: 'bg-green-500 dark:bg-green-400',
    }
    const textColorVariants = {
      blue: 'text-blue-500 dark:text-blue-400',
      red: 'text-red-500 dark:text-red-400',
      yellow: 'text-yellow-500 dark:text-yellow-400',
      indigo: 'text-indigo-500 dark:text-indigo-400',
      green: 'text-green-500 dark:text-green-400',
    }

    // Computed classes
    const wrapperClass = computed(() => {
      return twMerge(twJoin(
        ui.value.wrapper,
        ui.value.background,
        ui.value.rounded,
        ui.value.shadow,
      ), props.class)
    })

    const progressClass = computed(() => {
      return twJoin(
        ui.value.progress,
        `${BgColorVariants[mergedProps.color]}`,
      )
    })

    const progressStyle = computed(() => {
      const remainingPercent = remaining.value / mergedProps.timeout * 100
      return { width: `${remainingPercent || 0}%` }
    })

    const iconClass = computed(() => {
      return twJoin(
        ui.value.icon,
        `${textColorVariants[mergedProps.color]}`,
      )
    })

    // Functions
    function onMouseover() {
      if (timer)
        timer.pause()
    }

    function onMouseleave() {
      if (timer)
        timer.resume()
    }

    function onClose() {
      if (timer)
        timer.stop()

      if (props.callback)
        props.callback()

      emit('close')
    }

    function onAction(action: NotificationAction) {
      if (timer)
        timer.stop()

      if (action.click)
        action.click()

      emit('close')
    }
    onMounted(() => {
      if (!mergedProps.timeout)
        return

      timer = useTimer(() => {
        onClose()
      }, mergedProps.timeout)

      watchEffect(() => {
        remaining.value = timer.remaining.value
      })
    })

    onUnmounted(() => {
      if (timer)
        timer.stop()
    })

    return {
      ui,
      mergedProps,
      wrapperClass,
      progressClass,
      progressStyle,
      iconClass,
      onAction,
      onMouseover,
      onMouseleave,
      onClose,
      twMerge,
    }
  },
})
</script>

<template>
  <Transition appear v-bind="ui.transition">
    <div
      :class="wrapperClass"
      role="status"
      v-bind="$attrs"
      @mouseover="onMouseover"
      @mouseleave="onMouseleave"
    >
      <div :class="[ui.container, ui.rounded, ui.ring]">
        <div class="flex" :class="[ui.padding, ui.gap, { 'items-start': description || $slots.description, 'items-center': !description && !$slots.description }]">
          <Iconify v-if="mergedProps.icon" :icon="mergedProps.icon" :class="iconClass" />
          <div :class="ui.inner">
            <p v-if="(title || $slots.title)" :class="ui.title">
              <slot name="title" :title="title">
                {{ title }}
              </slot>
            </p>
            <p v-if="(description || $slots.description)" :class="twMerge(ui.description, !(title && $slots.title) && 'mt-0 leading-5')">
              <slot name="description" :description="description">
                {{ description }}
              </slot>
            </p>
            <div v-if="(description || $slots.description) && actions.length" :class="ui.actions">
              <Component :is="action.component" v-for="(action, index) of actions" :key="index" v-bind="{ ...({}), ...action }" @click.stop="onAction(action)">
                {{ action.label }}
              </Component>
            </div>
          </div>
          <div v-if="closeButton || (!description && !$slots.description && actions.length)" :class="twMerge(ui.actions, 'mt-0')">
            <template v-if="!description && !$slots.description && actions.length">
              <Component :is="action.component" v-for="(action, index) of actions" :key="index" @click.stop="onAction(action)">
                {{ action.label }}
              </Component>
            </template>
            <button v-if="closeButton" class="inline-flex items-center font-semibold text-xs uppercase tracking-widest transition ease-in-out duration-150 disabled:opacity-25 focus:outline-0" color="invisible" aria-label="Close" @click.stop="onClose">
              <Iconify :icon="mergedProps.closeIcon ? mergedProps.closeIcon : 'heroicons:x-mark'" class="w-5 h-5 text-gray-500 hover:text-gray-400 dark:text-gray-700" />
            </button>
          </div>
        </div>
        <div v-if="mergedProps.timeout" :class="progressClass" :style="progressStyle" />
      </div>
    </div>
  </Transition>
</template>
