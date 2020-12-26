<template>
  <div class="group px-4 py-2 font-light hover:bg-gray-700 cursor-pointer" @click="openRecentCamp">
    <p class="text-gray-100">{{ name }}</p>
    <p class="text-gray-500 group-hover:text-gray-100">{{ sanitizedPath }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IpcRenderer } from 'electron';
declare var ipcRenderer: IpcRenderer;

const maxPathLength = 34;

@Component
export default class RecentProjectsMenu extends Vue {
  @Prop(String) public name!: string;
  @Prop(String) public path!: string;

  get sanitizedPath() {
    if(this.path.length > maxPathLength) {      
      let pathDirs = this.path.split('\\');
      let lastDir = pathDirs[pathDirs.length - 1]
      let lastDirLength = lastDir.length;

      let lengthToRemove = maxPathLength - lastDirLength - 4;
      let firstPart = this.path.substring(0, lengthToRemove);

      return firstPart + '...\\' + lastDir;
    }
    return this.path;
  }

  openRecentCamp() {
    ipcRenderer.send('startup:open-recent-camp', this.path);
  }
}
</script>

<style scoped>
</style>