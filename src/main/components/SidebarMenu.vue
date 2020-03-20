<template>
    <div v-bind:class="(isOpen ? 'px-4 py-2' : 'px-2 py-1')" class="sidebar-icon">
        <svgicon v-bind:class="(isOpen ? 'mr-4' : '')" class="svg-sidebar" v-bind:icon="icon"></svgicon>
        <div v-if="isOpen" class="text-white">{{text}}</div>
    </div>
</template>

<script>
    export default {
        name: "SidebarMenu",
        props: {
            icon: String,
            text: String,
            isOpen: Boolean
        }
    }
</script>

<style scoped>
    .sidebar-icon {
        @apply flex items-center text-gray-500 cursor-pointer h-12;
    }

    .sidebar-icon:hover {
        @apply bg-gray-700 text-gray-400;
    }

    .svg-sidebar {
        @apply h-8 w-8 fill-current;
    }
</style>