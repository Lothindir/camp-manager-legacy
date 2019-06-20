<template>
    <!--<div class="modal-backdrop fixed top-0 bottom-0 right-0 left-0 flex items-center align-middle">
        <div class="modal bg-gray-300 shadow-2xl flex flex-col">
            <slot name="header">
                Ajouter une activité
            </slot>

            <slot name="body">
                <label for="title">Titre</label>
                <input type="text" name="title" id="title">
                <label for="duration">Durée</label>
                <input type="time" name="duration" id="duration">
            </slot>

            <slot name="footer">
                <button v-on:click="close">Ajouter</button>
            </slot>
        </div>
    </div>-->
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                <header class="modal-header">
                    <slot name="header">
                        This is the default tile!

                        <button
                                type="button"
                                class="btn-close"
                                @click="close"
                        >
                            x
                        </button>
                    </slot>
                </header>
                <section class="modal-body">
                    <slot name="body">
                        I'm the default body!
                    </slot>
                </section>
                <footer class="modal-footer">
                    <slot name="footer">
                        I'm the default footer!

                        <button
                                type="button"
                                class="btn-green"
                                @click="close"
                        >
                            Close me!
                        </button>
                    </slot>
                </footer>
            </div>
        </div>
    </transition>
</template>


<script>
    export default {
        name: "Modal",
        methods: {
            close() {
                this.$emit('close');
            },
        }
    }
</script>

<style scoped>
    .modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background: #FFFFFF;
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        z-index: 10;
    }

    .modal-header,
    .modal-footer {
        padding: 15px;
        display: flex;
    }

    .modal-header {
        border-bottom: 1px solid #eeeeee;
        color: #4AAE9B;
        justify-content: space-between;
    }

    .modal-footer {
        border-top: 1px solid #eeeeee;
        justify-content: flex-end;
    }

    .modal-body {
        position: relative;
        padding: 20px 10px;
    }

    .modal-fade-enter,
    .modal-fade-leave-active {
        opacity: 0;
    }

    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: opacity .5s ease
    }
</style>