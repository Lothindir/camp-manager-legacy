<template>
    <div style="-webkit-app-region: drag" class="bg-black fixed min-w-full top-0 h-8 z-50 flex justify-between items-center">
        <div class="flex">
            <img class="w-6 h-6 my-1 ml-3" src="../assets/tent.png" alt="tent">
            <div class="w-32 fontSize:lg text-gray-400 text-center py-1">Camp Manager</div>
        </div>
        <div class="flex h-full items-center">
            <div v-on:click="minimizeWindow" class="btn-titlebar">
                <svgicon class="svg-titlebar" icon="zondicons/cheveron-down"></svgicon>
            </div>
           <div v-on:click="changeWindowSize" class="btn-titlebar">
               <svgicon ref="changeWindowSize" class="svg-titlebar" v-bind:icon="windowSizeIcon"></svgicon>
           </div>
            <div v-on:click="closeWindow" class="btn-titlebar">
                <svgicon class="svg-titlebar" icon="zondicons/close"></svgicon>
            </div>
        </div>

    </div>
</template>

<script>
    import '../icons/zondicons'
    const {remote} = window.require('electron');

    export default {
        name: "Titlebar",
        data() {
          return {
              windowSizeIcon: this.getWindowSizeIcon()
          }
        },
        created() {
            this.getWindow().on('maximize', () => {
                this.windowSizeIcon = this.getWindowSizeIcon();
                console.log('Received maximize event');
            });
            this.getWindow().on('unmaximize', () => {
                this.windowSizeIcon = this.getWindowSizeIcon();
            })
        },
        methods:{
            minimizeWindow: function(){
                this.getWindow().minimize();
            },
            changeWindowSize: function() {
                if(this.getWindow().isMaximized()){
                    this.getWindow().restore();
                }
                else{
                    this.getWindow().maximize();
                }
                this.windowSizeIcon = this.getWindowSizeIcon();
            },
            closeWindow: function() {
                this.getWindow().close();
            },
            getWindow: function () {
                return remote.getCurrentWindow();
            },
            getWindowSizeIcon: function(){
                return (this.getWindow().isMaximized() ? 'zondicons/edit-copy' : 'zondicons/browser-window');
            }
        }
    }
</script>

<style scoped>
    .svg-titlebar {
        @apply w-6 h-4 fill-current text-gray-500 ml-1 mr-1;
    }
</style>