<template>
    <div ref="container" class="flex ml-12 px-8 pt-4 bg-gray-600 text-gray-800">
<!--        <div class="w-40 border border-black bg-gray-600 min-h-full"></div>-->
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
                      :slot-label-format="slotLabelFormat"
                      :header="{
                        right: 'weekTimeGridView, timeGridDay'
                        }"
                      :views="{
                        weekTimeGridView
                        }"
                      :events="events"
        />
    </div>
</template>

<script>
    import resize from 'vue-resize-directive'

    import FullCalendar from '@fullcalendar/vue';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interaction from '@fullcalendar/interaction';
    import frLocale from '../assets/js/cm-fr'

    export default {
        name: 'home',
        directives: {
            resize
        },
        components: {
            FullCalendar
        },
        data() {
            return {
                calendarPlugins: [ dayGridPlugin, timeGridPlugin, interaction ],
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
                /*events: [
                    {
                        title: 'Francesco',
                        start: '2019-07-15'
                    },
                    {
                        title: 'SC 1.1 Marche',
                        start: '2019-07-15T08:00:00',
                        end: '2019-07-15T12:00:00'
                    },
                    {
                        title: 'Pic-nic',
                        start: '2019-07-15T12:00:00',
                        end: '2019-07-15T13:00:00'
                    }
                ]*/
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
        methods: {
            getCalendarHeight: function () {
                if(this.$refs.container !== undefined) {
                    return this.$refs.container.clientHeight - 32;
                }
                else {
                    return 0;
                }
            },
            changeCalendarHeight: function () {
                this.calendarHeight = this.getCalendarHeight();
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
</style>