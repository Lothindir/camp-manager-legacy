<template>
  <div
    id="app"
    style="animation: fadein 0.5s;"
    class="flex h-screen bg-gray-900 select-none pt-8 border border-black overflow-hidden font-quicksand"
  >
    <Titlebar></Titlebar>
    <Sidebar></Sidebar>
    <router-view class="ml-12 pl-2" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Titlebar from "@/components/Titlebar.vue";
import Sidebar from "@/components/Sidebar.vue";

@Component({
  components: {
    Titlebar,
    Sidebar
  }
})
export default class App extends Vue {}
</script>

<style src="../../assets/main.css"></style>
