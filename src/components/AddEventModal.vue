<template>
    <Modal class="z-20" v-on:close="close" v-on:submit="submit">
        <template v-slot:title>
            <h1>Ajouter une activité</h1>
        </template>

        <template v-slot:body>
            <div class="flex flex-wrap -mx-3 mb-6 w-full h-full">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="form-label" for="grid-first-name">
                        Titre
                    </label>
                    <input class="form-input" id="grid-first-name" type="text" placeholder="SC 3.2 - Jeux d'eau">
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="form-label" for="grid-last-name">
                        Durée
                    </label>
                    <input class="form-input" id="grid-last-name" type="time" value="01:00">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="form-label" for="eventType">
                        Type d'activité
                    </label>
                    <Multiselect class="border border-gray-400 rounded text-gray-700" id="eventType" v-model="eventType" :options="eventTypes" :searchable="true" placeholder="Choisir un type d'activité">
                    </Multiselect>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="form-label" for="resp">
                        Responsable(s)
                    </label>
                    <Multiselect class="border border-gray-400 rounded text-gray-700" id="resp" v-model="eventManagers" :options="chiefs" :multiple="true" :searchable="false" track-by="fullName" label="code"
                                 placeholder="Choisir au moins un responsable">
                        <template slot="option" slot-scope="{option}">{{ option.fullName }}</template>
                    </Multiselect>
                </div>
            </div>
        </template>

        <template v-slot:footer>
            //TODO Add Button
        </template>
    </Modal>
</template>

<script>
    import Modal from "../components/Modal";
    import Multiselect from "vue-multiselect";

    import "vue-multiselect/dist/vue-multiselect.min.css";

    export default {
        name: "AddEventModal",
        components: {
            Multiselect,
          Modal
        },
        data() {
          return {
              eventManagers: [],
              eventType: null,
              chiefs: [
                  { code: 'FM', fullName: 'Francesco Monti'},
                  { code: 'KM', fullName: 'Katja Mosimann' },
                  { code: 'BG', fullName: 'Benoit Guignard' }
              ],
              eventTypes: [
                  "Sport de Camp",
                  "Activité de Camp",
                  "Vécu de Camp",
                  "CDF",
                  "Repas",
                  "Social",
                  "Divers"
              ]
          }
        },
        methods: {
            close: function () {
                this.$emit('close');
            },
            submit: function () {
                this.$emit('submit');
            }
        }
    }
</script>

<style scoped>
    .form-control {
        @apply m-1 flex justify-start;
    }

    .form-input {
        @apply appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight;
    }

    .form-input:focus {
        @apply outline-none bg-white border-gray-500;
    }

    .form-label {
        @apply block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2;
    }
</style>

