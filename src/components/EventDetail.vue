<script setup lang="ts">
import type { Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="event-detail">
    <span class="category">{{ event.category }}</span>
    <span class="organizer">{{ event.organizer }}</span>
  </div>
</template>

<style scoped>
.event-detail {
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-bottom: 18px;
}
/* Category and organizer share the same font size and are both right-aligned */
.category,
.organizer {
  font-size: 1rem;
  text-align: right;
}
</style>
