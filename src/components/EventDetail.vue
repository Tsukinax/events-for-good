<script setup lang="ts">
import type { Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="flex flex-col w-[250px] mb-[18px]">
    <span class="text-base text-right">{{ event.category }}</span>
    <span class="text-base text-right">{{ event.organizer }}</span>
  </div>
</template>
