<template>
    <div>
        <h1>TriviaHome.vue</h1>
    </div>
</template>

<script>
import { onMounted } from 'vue';
//import axios from 'axios';

export default {
    name: 'TriviaHome',
    setup() {
        onMounted(() => {
            /*axios.get('/api/auth-status')
                .then(response => {
                    if (!response.data.isAuthenticated) {
                        // If not authenticated, redirect to login or show a message
                        // Example: this.$router.push('/login');
                        console.log('User is not authenticated');
                    } else {
                        // User is authenticated, perform actions or show content
                        console.log('User is authenticated');
                    }
                })
                .catch(error => {
                    console.error('Error checking authentication status:', error);
            });*/
        });
    }
};
</script>
