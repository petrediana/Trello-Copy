<template>
    <div class="boards-container">
        <div>
            Starred
            <b-list-group horizontal>
                <b-list-group-item button variant="primary"
                    v-for="(starredUserBoard, index) in this.starredUserBoards"
                    :key="index"
                >
                    <Board :board="starredUserBoard" />
                </b-list-group-item>
            </b-list-group>
        </div>
        
        <div class>
            All boards
            <b-list-group horizontal>
                <b-list-group-item button variant="primary"
                    v-for="(userBoard, index) in this.userBoards"
                    :key="index"
                >
                    <Board :board="userBoard" />
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
import BoardStore from '../stores/BoardStore.js'
import Board from '../components/Board.vue'

export default {
    props: {
        currentUserId: String,
        currentUserName: String
    },

    components: {
        Board
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

<style>

</style>