<template>
    <div ref="container" class="flex flex-1 items-start align-middle ml-12 px-2 pt-4 bg-gray-600 text-gray-800">
        <div id="defaultEventsContainer" ref="defaultEventsContainer" :style="this.editCalendar ? '' : 'border-color: transparent'" class="flex justify-center flex-col border border-black bg-gray-600 mr-3 mt-20 p-1 h-auto">
            <div class="flex justify-center items-center w-32">
                <input class="p-1" type="checkbox" name="editCheckbox" id="editCheckbox" v-model="editCalendar">
                <label class="px-1 text-lg block uppercase tracking-wide text-gray-800 font-bold" for="editCheckbox">Modifier</label>
            </div>
            <transition name="edit-menu">
                <div v-if="editCalendar">
                    <div class="border border-black p-1 m-1">
                        <h1 class="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2">Activités de base</h1>
                        <div v-for="defaultEvent in defaultEvents" class='draggable-event fc-event p-1 my-1' :style="getEventBackgroundColor(defaultEvent.title)" :data-event="getEventData(defaultEvent.title)" :key="defaultEvent.title">{{defaultEvent.title}}</div>
                    </div>

                    <div class="border border-black p-1 m-1">
                        <label class="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2" for="slotDuration">Intervalle de temps</label>
                        <select v-model="slotDuration" name="slotDuration" id="slotDuration">
                            <option v-for="slotDuration in slotDurations" :value="slotDuration.value" :key="slotDuration.value">{{ slotDuration.text }}</option>
                        </select>
                    </div>
                </div>
            </transition>
        </div>
        <FullCalendar id="calendar" ref="calendar"
                      v-resize="changeCalendarHeight"
                      defaultView="weekTimeGridView"
                      :default-date="firstDay"
                      :height="calendarHeight"
                      :plugins="calendarPlugins"
                      :locale="locale"
                      all-day-text="Chef de jour"
                      min-time="06:00:00"
                      max-time="23:30:00"
                      nav-links="true"
                      :editable="editCalendar"
                      selectable="true"
                      droppable="true"
                      event-limit="true"
                      :slot-duration="slotDuration"
                      force-event-duration="true"
                      v-on:select="selectionChanged"
                      v-on:dateClick="dateChanged"
                      v-on:eventReceive="eventDropped"
                      v-on:eventDrop="updateEventPosition"
                      v-on:eventResize="updateEventDuration"
                      :slot-label-format="slotLabelFormat"
                      :custom-buttons="customButtons"
                      :header="{
                        center: 'addEventButton, clearAllEvents',
                        right: 'weekTimeGridView, timeGridDay'
                        }"
                      :views="{
                        weekTimeGridView
                        }"
                      class="z-10"
        />
        <AddEventModal ref="addEventModal" v-show="showModal" v-on:close="showModal = false" v-on:submit="addModalEvent"></AddEventModal>
    </div>
</template>

