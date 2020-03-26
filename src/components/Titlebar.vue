<template>
  <div
    style="-webkit-app-region: drag"
    class="bg-black fixed min-w-full top-0 h-8 z-50 flex justify-between items-center"
  >
    <div class="flex">
      <img class="w-6 h-6 my-1 ml-3" src="../assets/camp-manager.png" alt="tent" />
      <div class="w-full fontSize:lg text-gray-400 text-center truncate py-1 px-2">{{ title }}</div>
    </div>
    <div class="flex h-full items-center">
      <div v-if="resizable" v-on:click="minimizeWindow" class="btn-titlebar">
        <svgicon class="svg-titlebar" icon="zondicons/cheveron-down"></svgicon>
      </div>
      <div v-if="resizable" v-on:click="changeWindowSize" class="btn-titlebar">
        <svgicon ref="changeWindowSize" class="svg-titlebar" v-bind:icon="windowSizeIcon"></svgicon>
      </div>
      <div v-on:click="closeWindow" class="btn-titlebar">
        <svgicon class="svg-titlebar" icon="zondicons/close" color="#c53030"></svgicon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Remote } from 'electron';
import '@/assets/icons/zondicons';
declare var remote: Remote;

@Component
export default class Titlebar extends Vue {
  @Prop({ default: 'Camp Manager' }) public title!: string;
  @Prop({ default: true }) public resizable!: boolean;

  public windowSizeIcon: string = this.getWindowSizeIcon();

  public created() {
    this.getWindow().on('maximize', () => {
      this.windowSizeIcon = this.getWindowSizeIcon();
    });
    this.getWindow().on('unmaximize', () => {
      this.windowSizeIcon = this.getWindowSizeIcon();
    });

    this.getWindow().setResizable(this.resizable);
  }

  public getWindow() {
    return remote.getCurrentWindow();
  }

  public getWindowSizeIcon() {
    return this.getWindow().isMaximized()
      ? 'zondicons/edit-copy'
      : 'zondicons/browser-window';
  }

  public minimizeWindow() {
    this.getWindow().minimize();
  }

  public changeWindowSize() {
    if (this.getWindow().isMaximized()) {
      this.getWindow().restore();
    } else {
      this.getWindow().maximize();
    }
    this.windowSizeIcon = this.getWindowSizeIcon();
  }

  public closeWindow() {
    this.getWindow().close();
  }
}
</script>

<style scoped>
.svg-titlebar {
  @apply w-6 h-4 fill-current text-gray-500 ml-1 mr-1;
}
</style>