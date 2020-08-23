<template>
  <div>
      <h1>Welcome !</h1>
    <!--<RecentProjectsBar />-->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import RecentProjectsBar from "@/components/startup/RecentProjectsBar.vue";
import { IpcRenderer } from "electron";
declare var ipcRenderer: IpcRenderer;

@Component({
  components: {
    RecentProjectsBar
  }
})
export default class Welcome extends Vue {
  openMain() {
    ipcRenderer.send("createMainWindow");
  }
}
</script>

<style>
</style>