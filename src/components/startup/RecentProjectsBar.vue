<template>
  <div class="w-1/3 min-h-screen text-white bg-gray-800 border-b border-r border-black">
    <p class="py-2 text-lg text-center text-gray-400">Recent projects</p>
    <RecentProjectsMenu v-for='project in recentProjects' :key='project[1]' :name='project[0]' :path='project[1]' />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { IpcRenderer } from "electron";
import RecentProjectsMenu from '@/components/startup/RecentProjectsMenu.vue';
declare var ipcRenderer: IpcRenderer;

@Component({
  components: {
    RecentProjectsMenu,
  },
})
export default class RecentProjectsBar extends Vue {
  recentProjects = null;

  public created() {
    ipcRenderer.on('startup:get-recent-projects', (e, args) => {
      this.recentProjects = args;
      
    });

    ipcRenderer.send('startup:get-recent-projects');
  }
}
</script>

<style>

</style>