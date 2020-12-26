<template>
  <div class="w-1/3 bg-gray-800 text-white border-r border-b border-black min-h-screen">
    <p class="text-center text-lg py-2 text-gray-400">Recent projects</p>
    <RecentProjectsMenu name='Camp 2B 2020' path='E:\Documents\Scouts\Camps\2020\camp-2b-2020' />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import RecentProjectsMenu from '@/components/startup/RecentProjectsMenu.vue';

@Component({
  components: {
    RecentProjectsMenu,
  },
})
export default class RecentProjectsBar extends Vue {

}
</script>

<style>

</style>