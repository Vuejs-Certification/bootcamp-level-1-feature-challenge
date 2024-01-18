<!--You do not need to change anything in this file-->
<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <strong>{{ author }}</strong>
  <span class="text-gray-400 pl-1">({{ timestamp }})</span>
  <p class="pl-1 text-gray-600">{{ content }}</p>
</template>
