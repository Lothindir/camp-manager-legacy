<template>
    <Modal class="z-20" v-on:close="close">
        <template v-slot:title>
            <h1>{{getModalTitle()}}</h1>
        </template>

        <template v-slot:body>
            <div class="flex flex-wrap w-full h-full" :class="isShowDuration() ? '' : 'mb-6'">
                <div class="w-full mb-6 md:mb-0" :class="isShowDuration() ? '' : 'pr-3 md:w-1/2'">
                    <label class="form-label" for="title">
                        {{(propAllDay ? 'Chef de jour' : 'Titre')}}
                    </label>
                    <input class="form-input" id="title" type="text" :placeholder="getTitlePlaceholder()" v-model="event.title" :disabled="editEvent === false || isDefaultEvent">
                </div>
                <div class="w-full md:w-1/2 pl-3" v-if="!isShowDuration()">
                    <label class="form-label" for="evDuration">
                        Durée
                    </label>
                    <input class="form-input" id="evDuration" type="time" min="06:00" max="23:00" step="900" v-model="event.duration" :disabled="editDuration === false || editEvent === false || event.allDay === true"> <!-- step="900" represents 15 min -->
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6" v-if="!event.allDay && !isDefaultEvent">
                <div class="w-full px-3">
                    <label class="form-label" for="event-type">
                        Type d'activité
                    </label>
                    <Multiselect class="border border-gray-400 rounded text-gray-700 h-10" id="event-type" v-model="event.type" :options="getEventTypes" :searchable="true" placeholder="Choisir un type d'activité" :disabled="editEvent === false">
                    </Multiselect>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6" v-if="!event.allDay && !isDefaultEvent">
                <div class="w-full px-3">
                    <label class="form-label" for="resp">
                        Responsable(s)
                    </label>
                    <Multiselect class="border border-gray-400 rounded text-gray-700 h-10" id="resp" v-model="event.managers" :options="getManagers" :multiple="true" :searchable="false" track-by="fullName" label="code"
                                 placeholder="Choisir au moins un responsable" :disabled="editEvent === false">
                        <template slot="option" slot-scope="{option}">{{ option.fullName }}</template>
                    </Multiselect>
                </div>
            </div>
        </template>

        <template v-slot:footer>
            <button class="form-button bg-red-600 hover:bg-red-800 mx-auto" v-if="editEvent && !addEvent" v-on:click="deleteEvent(false)">Effacer</button>
            <button class="form-button bg-green-600 hover:bg-green-800 ml-3" v-on:click="submitEvent">{{getSubmitButtonText()}}</button>
            <ConfirmDeleteEventModal v-if="showDeleteModal" v-on:cancel="showDeleteModal = false" v-on:delete="deleteEvent(true)"></ConfirmDeleteEventModal>
        </template>
    </Modal>
</template>

<script>
    'use strict';
    import { mapGetters } from 'vuex';
    import { Manager } from '../store/modules/events';
    import Modal from "../components/Modal";
    import ConfirmDeleteEventModal from "./ConfirmDeleteEventModal";
    import Multiselect from "vue-multiselect";
    let cloneDeep = require('lodash.clonedeep');

    import "vue-multiselect/dist/vue-multiselect.min.css";

    export default {
        name: "AddEventModal",
        components: {
            ConfirmDeleteEventModal,
            Multiselect,
          Modal
        },
        props: {
            editEvent: Boolean,
            editDuration: Boolean,
            addEvent: Boolean,
            isDefaultEvent: Boolean,
            propTitle: String,
            propAllDay: Boolean,
            propManagers: { // Validate if the input is a Manager (maybe to remove)
                type: Array,
                validator: function(value) {
                    for (let manager of value) {
                        if(!(manager instanceof Manager)){
                            return false;
                        }
                    }
                    return true;
                }
            },
            propType: String
        },
        computed: mapGetters(['getManagers', 'getEventTypes', 'getEventColor']),
        data() {
          return {
              event: {
                  title: this.propTitle,
                  duration: null,
                  allDay: this.propAllDay,
                  managers: this.propManagers,
                  type: this.propType,
                  isDefault: this.isDefaultEvent
              },
              showDeleteModal: false
          }
        },
        mounted: function() {
            if(this.addEvent)  {
                this.clearFields();
            }
        },
        methods: {
            close: function () {
                this.$emit('close');
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
                    this.emitEvent(eventName, this.event);
                }
                else if(this.event.title !== '' && this.event.managers.length > 0 && this.event.type !== null) {

                    if(this.editDuration){
                        if(this.allDay){
                            this.event.duration = null;
                            this.emitEvent(eventName, this.event);
                        }
                        else if (this.event.duration === null){
                            // TODO show some error message
                        }
                        else{
                            this.emitEvent(eventName, this.event);
                        }
                    }
                    else {
                        this.emitEvent(eventName, this.event);
                    }
                }
                else {
                    // TODO show some error message
                }
            },
            deleteEvent: function(confirmed) {
                if(!confirmed) {
                    console.log('Show delete modal');
                    this.showDeleteModal = true;
                }
                else{
                    this.showDeleteModal = false;
                    this.emitEvent('delete', null);
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
            },
            isShowDuration: function () {
                return this.event.allDay || !this.editDuration || this.isDefaultEvent;
            },
            emitEvent: function(eventName, eventData) {
                this.$emit(eventName, cloneDeep(eventData));
            }
        }
    }
</script>

<style scoped>
    .form-control {
        @apply m-1 flex justify-start;
    }

    .form-input {
        @apply appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight h-10;
    }

    .form-input:focus {
        @apply outline-none bg-white border-gray-500;
    }

    .form-label {
        @apply block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2;
    }

    .form-button {
        @apply shadow-lg pt-3 pb-3 mt-4 text-white rounded w-1/2;
    }
</style>

