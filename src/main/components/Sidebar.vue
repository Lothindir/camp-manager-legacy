<template>
    <div v-bind:class="(isOpen ? 'w-56' : 'w-12')" class="bg-gray-800 text-white border-r border-b border-black fixed min-h-screen pt-8 top-0 z-40">
        <div v-if="isOpen" class="w-full px-3 pt-3 flex items-end" v-on:click="isOpen = false">
            <svgicon class="text-right" icon="zondicons/arrow-thin-left"></svgicon>
        </div>
        <div v-if="isOpen" class="search-container text-center p-3 relative">
            <input class="bg-gray-600 text-gray-100 text-xs w-full p-2 pl-8 border-gray-700 rounded" placeholder="Rechercher" type="text">
            <div class="absolute top-0 py-5 px-2 text-grey-100">
                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18" width="18" height="18"><path class="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
            </div>
        </div>
        <div v-else class="h-12 w-full p-4 relative" v-on:click="isOpen = true">
            <svgicon icon="zondicons/menu"></svgicon>
        </div>

        <router-link to="/" class="sidebar-icons">
            <SidebarMenu v-bind:is-open="isOpen" icon="font-awesome/calendar" text="Planification"></SidebarMenu>
        </router-link>

        <router-link to="/participants" class="sidebar-icons">
            <SidebarMenu v-bind:is-open="isOpen" icon="font-awesome/group" text="Participants"></SidebarMenu>
        </router-link>

        <router-link to="/config" class="sidebar-icons">
            <SidebarMenu v-bind:is-open="isOpen" icon="font-awesome/gears" text="Réglages"></SidebarMenu>
        </router-link>

        <ProfileMenu v-bind:is-open="isOpen" first-name="Francesco" last-name="Monti"></ProfileMenu>

    </div>
</template>

<script>
    import '../icons/font-awesome'
    import ProfileMenu from "./ProfileMenu";
    import SidebarMenu from "./SidebarMenu";
    export default {
        name: "Sidebar",
        components: {SidebarMenu, ProfileMenu},
        data() {
            return {
                isOpen: false
            }
        }
    }
</script>

<style scoped>
    .sidebar-icons {
        display: block;
    }

    .svg-icon {
        @apply w-4 h-4 fill-current text-gray-500 cursor-pointer;
    }

    .svg-icon:hover {
        @apply text-gray-300;
    }
</style>