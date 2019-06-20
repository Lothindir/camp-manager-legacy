<template>
    <transition name="modal">
        <div class="modal-mask" v-show="show">
            <div class="modal-container">
                <div class="modal-header">
                    <h3>New Post</h3>
                </div>
                <div class="modal-body">
                    <label class="form-label">
                        Title
                        <input class="form-control">
                    </label>
                    <label class="form-label">
                        Body
                        <textarea rows="5" class="form-control"></textarea>
                    </label>
                </div>
                <div class="modal-footer text-right">
                    <button class="modal-default-button" @click="savePost()">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </transition>
    <!--<transition name="modal">
        <div>
            <h1>Ajouter une activité</h1>
            <label for="title">Titre</label>
            <input v-model="title" type="text" name="title" id="title">
            <label for="duration">Durée</label>
            <input v-model="duration" type="time" name="duration" id="duration">
        </div>
    </transition>-->
</template>

<script>
    export default {
        name: "AddEventModal",
        props: ['show'],
        methods: {
            savePost: function () {
                // Some save logic goes here...

                this.$emit('close');
            }
        }
    }
</script>

<style scoped>

</style>

