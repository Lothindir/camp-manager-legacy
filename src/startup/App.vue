<template>
  <div
    id="app"
    style="animation: fadein 0.5s;"
    class="flex h-screen bg-gray-900 select-none pt-8 border border-black overflow-hidden font-quicksand"
  >
    <Titlebar></Titlebar>
    <button @click="createMainWindow">Create Main Window</button>
  </div>
</template>

<style src="./assets/main.css"></style>
<script>
const { ipcRenderer } = require("electron");
import Titlebar from "./components/Titlebar";
export default {
  components: { Titlebar },
  methods: {
    createMainWindow() {
      ipcRenderer.send("createMainWindow");
    }
  }
};
</script>