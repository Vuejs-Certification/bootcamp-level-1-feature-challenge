<script setup></script>

<template>
  <div class="message-board">
    <h2 class="message-board-title">Message Board</h2>
    <ul class="message-board-list">
      <li></li>
    </ul>
  </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter-from {
  transform: translateY(-100%);
}
</style>
