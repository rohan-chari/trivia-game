<template>
<div>
    <h1>QuickPlay.vue</h1>
    <v-row>
        <v-col cols="12" md="8">
            <CountdownTimer ref="countdownTimerRef" @score-to-add="addScoreToTotal" @timer-expire="nextQuestionTimeExpiry" />
        </v-col>
        <v-col cols="12" md="4">
            <p class="text-h3">Current Score</p>
            <p class="text-h5">{{ totalScore }}</p>
        </v-col>
    </v-row>
    <div v-if="allTriviaQuestions && allTriviaQuestions.length > 0">
        <p class="text-h3">{{ currentQuestion.question }}</p>
        <v-row justify="center">
            <v-col cols="12" lg="3" md="3" xl="3" sm="12" v-for="(answer, index) in currentQuestion.choices.slice(0, 2)" :key="index">
                <v-btn :disabled="questionAnsweredDisabled" :color="getButtonColors(answer)" block @click="selectAnswer(answer)">{{ answer }}</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" lg="3" md="3" xl="3" sm="12" v-for="(answer, index) in currentQuestion.choices.slice(2, 4)" :key="index + 2">
                <v-btn :disabled="questionAnsweredDisabled" :color="getButtonColors(answer)" block @click="selectAnswer(answer)">{{ answer }}</v-btn>
            </v-col>
        </v-row>
    </div>
    <div v-else>
        Loading questions...
    </div>
</div>
</template>

<script>
import {
    onMounted,
    ref
} from 'vue';
import axios from 'axios';
import {
    useRoute
} from 'vue-router';
import CountdownTimer from './CountdownTimer.vue';

export default {
    components: {
        CountdownTimer
    },
    name: 'QuickPlay',
    setup() {
        const route = useRoute();
        const difficulty = ref(route.params.difficulty);
        const allTriviaQuestions = ref([]);
        const currentQuestionIndex = ref(0);

        const questionAnsweredDisabled = ref(false);

        const totalScore = ref(0);

        const userInfo = ref(null);

        const currentQuestion = ref({});

        const countdownTimerRef = ref(null);

        const answerSelected = ref(false);

        const callResetTimer = () => {
            if (countdownTimerRef.value) {
                countdownTimerRef.value.resetTimer();
            }
        };

        const getAvailableScore = () => {
            if (countdownTimerRef.value) {
                countdownTimerRef.value.getAvailableScore();
            }
        }

        const addScoreToTotal = (score) => {
            console.log('emitted score', score)
            totalScore.value += score;
        }

        const fetchTriviaQuestion = async () => {
            try {
                const response = await axios.get('/api/quickplay/start', {
                    params: {
                        difficulty: difficulty.value
                    }
                });
                allTriviaQuestions.value = response.data;
                currentQuestion.value = allTriviaQuestions.value[currentQuestionIndex.value];
            } catch (error) {
                console.error('Error fetching trivia question:', error);
            }
        };

        const selectAnswer = (answer) => {
            // Logic to check if the answer is correct
            answerSelected.value = true;
            questionAnsweredDisabled.value = true;
            if (answer == currentQuestion.value.answer) {
                console.log('you got the answer correct!')
                console.log('available score!', getAvailableScore());
            }
        };

        const nextQuestionTimeExpiry = async () => {
            if (currentQuestionIndex.value < allTriviaQuestions.value.length - 1) {
                callResetTimer();
                currentQuestionIndex.value++;
                currentQuestion.value = allTriviaQuestions.value[currentQuestionIndex.value];
                answerSelected.value = false;
                questionAnsweredDisabled.value = false;
            } else {
                // Logic for when all questions have been answered
                try {
                    await axios.post('/api/leaderboard/quickplay/scores', {
                        userId: userInfo.value.userId,
                        score: totalScore.value,
                        userName: userInfo.value.name,
                        difficulty: difficulty.value,
                        mode: 'quickplay'
                    });
                    window.location.href = `/TriviaHome`;

                } catch (error) {
                    console.error('Error fetching trivia question:', error);
                }
            }
        };

        const getButtonColors = (answer) => {
            if (answerSelected.value == false) {
                return 'proceed'
            }
            if (answer === currentQuestion.value.answer && answerSelected.value == true) {
                // Correct answer
                return 'green';
            } else {
                return 'red'
            }
        }

        onMounted(async () => {
            await fetchTriviaQuestion();

            try {
                //redirect if not authenticated
                const response = await axios.get('/api/auth-status');
                if (!response.data.userId) {
                    window.location.href = `/`;
                } else {
                    userInfo.value = response.data
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        });

        return {
            difficulty,
            currentQuestion,
            selectAnswer,
            allTriviaQuestions,
            userInfo,
            countdownTimerRef,
            CountdownTimer,
            nextQuestionTimeExpiry,
            getButtonColors,
            addScoreToTotal,
            totalScore,
            questionAnsweredDisabled
        };
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

.text-h3 {
    font-family: "Rubik", sans-serif;
    font-weight: 600;
    margin-bottom: 20px;
}

.answer-choices {
    margin-left: auto;
    margin-right: auto;
}

.text-h5 {
    font-family: "Rubik", sans-serif;
}
</style>
