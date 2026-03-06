<script lang="ts">
import type { PropType } from 'vue'
import type { Config } from '../types'
import Notification from './Notification.vue'
import { useNotificationsStore } from '../composables/notificationsStore'
import { useToast } from '../composables/useToast'
import { twJoin, twMerge } from 'tailwind-merge'
import { computed, defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  components: {
    Notification,
  },
  inheritAttrs: false,
  props: {
    class: {
      type: [String, Object, Array] as PropType<any>,
      default: () => '',
    },
    config: {
      type: Object as PropType<Partial<Config>>,
      default: null,
    },
  },
  setup(props) {
    const toast = useToast()
    const notificationsStore = useNotificationsStore()
    const isMounted = ref(false)

    const wrapperClass = computed(() => {
      return twMerge(twJoin(
        'fixed flex flex-col justify-end z-[55]',
        'bottom-0 end-0',
        'w-full sm:w-96',
      ), props.class)
    })

    onMounted(() => {
      if (props.config)
        notificationsStore.mergeConfig(props.config)
      isMounted.value = true
    })

    return {
      toast,
      notificationsStore,
      wrapperClass,
      isMounted,
    }
  },
})
</script>

<template>
  <Teleport v-if="isMounted" to="body">
    <div :class="wrapperClass" role="region" aria-label="Notifications" aria-live="polite" v-bind="$attrs">
      <div v-if="notificationsStore.notifications.length" class="px-4 sm:px-6 py-6 space-y-3 overflow-y-auto">
        <div v-for="notification of notificationsStore.notifications" :key="notification.id">
          <Notification
            v-bind="notification"
            :class="notification.click && 'cursor-pointer'"
            @click="notification.click && notification.click(notification)"
            @close="toast.remove(notification.id)"
          >
            <template v-for="(_, name) in $slots" #[name]="slotData">
              <slot :name="name" v-bind="slotData" />
            </template>
          </Notification>
        </div>
      </div>
    </div>
  </Teleport>
</template>
