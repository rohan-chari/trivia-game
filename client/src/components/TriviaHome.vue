<template>
    <div>
        <h1>TriviaHome.vue</h1>
        <v-dialog
        transition="dialog-top-transition"
        width="auto">
            <template v-slot:activator="{ props }">
            <v-btn
                color="proceed"
                v-bind="props"
            >Quick Play</v-btn>
            </template>
            <template v-slot:default="{ isActive }">
            <v-card>
                <v-toolbar
                color="primary"
                title="Quick Play Settings"
                ></v-toolbar>
                <v-card-text>
                <div class="text-h2 pa-12">Hello world!</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                <v-btn
                    variant="text"
                    @click="isActive.value = false"
                >Close</v-btn>
                </v-card-actions>
            </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script>
import { onMounted } from 'vue';
//import axios from 'axios';

export default {
    name: 'TriviaHome',
    setup() {
        onMounted(() => {

        });
    }
};
</script>
