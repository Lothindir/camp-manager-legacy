<template>
    <transition name="modal-fade">
        <div class="modal-backdrop flex items-center justify-center fixed top-0 left-0 w-full h-full mt-4">
            <div class="modal bg-gray-300 border border-gray-900 shadow-2xl flex flex-col z-10 p-2 rounded min-w-24" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                <header class="modal-header flex items-center justify-between p-1 border-b border-gray-200 text-green-600">
                    <slot name="title">
                        This is the default title!
                    </slot>
                    <div v-on:click="close">
                        <svgicon class="w-4 h-4 fill-current text-green-600 cursor-pointer" icon="zondicons/close"></svgicon>
                    </div>
                </header>
                <section class="modal-body px-2 py-1">
                    <slot name="body">
                        This is the body!
                    </slot>
                </section>
                <footer class="modal-footer flex justify-between items-center p-1 border-t border-gray-200">
                    <slot name="footer">
                        I'm the default footer!
                        <button type="button" class="bg-green-600 text-gray-300 rounded m-2 p-1" @click="submit">
                            Submit!
                        </button>
                    </slot>
                </footer>
            </div>
        </div>
    </transition>
</template>


<script>
    import '../icons/zondicons';

    export default {
        name: "Modal",
        methods: {
            close() {
                this.$emit('close');
            },
            submit() {
                this.$emit('submit');
            }
        }
    }
</script>

<style scoped>
    .modal-backdrop {
        background-color: rgba(0, 0, 0, 0.6);
    }

    .modal-fade-enter,
    .modal-fade-leave-active {
        opacity: 0;
    }

    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: opacity .5s ease;
    }
</style>