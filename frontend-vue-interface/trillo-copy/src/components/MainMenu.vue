<template>
    <div>
        This is the main menu for {{ this.currentUserId }}

        <div>
            Starred
            <p v-for="(starredUserBoard, index) in this.starredUserBoards" :key="index">
                {{ starredUserBoard }}
            </p>
        </div>
        
        <div>
            All boards
            <p v-for="(userBoard, index) in this.userBoards" :key="index">
                {{ userBoard }}
            </p>
        </div>
    </div>
</template>

<script>
import BoardStore from '../stores/BoardStore.js'

export default {
    props: {
        currentUserId: String,
        currentUserName: String
    },

    data() {
        return {
            userBoards: [],
            starredUserBoards: []
        }
    },

    mounted() {
        console.log('MainMenu component mounted')
        const boardStore = new BoardStore()
        boardStore.getAllBoardsForUser(this.currentUserId)
        this.userBoards = boardStore.userAllBoardsFromDb

        boardStore.getAllStarredBoardsForUser(this.currentUserId)
        this.starredUserBoards = boardStore.userAllStarredBoardsFromDb
    }
}
</script>