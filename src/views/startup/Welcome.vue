<template>
  <div class="flex">
    <RecentProjectsBar />
    <div class="w-2/3 mt-16 text-center text-gray-300 font-light">
      <img class="mx-auto mb-2 w-1/4 h-1/4" src="@/assets/camp-manager.png" alt="tent" />
      <p class="text-6xl">Camp Manager</p>
      <p class="text-2xl text-gray-600">Version {{ appVersion }}</p>
      <div class="w-auto mx-auto mt-28 inline-flex flex-col">
        <router-link to="/new" class="textBox">
          <svgicon icon="zondicons/folder-outline-add" color="#edf2f7" class="h-8 mr-4"></svgicon>Create new camp
        </router-link>
        <p class="mt-4 textBox" @click="openExistingCamp">
          <svgicon icon="zondicons/folder-outline" color="#edf2f7" class="h-8 mr-4"></svgicon>Open camp
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import RecentProjectsBar from "@/components/startup/RecentProjectsBar.vue";
import { IpcRenderer } from "electron";
import "@/assets/icons";
declare var ipcRenderer: IpcRenderer;

const { version } = require("@/../package.json");

@Component({
  components: {
    RecentProjectsBar,
  },
})
export default class Welcome extends Vue {
  public openMain() {
    ipcRenderer.send("createMainWindow");
  }

  appVersion: string = version;

  openExistingCamp() {
    ipcRenderer.send('startup:open-camp');
  }
}
</script>

<style>
.textBox {
  @apply inline-flex flex-row justify-start align-bottom text-xl cursor-pointer;
}

.textBox:hover {
  @apply text-gray-100 underline;
}
</style>