<template>
  <div class="w-full px-12 py-4 text-gray-300">
    <h1 class="mb-8 text-3xl">New Camp</h1>
    <div class="input-group">
      <label for="campName" class="input-label">Name : </label>
      <input v-model="campName" class="w-2/3 input-text" type="text" name="campName" id="campName" />
    </div>
    <div class="input-group">
      <label for="campLocation" class="input-label">Location : </label>
      <div class="flex w-2/3">
        <input v-model="campLocationFolder" class="w-full input-text" type="text" name="campLocation" id="campLocation" />
        <svgicon @click="openLocation" icon="zondicons/folder-outline" color="#edf2f7" class="h-8 ml-2"></svgicon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { IpcRenderer } from "electron";
declare var ipcRenderer: IpcRenderer;

@Component
export default class NewCamp extends Vue {
  public created() {
    ipcRenderer.on('app:get-home-folder', (e, args) => {
      this.campLocationFolder = args[0];
    })
    ipcRenderer.on('app:new-camp-location', (e, args) => {
      
    });

    ipcRenderer.send('startup:get-home-folder');

  }

  campName: string = "Camp name";
  campLocationFolder: string = "";
  get campLocation() {
    return this.campLocationFolder + '/' + this.campName;
  }

  openLocation() {
    ipcRenderer.send('startup:new-camp-location');
  }
};
</script>

<style>
.input-group {
  @apply flex flex-row justify-between w-full mb-8;
}

.input-label {
  @apply text-xl font-light;
}

.input-text {
  @apply text-gray-300 bg-transparent border-b-2 border-white;
}
</style>