<template>
    <div>
        <img src="../images/trivAI-logo.png">
        <v-card
            width="600"
            class="login-card"
            title="Welcome to TrivAI"
            subtitle="The best new way to take your trivia knowledge to the next level!"
            text="This is content"
            color="white">
                <v-row class="d-flex align-center justify-center">
                    <v-col cols="auto"> <v-btn color="proceed"> Create Account / Login </v-btn> </v-col>
                </v-row>
                <v-row class="d-flex align-center justify-center">
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
h1{
    color: rgb(255, 255, 255);
    text-shadow: 2px 2px 2px black;
}
.login-card{
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 40px;
}
</style>