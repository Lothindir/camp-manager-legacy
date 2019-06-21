<template>
    <div ref="container" class="flex flex-1 items-start align-middle ml-12 px-8 pt-4 bg-gray-600 text-gray-800">
        <div id="defaultEventsContainer" ref="defaultEventsContainer" class="border border-black bg-gray-600 mr-3 mt-20 p-1 h-auto">
            <h1>Activités de base</h1>
            <div v-for="defaultEvent in defaultEvents" class='draggable-event fc-event p-1 my-1' :data-event="getEventData(defaultEvent.title)" :key="defaultEvent.title">{{defaultEvent.title}}</div>
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
                      slot-label-interval="00:30:00"
                      nav-links="true"
                      editable="true"
                      selectable="true"
                      droppable="true"
                      event-limit="true"
                      v-on:select="selectionChanged"
                      v-on:dateClick="dateChanged"
                      :slot-label-format="slotLabelFormat"
                      :custom-buttons="customButtons"
                      :header="{
                        center: 'addEventButton',
                        right: 'weekTimeGridView, timeGridDay'
                        }"
                      :views="{
                        weekTimeGridView
                        }"
                      class="z-10"
        />
        <AddEventModal ref="addEventModal" v-show="showModal" v-on:close="showModal = false"></AddEventModal>
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
                    }
                },
                selectionInfo: null,
                selectedDate: null,
                calendar: null,
                showModal: false,
                defaultEvents: [
                    {
                        title: "Repas",
                        duration: {minutes: 60}
                    },
                    {
                        title: "TAPS",
                        duration: {minutes: 30}
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

                ipcRenderer.on('async-response-all-events', (event, arg) => {
                    for(event of arg){
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
            /* Stores the current selected dateTime */
            dateChanged: function(dateInfo) {
                this.selectionInfo = null;
                this.showModalDialog({
                    start: dateInfo.date,
                    title: 'New event',
                    color: 'red',
                    allDay: dateInfo.allDay
                });
            },
            showModalDialog: function(eventInfo){
                this.showModal = true;
                this.$refs.addEventModal.$once('submit', () => {
                    console.log('Modal submitted data');
                    this.showModal = false;
                    this.newEvent(eventInfo);
                });
            },
            clearModalDialog: function(){
                this.showModal = false;
                this.selectionInfo = null;
                this.selectedDate = null;
            },
            /* Creates a new event from the selection data */
            newEvent: function (eventInfo) {
                let event = {};
                if(this.selectionInfo !== null){
                    event = {
                        start: this.selectionInfo.start,
                        end: this.selectionInfo.end,
                        title: 'New event',
                        color: 'blue',
                        extendedProps: {
                            resp: ['FM', 'KM']
                        }
                    };
                }
                else if(eventInfo !== undefined){
                    event = {
                        start: eventInfo.start,
                        title: eventInfo.title,
                        color: eventInfo.color,
                        allDay: eventInfo.allDay,
                        extendedProps: {
                            resp: ['FM', 'KM']
                        }
                    };
                }
                this.calendar.addEvent(event);

                ipcRenderer.send('async-new-event', event);
            },
            /* Get the data-event of the corresponding defaultEvent */
            getEventData: function (title) {
                let defaultEvent = this.defaultEvents.find(e => e.title === title);
                let eventData = {
                    title: title,
                    duration: defaultEvent.duration
                };
                return JSON.stringify(eventData);
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
</style>