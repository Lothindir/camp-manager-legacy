'use strict';

const state = {
    defaultEvents: [
        {
            title: "Diane",
            duration: {minutes: 15},
            extendedProps: {
                managers: [new Manager('','')],
                type: 'Diane',
                isDefaultEvent: true
            }
        },
        {
            title: "Repas",
            duration: {minutes: 60},
            color: 'IndianRed',
            extendedProps: {
                managers: [new Manager('','')],
                type: 'Repas',
                isDefaultEvent: true
            }
        },
        {
            title: "Shhhhh'Time",
            duration: {minutes: 30},
            extendedProps: {
                managers: [new Manager('','')],
                type: 'Shhhhh\'Time',
                isDefaultEvent: true
            }
        },
        {
            title: "TAPS",
            duration: {minutes: 30},
            extendedProps: {
                managers: [new Manager('','')],
                type: 'TAPS',
                isDefaultEvent: true
            }
        }
    ],
    managers: [
        new Manager('FM', 'Francesco Monti'),
        new Manager('KM', 'Katja Mosimann'),
        new Manager('OS', 'Olivia Staub'),
        new Manager('EC', 'Eléonore Cretegny'),
        new Manager('NB', 'Numa Bonhôte')
    ],
    eventTypes: [
        new EventType('Sport de Camp', 'Peru'),
        new EventType('Activité de Camp', 'SteelBlue'),
        new EventType('Vécu de Camp', 'MediumSlateBlue'),
        new EventType('CDF', 'LightSeaGreen'),
        new EventType('Repas', 'IndianRed'),
        new EventType('Social', 'ForestGreen'),
        new EventType('Divers', 'RosyBrown'),
        new EventType('Shhhhh\'Time', 'LightCoral'),
        new EventType('TAPS', 'MidnightBlue'),
        new EventType('Diane', 'RoyalBlue')
    ],
};

const getters = {
    getDefaultEvents: state => state.defaultEvents,
    getManagers: state => state.managers,
    getEventTypes: state => state.eventTypes.map(t => t.type),
    getEventColor: state => type => state.eventTypes.find(t => t.type === type).color
};

const actions = {};

const mutations = {};

function EventType(type, color) {
    this.type = type;
    this.color = color;
}

function Manager(code, fullName) {
    this.code = code;
    this.fullName = fullName;
}

export default {
    state,
    getters,
    actions,
    mutations
};
export { Manager };
