<template>
  <div
    id="app"
    style="animation: fadein 0.5s;"
    class="flex h-screen pt-8 overflow-hidden bg-gray-900 border border-black select-none font-quicksand"
  >
    <Titlebar></Titlebar>
    <Sidebar></Sidebar>
    <router-view class="pl-2 ml-12" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Titlebar from '@/components/Titlebar.vue';
import Sidebar from '@/components/Sidebar.vue';
import { ipcRenderer } from 'electron';

@Component({
  components: {
    Titlebar,
    Sidebar,
  },
})
export default class App extends Vue {
  title: string = "Camp Manager";
  path: string = "";

  public created() {
    ipcRenderer.on('main:get-camp-title', (e, args) => {
      this.title += " - " + args;
    });

    ipcRenderer.on('main:get-camp-path', (e, args) => {
      this.path = args;
      ipcRenderer.send('main:get-camp-title');
    });

    ipcRenderer.send('main:get-camp-path');
  }
}
</script>

<style src="../../assets/main.css"></style>
