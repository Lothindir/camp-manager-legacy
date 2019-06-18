<template>
  <div id="app" style="-webkit-app-region: drag; animation: fadein 0.5s;" class="flex min-h-screen bg-gray-900 select-none">
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <sidebar></sidebar>
    <router-view/>
  </div>
</template>

<style src="./assets/main.css"></style>
<script>
  import Sidebar from "@/components/Sidebar";
  export default {
    components: {Sidebar}
  }
</script>