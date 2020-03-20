<template>
    <Modal class="z-30" v-on:close="cancel">
        <template v-slot:title>
            <h1>Effacer</h1>
        </template>

        <template v-slot:body>
            <p>Voulez-vous vraiement effacer l'activité?</p>
        </template>

        <template v-slot:footer>
            <button class="form-button bg-red-600 hover:bg-red-800" v-on:click="deleteEvent">Oui</button>
            <button class="form-button bg-green-600 hover:bg-green-800" v-on:click="cancel">Non</button>
        </template>
    </Modal>
</template>

<script>
    import Modal from "../components/Modal";

    export default {
        name: "ConfirmDeleteEventModal",
        components: {
            Modal
        },
        methods: {
            cancel: function () {
                this.$emit('cancel');
            },
            deleteEvent: function () {
                this.$emit('delete');
            }
        }
    }
</script>

<style scoped>
    p{
        @apply font-bold text-center;
    }

    .form-button {
        @apply shadow-lg pt-3 pb-3 mt-4 text-white rounded w-1/2 mx-2;
    }
</style>