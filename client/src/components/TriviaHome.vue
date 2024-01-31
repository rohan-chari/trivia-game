<template>
<div>
    <p class="text-h4">Welcome, {{ userInfo.name }}</p>
    <v-row>
        <v-col class="game-select" cols="12" lg="3" md="3" xl="3" sm="12">
            <v-dialog transition="dialog-top-transition">
                <template v-slot:activator="{ props }">
                    <v-btn width="400" color="proceed" v-bind="props">Quick Play</v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                    <v-card width="500" style="margin-left:auto; margin-right: auto;">
                        <v-toolbar color="primary" title="Quick Play Settings"></v-toolbar>
                        <v-card-text>
                            <v-select label="Choose your difficulty" :items="['Elementary School', 'High School', 'College', 'Genius']" v-model="selectedDifficulty">
                            </v-select>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn variant="text" @click="isActive.value = false, selectedDifficulty = ''">Cancel</v-btn>
                            <v-btn variant="text" :disabled="!selectedDifficulty" @click="startQuickPlay">Start Game</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="game-select" cols="12" lg="3" md="3" xl="3" sm="12">
            <v-dialog transition="dialog-top-transition">
                <template v-slot:activator="{ props }">
                    <v-btn width="400" color="success" v-bind="props">Head To Head</v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                    <v-card width="500" style="margin-left:auto; margin-right: auto;">
                        <v-toolbar color="primary" title="Head To Head Settings"></v-toolbar>
                        <v-card-text>
                            <v-select label="Choose your difficulty" :items="['Elementary School', 'High School', 'College', 'Genius']" v-model="selectedDifficulty">
                            </v-select>
                            <v-combobox creatable="true" v-model="selectedSubject" label="Choose your subject" :items="subjectDropdown"></v-combobox>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn variant="text" @click="isActive.value = false, selectedDifficulty = '', selectedSubject=''">Cancel</v-btn>
                            <v-btn variant="text" :disabled="!selectedDifficulty || !selectedSubject" @click="startHeadToHead">Start Game</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </v-col>
    </v-row>

    <v-row class="leaderboard-header text-h2">
        <h1>QuickPlay Leaderboards</h1>
    </v-row>
    <v-row>
        <v-col cols="12" lg="3" md="3" xl="3" sm="12">
            <LeaderBoard :currentUserData="userInfo" :leaderboardData="quickPlayElemSchoolLeaderboard" :title="'Elementary School'"></LeaderBoard>
        </v-col>
        <v-col cols="12" lg="3" md="3" xl="3" sm="12">
            <LeaderBoard :currentUserData="userInfo" :leaderboardData="quickPlayHighSchoolLeaderboard" :title="'High School'"></LeaderBoard>
        </v-col>
        <v-col cols="12" lg="3" md="3" xl="3" sm="12">
            <LeaderBoard :currentUserData="userInfo" :leaderboardData="quickPlayCollegeLeaderboard" :title="'College'"></LeaderBoard>
        </v-col>
        <v-col cols="12" lg="3" md="3" xl="3" sm="12">
            <LeaderBoard :currentUserData="userInfo" :leaderboardData="quickPlayGeniusLeaderboard" :title="'Genius'"></LeaderBoard>
        </v-col>
    </v-row>
</div>
</template>

<script>
import {
    onMounted,
    ref
} from 'vue';
import LeaderBoard from './LeaderBoard.vue';
import axios from 'axios';
export default {
    name: 'TriviaHome',
    components: {
        LeaderBoard
    },
    setup() {
        const selectedDifficulty = ref('');
        const selectedSubject = ref('')

        //leaderboards
        const quickPlayElemSchoolLeaderboard = ref([]);
        const quickPlayHighSchoolLeaderboard = ref([]);
        const quickPlayCollegeLeaderboard = ref([]);
        const quickPlayGeniusLeaderboard = ref([]);

        const userInfo = ref(null);

        const subjectDropdown = ref([])

        const startQuickPlay = async () => {
            if (!selectedDifficulty.value) return;
            window.location.href = `/QuickPlay/${selectedDifficulty.value}`;
        };
        const startHeadToHead = async () => {
            if (!selectedDifficulty.value) return;
            if (!selectedSubject.value) return;

            //checking to see how many questions exist for topic
            const response = await axios.get('/api/HeadToHead/start', {
                params: {
                    difficulty: selectedDifficulty.value,
                    subject: selectedSubject.value,
                    filter: false
                }
            });
            console.log(response.data.length)
            //if there are less than 25 questions, we will create 10
            if (response.data.length < 30) {
                await axios.post('/api/HeadToHead/start', {
                    difficulty: selectedDifficulty.value,
                    subject: selectedSubject.value
                });
            }

            window.location.href = `/HeadToHead/${selectedDifficulty.value}/${selectedSubject.value}`;
        };

        const getHeadToHeadSubjects = async () => {
            try {
                const response = await axios.get('/api/subject/autocomplete');
                return response.data;
            } catch (error) {
                console.error('Error fetching subject dropdown:', error);
            }
        };

        const getLeaderboards = async () => {
            try {
                const response = await axios.get('/api/leaderboard/quickplay/scores');
                quickPlayElemSchoolLeaderboard.value = response.data.elementarySchool
                quickPlayHighSchoolLeaderboard.value = response.data.highSchool
                quickPlayCollegeLeaderboard.value = response.data.college
                quickPlayGeniusLeaderboard.value = response.data.genius
            } catch (error) {
                console.error('Error fetching subject dropdown:', error);
            }
        };

        onMounted(async () => {
            try {
                //redirect if not authenticated
                const response = await axios.get('/api/auth-status');
                if (!response.data.userId) {
                    window.location.href = `/`;
                } else {
                    subjectDropdown.value = await getHeadToHeadSubjects();
                    userInfo.value = response.data;
                    console.log('LOOK FOR ME', userInfo.value.userId);
                    getLeaderboards();
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        });

        return {
            selectedDifficulty,
            selectedSubject,
            startQuickPlay,
            startHeadToHead,
            subjectDropdown,
            userInfo,
            quickPlayElemSchoolLeaderboard,
            quickPlayHighSchoolLeaderboard,
            quickPlayCollegeLeaderboard,
            quickPlayGeniusLeaderboard
        };
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

.text-h4 {
    margin-top: 10px;
    font-family: "Rubik", sans-serif;
    font-size: 4rem !important;
    margin-bottom:20px;
}

.game-select {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    align-items: center;
}

.leaderboard-header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Rubik", sans-serif;
    font-size: 2rem !important;
    width: 100%;
}

.v-btn {
    font-size: large;
    border-radius: 20px;
    font-family: "Rubik", sans-serif;
}
</style>
