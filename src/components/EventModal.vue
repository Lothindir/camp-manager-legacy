<template>
    <Modal class="z-20" v-on:close="close">
        <template v-slot:title>
            <h1>{{getModalTitle()}}</h1>
        </template>

        <template v-slot:body>
            <div class="flex flex-wrap w-full h-full" :class="event.allDay ? '' : '-mx-3 mb-6'">
                <div class="w-full px-3 mb-6 md:mb-0" :class="event.allDay ? '' : 'md:w-1/2'">
                    <label class="form-label" for="title">
                        {{(propAllDay ? 'Chef de jour' : 'Titre')}}
                    </label>
                    <input class="form-input" id="title" type="text" :placeholder="getTitlePlaceholder()" v-model="event.title" :disabled="editEvent === false">
                </div>
                <div class="w-full md:w-1/2 px-3" v-if="!event.allDay">
                    <label class="form-label" for="evDuration">
                        Durée
                    </label>
                    <input class="form-input" id="evDuration" type="time" min="06:00" max="23:00" step="900" v-model="event.duration" :disabled="editDuration === false || editEvent === false || event.allDay === true"> <!-- step="900" represents 15 min -->
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6" v-if="!event.allDay">
                <div class="w-full px-3">
                    <label class="form-label" for="event-type">
                        Type d'activité
                    </label>
                    <Multiselect class="border border-gray-400 rounded text-gray-700" id="event-type" v-model="event.eventType" :options="eventTypes" :searchable="true" placeholder="Choisir un type d'activité" :disabled="editEvent === false">
                    </Multiselect>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6" v-if="!event.allDay">
                <div class="w-full px-3">
                    <label class="form-label" for="resp">
                        Responsable(s)
                    </label>
                    <Multiselect class="border border-gray-400 rounded text-gray-700" id="resp" v-model="event.eventManagers" :options="chiefs" :multiple="true" :searchable="false" track-by="fullName" label="code"
                                 placeholder="Choisir au moins un responsable" :disabled="editEvent === false">
                        <template slot="option" slot-scope="{option}">{{ option.fullName }}</template>
                    </Multiselect>
                </div>
            </div>
        </template>

        <template v-slot:footer>
            <button class="form-button mx-auto w-1/2" v-on:click="submitEvent">{{getSubmitButtonText()}}</button>
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
        props: {
            editEvent: Boolean,
            editDuration: Boolean,
            addEvent: Boolean,
            propTitle: String,
            propAllDay: Boolean,
            propManagers: Array,
            propType: String
        },
        data() {
          return {
              event: {
                  title: this.propTitle,
                  duration: null,
                  allDay: this.propAllDay,
                  eventManagers: this.propManagers,
                  eventType: this.propType,
              },
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
                this.clearFields();
            },
            submitEvent: function () {
                let eventName;
                if(this.addEvent){
                    eventName = 'submit';
                }
                else if(this.editEvent)
                {
                    eventName = 'edit';
                }
                else{
                    eventName = 'close';
                }

                if(this.event.allDay && this.event.title !== ''){
                    this.$emit(eventName, this.event);
                }
                else if(this.event.title !== '' && this.event.eventManagers.length > 0 && this.event.eventType !== null) {

                    if(this.editDuration){
                        if(this.allDay){
                            this.duration = null;
                            this.$emit(eventName, this.event);
                        }
                        else if (this.duration === null){
                            // TODO show some error message
                        }
                        else{
                            this.$emit(eventName, this.event);
                        }
                    }
                    else {
                        this.$emit(eventName, this.event);
                    }
                }
                else {
                    // TODO show some error message
                }
            },
            clearFields: function () {
                let setAll = (obj, val) => Object.keys(obj).forEach(k => obj[k] = val);
                let setNull = obj => setAll(obj, null);
                setNull(this.event);
            },
            getModalTitle: function () {
                if(this.addEvent){
                    return 'Ajouter';
                }
                else if(this.editEvent){
                    return 'Modifier';
                }
                else{
                    return 'Voir';
                }
            },
            getTitlePlaceholder: function() {
              return this.event.allDay ? 'Francesco' : 'SC 3.2 - Jeux d\'eau';
            },
            getSubmitButtonText: function () {
                if(this.addEvent){
                    return 'Ajouter';
                }
                else if(this.editEvent){
                    return 'Enregistrer';
                }
                else{
                    return 'Fermer';
                }
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

    .form-button {
        @apply shadow-lg pt-3 pb-3 mt-4 text-white bg-green-600 rounded;
    }

    .form-button:hover {
        @apply bg-green-400;
    }
</style>

