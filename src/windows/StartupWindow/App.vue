<template>
  <div
    id="app"
    style="animation: fadein 0.5s;"
    class="flex h-screen bg-gray-900 select-none pt-8 border border-black overflow-hidden font-quicksand"
  >
    <Titlebar title="Welcome to Camp Manager" :resizable="false"></Titlebar>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Titlebar from '@/components/Titlebar.vue';
import { IpcRenderer } from 'electron';
declare var ipcRenderer: IpcRenderer;

@Component({
  components: {
    Titlebar,
  },
})
export default class App extends Vue {
  public openMain() {
    ipcRenderer.send('createMainWindow');
  }
  public created() {
    this.$router.onReady(() => {
      if (this.$route.path.match('.*.html$')) {
        this.$router.replace('/');
      }
    });
  }
}
</script>

<style src="../../assets/main.css"></style>
