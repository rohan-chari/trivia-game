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
                <tr v-for="(user, index) in leaderboardData.slice(0,10)" :key="user.userId">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.userName }}</td>
                    <td>{{ user.score }}</td>
                </tr>
                <tr v-if="getUserRank > 10">
                    <td colspan="3" >.........................................................................</td>
                </tr>
                <tr v-if="getUserRank > 10">
                    <td>{{ getUserRank }}</td>
                    <td>{{ currentUserRecord.userName }}</td>
                    <td>{{ currentUserRecord.score }}</td>
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
    setup(props) {

        const currentUserRecord = computed(() => {
            return props.leaderboardData.find(user => user.userId === props.currentUserData.userId);
        });

        const getUserRank = computed(() => {
            if (!currentUserRecord.value) return 0;
            return props.leaderboardData.findIndex(user => user.userId === props.currentUserData.userId) + 1;
        });

        return {
            currentUserRecord,
            getUserRank
        };
    }
};
</script>

<style scoped>
/* Add padding to table cells */
th,
td {
    padding: 8px 16px;
    /* Adjust values as needed */
}

/* Set specific widths for each column */
th:first-child,
td:first-child {
    width: 10%;
    /* Width for Rank column */
}

th:nth-child(2),
td:nth-child(2) {
    width: 60%;
    /* Width for Name column */
}

th:last-child,
td:last-child {
    width: 30%;
    /* Width for Score column */
}

/* Optional: Add text alignment */
th,
td {
    text-align: left;
    /* You can change it to center or right as needed */
}
</style>
