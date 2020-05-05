<template>
    <div class="boards-container" v-if="selectedBoardId === null">
        <div>
            Starred
            <b-list-group horizontal>
                <b-list-group-item button variant="primary"
                    v-for="(starredUserBoard, index) in this.starredUserBoards"
                    :key="index"
                    @click="handleListItemClick(starredUserBoard)"
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
                    @click="handleListItemClick(userBoard)"
                >
                    <Board :board="userBoard" />
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>

    <div v-else>
        <NoteList
            :currentBoardId="this.selectedBoardId"
            :currentBoardName="this.selectedBoardName"
            :cancel="handleGoBack"
        />
    </div>
</template>

<script>
import BoardStore from '../stores/BoardStore.js'
import Board from '../components/Board.vue'
import NoteList from '../components/NoteList.vue'

export default {
    props: {
        currentUserId: String,
        currentUserName: String
    },

    components: {
        Board,
        NoteList
    },

    data() {
        return {
            userBoards: [],
            starredUserBoards: [],
            selectedBoardId: null,
            selectedBoardName: null
        }
    },

    mounted() {
        //console.log('MainMenu component mounted')
        const boardStore = new BoardStore()
        boardStore.getAllBoardsForUser(this.currentUserId)
        this.userBoards = boardStore.userAllBoardsFromDb

        boardStore.getAllStarredBoardsForUser(this.currentUserId)
        this.starredUserBoards = boardStore.userAllStarredBoardsFromDb
    },

    methods: {
        handleListItemClick(board) {
            this.selectedBoardId = board._id
            this.selectedBoardName = board.description
        },

        handleGoBack() {
            this.selectedBoardId = null
        }
    }
}
</script>

<style>

</style>