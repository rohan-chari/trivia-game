<template>
<div class="timer-container">
    <svg class="progress-ring" width="120" height="120">
        <circle class="progress-ring__circle" stroke="black" stroke-width="6" fill="transparent" r="52" cx="60" cy="60" :stroke-dasharray="circumference" :stroke-dashoffset="strokeDashoffset" />
    </svg>
    <div class="timer">{{ timeLeft }}</div>
</div>
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

        const strokeDashoffset = ref(circumference);

        const updateCircle = () => {
            strokeDashoffset.value = circumference - (timeLeft.value / totalTime) * circumference;
        };

        const startTimer = () => {
            timeLeft.value = totalTime;
            clearInterval(timer);
            timer = setInterval(() => {
                if (timeLeft.value > 0) {
                    timeLeft.value--;
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
            startTimer();
        };

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

        defineExpose({ resetTimer });

        return {
            timeLeft,
            strokeDashoffset,
            startTimer,
            resetTimer,
            circumference,
        };
    }
};
</script>

<style>
.timer-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.progress-ring__circle {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
}

.timer {
    position: absolute;
}
</style>
