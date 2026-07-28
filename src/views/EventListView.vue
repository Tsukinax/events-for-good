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
  // §2.9 — page size is configurable through the ?size= query param (default 2)
  size: {
    type: Number,
    default: 2,
  },
})
const page = computed(() => props.page)
const pageSize = computed(() => props.size)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / pageSize.value)
  return page.value < totalPages
})

watchEffect(() => {
  events.value = null
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

  <div class="events">
    <div v-for="event in events" :key="event.id">
      <EventCard :event="event" />
      <EventDetail :event="event" />
    </div>

    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1, size: pageSize } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</RouterLink
      >

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, size: pageSize } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page &#62;</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
