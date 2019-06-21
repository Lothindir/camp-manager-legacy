<template>
    <Modal class="z-20" v-on:close="close" v-on:submit="submit">
        <template v-slot:title>
            <h1>Ajouter une activité</h1>
        </template>

        <template v-slot:body>
            <!--                <div class="form-control">-->
            <!--                    <label class="px-1 mr-1" for="title">Titre :</label>-->
            <!--                    <input class="form-input" type="text" name="title" id="title">-->
            <!--                </div>-->
            <!--                <div class="form-control">-->
            <!--                    <label class="px-1 mr-1" for="duration">Durée :</label>-->
            <!--                    <input class="form-input" type="time" name="duration" id="duration">-->
            <!--                </div>-->
            <div class="flex flex-wrap -mx-3 mb-6 w-full h-full">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Titre
                    </label>
                    <input class="form-input" id="grid-first-name" type="text" placeholder="SC 3.2 - Jeux d'eau">
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Durée
                    </label>
                    <input class="form-input" id="grid-last-name" type="time" value="01:00">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Password
                    </label>
                    <input class="form-input" id="grid-password" type="password" placeholder="******************">
                    <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="eventType">
                        Type d'activité
                    </label>
                    <Multiselect class="border border-gray-400 rounded text-gray-700" id="eventType" v-model="eventType" :options="eventTypes" :searchable="true" placeholder="Choisir un type d'activité">
                    </Multiselect>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="resp">
                        Responsable(s)
                    </label>
                    <Multiselect class="border border-gray-400 rounded text-gray-700" id="resp" v-model="eventManagers" :options="chiefs" :multiple="true" :searchable="false" track-by="fullName" label="code"
                                 placeholder="Choisir au moins un responsable">
                        <template slot="option" slot-scope="{option}">{{ option.fullName }}</template>
                    </Multiselect>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                        City
                    </label>
                    <input class="form-input" id="grid-city" type="text" placeholder="Albuquerque">
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                        Zip
                    </label>
                    <input class="form-input" id="grid-zip" type="text" placeholder="90210">
                </div>
            </div>
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
</style>

