<template>
  <div class="group px-7 py-2 font-light hover:bg-gray-700">
    <p class="text-gray-100">{{ name }}</p>
    <p class="text-gray-500 group-hover:text-gray-100">{{ path }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class RecentProjectsMenu extends Vue {
  @Prop(String) public name!: string;
  @Prop(String) public path!: string;
}
</script>

<style scoped>
</style>