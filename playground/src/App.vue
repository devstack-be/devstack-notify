<script setup lang="ts">
import { useToast } from '../..'

const toast = useToast()
function triggerToast(type?: string) {
  switch (type) {
    case 'success':
      toast.success({ title: 'Success', description: 'Description of the notify' })
      break
    case 'warning':
      toast.warning({ title: 'Warning', description: 'Description of the notify' })
      break

    case 'error':
      toast.error({ title: 'Error', description: 'Description of the notify' })
      break

    case 'info':
      toast.info({ title: 'Info', description: 'Description of the notify' })
      break

    default:
      toast.add({ title: 'No type specified', description: 'Description of the notify' })
      break
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-green-500">
    <!-- Boutons pour déclencher les toasts -->
    <div class="flex space-x-4">
      <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md" @click="triggerToast('success')">
        Success
      </button>
      <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md" @click="triggerToast('warning')">
        Warning
      </button>
      <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" @click="triggerToast('info')">
        Info
      </button>
      <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" @click="triggerToast('error')">
        Error
      </button>
    </div>
    <div class="flex space-x-4 mt-5">
      <button class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md" @click="triggerToast()">
        No specified type
      </button>
    </div>
  </div>
  <StackNotifications />
</template>
