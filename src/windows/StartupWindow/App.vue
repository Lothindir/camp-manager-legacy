<template>
  <div
    id="app"
    style="animation: fadein 0.5s;"
    class="flex h-screen bg-gray-900 select-none pt-8 border border-black overflow-hidden font-quicksand"
  >
    <Titlebar title="Welcome to Camp Manager" :resizable=false></Titlebar>
    <div>Startup Window</div>
    <button @click="openMain">Open Main</button>
  </div>
</template>

<script lang="ts">
import Titlebar from '../../components/Titlebar.vue';
import { IpcRenderer } from 'electron';
declare var ipcRenderer: IpcRenderer;

export default {
  components: { Titlebar },
  methods: {
      openMain() {
          ipcRenderer.send('createMainWindow');
      },
  },
};
</script>

<style src="../../assets/main.css"></style>
