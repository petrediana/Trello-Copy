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
                    v-for="(userBoard, index) in computedUserBoards"
                    :key="index"
                >
                    <Board 
                    :onSelect="handleListItemClick"
                    :board="userBoard" />
                </b-list-group-item>
            </b-list-group>
        </div>

        <div class="add-board-container">
            Press enter to create a new board!
            <AddBoard
            :currentUserId="currentUserId"
            :onAdd="addBoard"
            />
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
import AddBoard from '../components/AddBoard.vue'

export default {
    props: {
        currentUserId: String,
        currentUserName: String
    },

    components: {
        Board,
        NoteList,
        AddBoard
    },

    data() {
        return {
            userBoards: [],
            starredUserBoards: [],
            selectedBoardId: null,
            selectedBoardName: null,
            boardStore: null
        }
    },

    computed: {
        computedUserBoards() {
            return this.userBoards
        }
    },

    mounted() {
        //console.log('MainMenu component mounted')
        this.boardStore = new BoardStore()
        this.boardStore.getAllBoardsForUser(this.currentUserId)
        this.userBoards = this.boardStore.userAllBoardsFromDb

        this.boardStore.getAllStarredBoardsForUser(this.currentUserId)
        this.starredUserBoards = this.boardStore.userAllStarredBoardsFromDb
    },

    methods: {
        async addBoard(board) {
            board._id = await this.boardStore.addBoardToDb(board)
            this.userBoards.push(board)
        },

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
.add-board-container {
    position: absolute;                  
    bottom: 0;                          
    left: 0;
    margin-left: 10px;
    font-style: italic;
}
</style>