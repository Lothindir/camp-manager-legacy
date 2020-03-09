<template>
    <router-link to="/profile" class="absolute bottom-0 w-full mb-4" v-on:click="this.$router.push('\profile')">
        <div v-bind:class="(isOpen ? 'px-4 py-2' : 'px-2 py-1')" class="flex items-center text-gray-500 cursor-pointer hover:bg-gray-700">
            <svg v-bind:class="(isOpen ? 'mr-3' : '')" class="flex align-middle items-center" :width="(isOpen ? '40px' : '30px')" :height="(isOpen ? '40px' : '30px')" >
                <circle class="fill-current text-gray-500" fill-rule="nonzero" :cx="(isOpen ? '20px' : '15px')" :cy="(isOpen ? '20px' : '15px')" :r="(isOpen ? '20px' : '15px')"></circle>
            </svg>
            <p v-bind:class="(isOpen ? 'text-lg w-10' : 'text-sm w-7')" class="fixed text-center text-gray-900">{{initials}}</p>
            <div v-if="isOpen" class="text-gray-500 text-lg">{{fullName}}</div>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: "ProfileMenu",
        props: {
            firstName: String,
            lastName: String,
            isOpen: Boolean
        },
        computed: {
            fullName: function () {
                return this.firstName + ' ' + this.lastName;
            },
            initials: function () {
                return this.getFirstChar(this.firstName) + this.getFirstChar(this.lastName);
            }
        },
        methods: {
            getFirstChar: function (name) {
                return name.toString().toUpperCase().charAt(0);
            }
        }
    }
</script>

<style scoped>

</style>