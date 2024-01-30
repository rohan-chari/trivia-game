<template>
<v-container>
    <h1>{{ title }}</h1>
    <v-simple-table>
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">Rank</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Score</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in leaderboardData" :key="user.userId">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.userName }}</td>
                    <td>{{ user.score }}</td>
                </tr>
                <tr v-if="showCurrentUserRow">
                    <td>11</td>
                    <td>{{ currentUserData.userName }}</td>
                    <td>{{ currentUserData.score }}</td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</v-container>
</template>

  
<script>
import {
    computed
} from 'vue';

export default {
    name: 'LeaderBoard',
    props: {
        title: String,
        leaderboardData: Array,
        currentUserData: Object
    },
    setup() {
        const showCurrentUserRow = computed(() => {
            return false;
            //!props.leaderboardData.some(user => user.userId === props.currentUserData.userId);
        });

        return {
            showCurrentUserRow
        };
    }
};
</script>
  
  
<style scoped>
/* Add padding to table cells */
th, td {
    padding: 8px 16px; /* Adjust values as needed */
}

/* Set specific widths for each column */
th:first-child, td:first-child {
    width: 10%; /* Width for Rank column */
}
th:nth-child(2), td:nth-child(2) {
    width: 60%; /* Width for Name column */
}
th:last-child, td:last-child {
    width: 30%; /* Width for Score column */
}

/* Optional: Add text alignment */
th, td {
    text-align: left; /* You can change it to center or right as needed */
}
</style>

