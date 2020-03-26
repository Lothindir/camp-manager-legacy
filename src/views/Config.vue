<template>
    <div ref="container" class="flex flex-1 items-start align-middle ml-12 px-2 pt-4 text-gray-800">
        <div class="search-container text-center p-3 relative w-full">
            <input class="bg-gray-600 text-gray-100 text-xs w-full p-2 border-gray-700 rounded" placeholder="Rechercher une option" type="text">
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Config extends Vue {

}
</script>

<style scoped>

</style>