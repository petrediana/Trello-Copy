<template>
    <div class="boards-container" v-if="selectedBoardId === null">        
        <div class>
            All boards
            <b-list-group horizontal>
                <b-list-group-item button variant="primary"
                    v-for="(userBoard, index) in computedUserBoards"
                    :key="index"
                >
                    <Board
                    :board="userBoard"
                    :onSelect="handleListItemClick"
                    :onDelete="deleteBoard"
                    :onUpdate="handleUpdateBoardButton" />
                </b-list-group-item>
            </b-list-group>
        </div>

        <div 
        v-if="!isUpdating"
        class="add-board-container">
            Press enter to create a new board!
            <AddBoard
            :currentUserId="currentUserId"
            :onAdd="addBoard"
            />
        </div>
        <div v-else>
            Press enter to change board's name!
            <AddBoard
            :currentUserId="'update'"
            :board="boardForUpdate"
            :onUpdate="updateBoard"
            />
            <b-button @click="handleDismissUpdateButton">Dismiss</b-button>
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
            boardStore: null,
            isUpdating: false,
            boardForUpdate: null
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
    },

    methods: {
        async addBoard(board) {
            board._id = await this.boardStore.addBoardToDb(board)
            this.userBoards.push(board)
        },

        deleteBoard(boardId) {
            this.boardStore.deleteBoardFromDb(boardId)
            this.userBoards = this.userBoards.filter(board => {
                if (String(board._id) !== String(boardId)) {
                    return board
                }
            })
        },

        updateBoard(boardId, newDescription) {
            this.boardStore.updateBoardFromDb(boardId, newDescription);
            console.log(boardId + ' ' + newDescription)
            for (let i = 0; i < this.userBoards.length; ++i) {
                if (String(this.userBoards[i]._id) === String(boardId)) {
                    this.userBoards[i].description = newDescription
                    break
                }
            }

            this.isUpdating = false
            this.boardForUpdate = null
        },

        handleDismissUpdateButton() {
            this.isUpdating = false
            this.boardForUpdate = null
        },
        
        handleUpdateBoardButton(board) {
            this.isUpdating = true
            this.boardForUpdate = board
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