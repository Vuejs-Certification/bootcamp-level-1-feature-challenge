<!--You do not need to change anything in this file-->
<script setup>
import { shallowRef, triggerRef } from "vue";
import MessageBoard from "./components/MessageBoard.vue";
import MessageItem from "./components/MessageItem.vue";
import MessageForm from "./components/MessageForm.vue";

const messages = shallowRef([
  {
    id: "1",
    author: "John",
    content:
      "Did you hear about Vue 3? It brings enhanced performance and a more streamlined composition API.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: "2",
    author: "Jane",
    content:
      "Vue 3 introduces the Composition API, making it easier to organize and reuse code. Exciting times!",
    timestamp: new Date().toLocaleString(),
  },
]);

function sendMessage(msg) {
  messages.value = [msg, ...messages.value];
  triggerRef(messages);
}
</script>

<template>
  <div>
    <MessageBoard :messages="messages" v-slot="{ message }">
      <MessageItem v-bind="message" />
    </MessageBoard>
    <MessageForm @send-msg="sendMessage" />
  </div>
</template>
