<template>
<div>
    <h1>TriviaHome.vue</h1>
    <v-dialog transition="dialog-top-transition" width="auto">
        <template v-slot:activator="{ props }">
            <v-btn color="proceed" v-bind="props">Quick Play</v-btn>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card width="500">
                <v-toolbar color="primary" title="Quick Play Settings"></v-toolbar>
                <v-card-text>
                    <v-select label="Choose your difficulty" :items="['Elementary School', 'High School', 'College', 'Genius']" v-model="selectedDifficulty">
                    </v-select>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn variant="text" @click="isActive.value = false, selectedDifficulty = ''">Cancel</v-btn>
                    <v-btn variant="text" :disabled="!selectedDifficulty" @click="startGame">Start Game</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios'
export default {
    name: 'TriviaHome',
    setup() {
        const selectedDifficulty = ref('');

        const startGame = async () => {
            if (!selectedDifficulty.value) return;

            try {
                // Post the difficulty level to your backend
                await axios.post('/api/quickplay/start', { difficulty: selectedDifficulty.value });
                // Redirect handled by backend, or manually redirect here if needed
                // window.location.href = '/QuickPlay';
            } catch (error) {
                console.error('Error starting game:', error);
            }
        };

        return {
            selectedDifficulty,
            startGame
        };
    }
};
</script>
