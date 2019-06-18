<template>
    <div style="-webkit-app-region: drag"
            class="bg-black fixed min-w-full top-0 h-8 py-1 px-3 flex justify-between items-center">
        <div class="flex">
            <img class="w-6 h-6" src="../assets/tent.png" alt="tent">
            <div class="w-32 fontSize:lg text-gray-400 text-center">Camp Manager</div>
        </div>
        <div class="flex">
            <svg class="titlebar-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path></svg>
            <svg class="titlebar-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path
                    d="M0 3c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm2 2v12h16V5H2z"></path></svg>
            <svg class="titlebar-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path
                    d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path></svg>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Titlebar"
    }
</script>

<style scoped>

</style>