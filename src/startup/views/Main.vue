<template>
  <div>
    Startup page !
    <button @click="createMainWindow">Create Main Window</button>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");

export default {
  methods: {
    createMainWindow() {
      ipcRenderer.send("createMainWindow");
    }
  }
};
</script>

<style>
</style>