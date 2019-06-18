<template>
  <div id="app" style="animation: fadein 0.5s;" class="flex min-h-screen bg-gray-900 select-none pt-8">
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <Titlebar></Titlebar>
    <Sidebar></Sidebar>
    <router-view/>
  </div>
</template>

<style src="./assets/main.css"></style>
<script>
  import Sidebar from "@/components/Sidebar";
  import Titlebar from "./components/Titlebar";
  export default {
    components: {Titlebar, Sidebar}
  }
</script>