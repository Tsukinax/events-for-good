<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventDetail from '@/components/EventDetail.vue'
import type { Event } from '@/types'
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService'

const events = ref<Event[] | null>(null)

onMounted(() => {
  EventService.getEvents()
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Events For Good</h1>

  <div class="events">
    <div v-for="event in events" :key="event.id">
      <EventCard :event="event" />
      <EventDetail :event="event" />
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
