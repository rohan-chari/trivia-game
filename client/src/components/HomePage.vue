<template>
<div>
    <img src="../images/trivAI-logo.png">

    <p class="text-h3">Challenge your friends and show off your trivia skills with TrivAI.</p>
    <p class="text-subtitle-1">TrivAI is the ultimate trivia game that brings competition to a whole new level. Test your knowledge, compete against friends, and earn bragging rights as the trivia champion. Get ready to have endless fun and learn something new every time you play.</p>
    <div class="action-buttons">
        <v-row class="d-flex align-center justify-center button-font">
            <v-col cols="12" lg="3" md="3" xl="3" sm="12">
                <v-btn height="75" class="button-styling" href="/login" color="proceed"> Create Account / Login </v-btn>
            </v-col>
        </v-row>
        <v-row class="d-flex align-center justify-center button-font">
            <v-col cols="12" lg="3" md="3" xl="3" sm="12">
                <v-btn height="75" class="button-styling" @click="scrollAnimation" color="info"> More Information </v-btn>
            </v-col>
        </v-row>
    </div>
    <div class="feature-list">
        <v-row id="features" class="d-flex align-center justify-center">
            <v-col cols="12" lg="8" md="8" xl="8" sm="12">
                <div class="feature-list">
                    <div>img goes here</div>
                    <p class="text-subtitle-1">TrivAI is the ultimate trivia game that brings competition to a whole new level. Test your knowledge, compete against friends, and earn bragging rights as the trivia champion. Get ready to have endless fun and learn something new every time you play.</p>
                </div>
            </v-col>
        </v-row>
    </div>
</div>
</template>

<script>

export default {
    name: 'QuickPlay',
    setup() {


        const scrollAnimation = () => {
            document.getElementById('features').scrollIntoView({behavior:'smooth'});
        };

        return {
            scrollAnimation
        };
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

.text-h3 {
    font-family: "Rubik", sans-serif;
    font-weight: 600;
    margin-bottom: 20px;
}

.text-subtitle-1 {
    font-family: "Rubik", sans-serif;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
}

.feature-list {
    margin-top: 150px;
    display: flex;
    font-family: "Rubik", sans-serif;
    height:400px;
}

.button-font {
    margin-top: 20px;
    font-family: "Rubik", sans-serif;
    font-size: x-large;
}

.v-btn {
    font-size: large;
    border-radius: 20px;
    width: 400px;
}

img {
    width: 300px;
    height: 150px;
}

.action-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 300px;
}
</style>
