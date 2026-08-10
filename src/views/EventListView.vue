<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventDetail from '@/components/EventDetail.vue'
import type { Event } from '@/types'
import { ref, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'

const events = ref<Event[] | null>(null)
const totalEvents = ref<number>(0)

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  // §2.9 — page size is configurable through the ?size= query param (default 3 since §5.1)
  size: {
    type: Number,
    default: 3,
  },
})
const page = computed(() => props.page)
const pageSize = computed(() => props.size)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / pageSize.value)
  return page.value < totalPages
})

watchEffect(() => {
  EventService.getEvents(pageSize.value, page.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = Number(response.headers['x-total-count'])
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Events For Good</h1>

  <!-- §2.9 — links to set up the page size (stored as the ?size= query param) -->
  <div class="mb-4">
    Events per page:
    <RouterLink
      class="px-1.5 font-bold no-underline text-gray-700"
      exact-active-class="text-green-500"
      :to="{ name: 'event-list-view', query: { page: 1, size: 2 } }"
      >2</RouterLink
    >
    |
    <RouterLink
      class="px-1.5 font-bold no-underline text-gray-700"
      exact-active-class="text-green-500"
      :to="{ name: 'event-list-view', query: { page: 1, size: 4 } }"
      >4</RouterLink
    >
    |
    <RouterLink
      class="px-1.5 font-bold no-underline text-gray-700"
      exact-active-class="text-green-500"
      :to="{ name: 'event-list-view', query: { page: 1, size: 6 } }"
      >6</RouterLink
    >
  </div>

  <div class="flex flex-col items-center">
    <div v-for="event in events" :key="event.id">
      <EventCard :event="event" />
      <EventDetail :event="event" />
    </div>

    <div class="flex w-[290px]">
      <RouterLink
        class="flex-1 text-left no-underline text-gray-700"
        :to="{ name: 'event-list-view', query: { page: page - 1, size: pageSize } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</RouterLink
      >

      <RouterLink
        class="flex-1 text-right no-underline text-gray-700"
        :to="{ name: 'event-list-view', query: { page: page + 1, size: pageSize } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page &#62;</RouterLink
      >
    </div>
  </div>
</template>
