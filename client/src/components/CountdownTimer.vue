<template>
<v-container>
    <v-row>
        <v-col cols="12" md="6">
            <p class="text-h3">Points Available</p>
            <p class="text-h5">{{ pointsLeft }}</p>
        </v-col>

        <v-col cols="12" md="6">
            <div class="timer-container">
                <svg class="progress-ring" width="120" height="120">
                    <circle class="progress-ring__circle" stroke="black" stroke-width="6" fill="transparent" r="52" cx="60" cy="60" :stroke-dasharray="circumference" :stroke-dashoffset="strokeDashoffset" />
                </svg>
                <div class="timer">{{ timeLeft }}</div>
            </div>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import {
    ref,
    watch,
    onMounted,
    onUnmounted,
    defineExpose
} from 'vue';

export default {
    setup(props, {
        emit
    }) {
        const totalTime = 10; // 10 seconds
        const timeLeft = ref(totalTime);
        const radius = 52;
        const circumference = radius * 2 * Math.PI;
        let timer = null;

        const totalPointsAvailable = 1000;
        const pointsLeft = ref(totalPointsAvailable)

        const strokeDashoffset = ref(circumference);

        const updateCircle = () => {
            strokeDashoffset.value = circumference - (timeLeft.value / totalTime) * circumference;
        };

        const startTimer = () => {
            pointsLeft.value = totalPointsAvailable;
            timeLeft.value = totalTime;
            clearInterval(timer);
            timer = setInterval(() => {
                if (timeLeft.value > 0) {
                    timeLeft.value--;
                    if(timeLeft.value < totalTime * .8){
                        if(timeLeft.value % 2 == 0){
                            pointsLeft.value-=200;
                        }
                    }
                    
                } else {
                    clearInterval(timer);
                    emit('timer-expire');
                    resetTimer();
                    // Emit event to parent component
                    // Example: this.$emit('time-up');
                }
            }, 1000);
        };

        const resetTimer = () => {
            clearInterval(timer);
            timeLeft.value = totalTime;
            pointsLeft.value = totalPointsAvailable;
            startTimer();
        };

        const getAvailableScore = () => {
            emit('score-to-add',pointsLeft.value);
        }

        onMounted(() => {
            startTimer();
        });

        onUnmounted(() => {
            clearInterval(timer);
        });

        watch(timeLeft, () => {
            console.log('updateCircle')
            updateCircle();
        });

        defineExpose({
            resetTimer,
            getAvailableScore
        });

        return {
            timeLeft,
            strokeDashoffset,
            startTimer,
            resetTimer,
            circumference,
            pointsLeft,
            getAvailableScore
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

.text-h5 {
    font-family: "Rubik", sans-serif;
}

.timer-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.timer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px; /* Adjust font size as needed */
}

.progress-ring__circle {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
}


</style>
