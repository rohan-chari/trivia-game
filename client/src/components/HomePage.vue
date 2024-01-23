<template>
    <div>
        <img src="../images/trivAI-logo.png">
        <v-card
            width="840"
            class="login-card"
            color="white">
            <p class="text-h3">Put your trivia knowledge to the</p>
            <p class="text-h3">test and level up with TrivAI.</p>
            <p class="text-subtitle-1">Challenge your friends or play against AI opponents in trivia battles that will push your knowledge to new heights. With TrivAI, the next level of trivia competition is just a tap away.</p>
            <v-row class="action-buttons d-flex align-center justify-center">
                <v-col cols="auto"> <v-btn href="/login" color="proceed"> Create Account / Login </v-btn> </v-col>
                <v-col cols="auto">
                    <v-btn color="info"> More Information </v-btn>
                </v-col>
            </v-row>
        </v-card>
        
    </div>
</template>
<script>
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
.text-h3{
    font-family: "Rubik",sans-serif;
    font-weight: 600;
    margin-bottom: 20px;
}
h1{
    color: rgb(255, 255, 255);
    text-shadow: 2px 2px 2px black;
}
.login-card{
    border-radius: 20px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 40px;
    padding-top: 40px;
    padding-left: 30px;
    padding-right:30px
}
.action-buttons{
    margin-top:10px;
}

img{
    width:300px;
    height: 150px;
}
</style>