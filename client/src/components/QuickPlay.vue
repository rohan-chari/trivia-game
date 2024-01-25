<template>
<div>
    <h1>QuickPlay.vue</h1>
    <div v-if="allTriviaQuestions && allTriviaQuestions.length > 0">
        <p class="text-h3">{{ currentQuestion.question }}</p>
        <v-row justify="center">
            <v-col cols="12" lg="3" md="3" xl="3" sm="12" v-for="(answer, index) in currentQuestion.choices.slice(0, 2)" :key="index">
                <v-btn color="proceed" block @click="selectAnswer(answer)">{{ answer }}</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" lg="3" md="3" xl="3" sm="12" v-for="(answer, index) in currentQuestion.choices.slice(2, 4)" :key="index + 2">
                <v-btn color="proceed" block @click="selectAnswer(answer)">{{ answer }}</v-btn>
            </v-col>
        </v-row>
    </div>
    <div v-else>
        Loading questions...
    </div>
</div>
</template>

<script>
import {onMounted,ref} from 'vue';
import axios from 'axios';
import {useRoute} from 'vue-router';

export default {
    name: 'QuickPlay',
    setup() {
        const route = useRoute();
        const difficulty = ref(route.params.difficulty);
        const allTriviaQuestions = ref([]);
        const currentQuestionIndex = ref(0);

        const currentQuestion = ref({});

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
            if (answer == currentQuestion.value.answer) {
                console.log('you got the answer correct!')
            }
            // Move to next question
            if (currentQuestionIndex.value < allTriviaQuestions.value.length - 1) {
                currentQuestionIndex.value++;
                currentQuestion.value = allTriviaQuestions.value[currentQuestionIndex.value];
            } else {
                // Logic for when all questions have been answered
            }
        };

        onMounted(async () => {
            await fetchTriviaQuestion();
        });

        return {
            difficulty,
            currentQuestion,
            selectAnswer,
            allTriviaQuestions
        };
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
.text-h3{
    font-family: "Rubik",sans-serif;
    font-weight: 600;
    margin-bottom: 20px;
}
.answer-choices{
    margin-left:auto;
    margin-right: auto;
}
</style>