<script>
    import resize from 'vue-resize-directive'

    import FullCalendar from '@fullcalendar/vue';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
    import frLocale from '../assets/js/cm-fr';
    import AddEventModal from "../components/AddEventModal";

    const { ipcRenderer } = require('electron');


    export default {
        name: 'home',
        directives: {
            resize
        },
        components: {
            AddEventModal,
            FullCalendar
        },
        data() {
            return {
                calendarPlugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
                locale: frLocale,
                slotLabelFormat: {
                    hour: 'numeric',
                    minute: '2-digit',
                    omitZeroMinute: false,
                    meridiem: 'short'
                },
                weekTimeGridView: {
                    type: 'timeGrid',
                    duration: { days: this.campDuration},
                    buttonText: 'Semaine'
                },
                calendarHeight: this.getCalendarHeight(),
                customButtons: {
                    addEventButton: {
                        text: "Nouvelle activité",
                        click: this.showModalDialog
                    },
                    clearAllEvents: {
                        text: "Effacer tout",
                        click: this.clearAllEvents
                    }
                },
                selectionInfo: null,
                selectedDate: null,
                calendar: null,
                showModal: false,
                editCalendar: false,
                slotDurations: [
                    { value: "00:15:00", text: "15 minutes" },
                    { value: "00:30:00", text: "30 minutes" },
                    { value: "01:00:00", text: "1 heure" }
                ],
                slotDuration: "00:30:00",
                defaultEvents: [
                    {
                        title: "Diane",
                        duration: {minutes: 15},
                        color: "RoyalBlue"
                    },
                    {
                        title: "Repas",
                        duration: {minutes: 60},
                        color: "IndianRed",
                    },
                    {
                        title: "Shhhhh'Time",
                        duration: {minutes: 30},
                        color: "LightCoral"
                    },
                    {
                        title: "TAPS",
                        duration: {minutes: 30},
                        color: "MidnightBlue"
                    }
                ]
            }
        },
        props: {
            firstDay: String,
            campDuration: Number
        },
        created() {
            this.weekTimeGridView.duration.days = 6;
            this.firstDay = '2019-07-15';
        },
        mounted() {
            this.$nextTick(() => {
                this.calendar = this.$refs.calendar.getApi();

                ipcRenderer.on('async-response-all-events', (ev, arg) => {
                    for(let event of arg){
                        this.calendar.addEvent(event);
                    }
                });

                /*   Makes all the default events draggable in the calendar   */
                let container = document.getElementById('defaultEventsContainer');
                new Draggable(container, {
                    itemSelector: '.draggable-event'
                });

                ipcRenderer.send('async-request-all-events');
            });
        },
        methods: {
            /* Retrieves the calendar current height */
            getCalendarHeight: function () {
                if(this.$refs.container !== undefined) {
                    return this.$refs.container.clientHeight - 32;
                }
                else {
                    return 0;
                }
            },
            /* Changes the calendar's height according to the current computed height */
            changeCalendarHeight: function () {
                this.calendarHeight = this.getCalendarHeight();
            },
            /* Stores the current selection */
            selectionChanged: function (selectionInfo) {
                this.selectionInfo = selectionInfo;
            },
            dateChanged: function(dateInfo) {
                this.selectionInfo = null;
                this.showModalDialog({
                    start: dateInfo.date,
                    title: 'New click',
                    color: 'red',
                    allDay: dateInfo.allDay
                });
            },
            /* Stores the current selected dateTime */
            eventDropped: function(info){
                this.selectionInfo = null;
                this.selectedDate = null;

                ipcRenderer.send('async-new-event', this.normalizeEventObject(info.event));
            },
            updateEventPosition: function(eventDropInfo){
                console.log(this.normalizeEventObject(eventDropInfo.oldEvent));
                ipcRenderer.send('async-replace-event', { old: this.normalizeEventObject(eventDropInfo.oldEvent), new: this.normalizeEventObject(eventDropInfo.event)});
                console.log('Sent moved event');
            },
            updateEventDuration: function(eventResizeInfo){
                ipcRenderer.send('async-replace-event', { old: this.normalizeEventObject(eventResizeInfo.prevEvent), new: this.normalizeEventObject(eventResizeInfo.event)});
                console.log('Sent resized event');
            },
            showModalDialog: function(eventInfo){
                if(this.editCalendar === true) {
                    this.showModal = true;
                    this.$refs.addEventModal.$once('submit', () => {
                        console.log('Modal submitted data');
                        this.showModal = false;
                        this.newEvent(eventInfo);
                    });
                }
            },
            addModalEvent: function(event) {
                //event.title;
            },
            clearModalDialog: function(){
                this.showModal = false;
                this.selectionInfo = null;
                this.selectedDate = null;
            },
            clearAllEvents: function(){
                if(this.calendar !== undefined) {
                    if(this.calendar.getEvents() !== undefined) {
                        this.calendar.getEvents().forEach(e => e.remove());
                        ipcRenderer.send('async-clear-all-events');
                    }
                }
            },
            /* Creates a new event from the selection data */
            newEvent: function (eventInfo) {
                let event = {};
                if(this.selectionInfo !== null){
                    console.log('Adding selection event');
                    event = {
                        allDay: this.selectionInfo.allDay,
                        start: this.selectionInfo.start,
                        end: this.selectionInfo.end,
                        title: 'New button',
                        color: 'blue',
                        extendedProps: {
                            resp: ['FM', 'KM']
                        }
                    };
                }
                else if(eventInfo !== undefined){
                    console.log('Adding eventInfo');
                    event = {
                        start: eventInfo.start,
                        end: eventInfo.end,
                        title: eventInfo.title,
                        color: eventInfo.color,
                        allDay: eventInfo.allDay,
                        extendedProps: {
                            resp: ['FM', 'KM']
                        }
                    };
                }
                let generatedEvent = this.calendar.addEvent(event);

                ipcRenderer.send('async-new-event', this.normalizeEventObject(generatedEvent));
            },
            /* Get the data-event of the corresponding defaultEvent */
            getEventData: function (title) {
                let defaultEvent = this.defaultEvents.find(e => e.title === title);
                return JSON.stringify(defaultEvent);
            },
            getEventBackgroundColor: function(title){
                let defaultEvent = this.defaultEvents.find(e => e.title === title);
                return 'background-color: ' + defaultEvent.color + '; border-color: ' + defaultEvent.color + ';';
            },
            normalizeEventObject: function (EventObject) {
                return {
                    start: EventObject.start,
                    end: EventObject.end,
                    title: EventObject.title,
                    allDay: EventObject.allDay,
                    backgroundColor: EventObject.backgroundColor !== undefined ? EventObject.backgroundColor : EventObject.color,
                    borderColor: EventObject.borderColor !== undefined ? EventObject.borderColor : EventObject.color,
                    extendedProps: EventObject.extendedProps
                };
            }
        }
    }
</script>

<style scoped>
    @import "~@fullcalendar/core/main.css";
    @import "~@fullcalendar/daygrid/main.css";
    @import "~@fullcalendar/timegrid/main.css";

    ::-webkit-scrollbar {
        background-color: rgba(0, 0, 0, 0);
    }

    .draggable-event {
        @apply bg-blue-500 cursor-move text-center;
    }

    .draggable-event:hover {
        @apply bg-blue-400;
    }

    .edit-menu-enter,
    .edit-menu-leave-active {
        opacity: 0;
    }

    .edit-menu-enter-active,
    .edit-menu-leave-active {
        transition: opacity .5s ease;
    }
</style>