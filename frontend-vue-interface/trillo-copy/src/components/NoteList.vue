<template>
    <div>
        <div>
             <b-link href="#" @click="handleGoBack()">Go back...</b-link>
         </div>
         <div v-if="listNameForUpdate === null">
             <AddNoteList
              :boardId="currentBoardId"
              :onAdd="addNoteList"
             />   
        </div>
        <div v-else>
            {{ this.listNameForUpdate }}
            <AddNoteList
             :listName="listNameForUpdate"
             :listId="listIdForUpdate"
             :onUpdate="updateNoteList"
            />
        </div>
        <b-card-group deck>
            <b-card
                v-for="(noteList, index) in computedNoteList"
                :key="index"
                :header="noteList.name"
            >
                <p class="card-text mt-2">
                    {{ currentBoardName }}:
                </p>
                <b-button-group size="sm">
                    <b-button @click="deleteNoteList(noteList._id)" variant="danger">Delete list</b-button>
                    <b-button @click="triggerUpdate(noteList)">Update list</b-button>
                </b-button-group>
                <p></p> 
                <b-list-group>
                    <Notes
                    :currentNoteListId="noteList._id"/>
                </b-list-group>
            </b-card>
        </b-card-group>

        <div v-if="isAddingNotes">
            adding note
            <Popup
                :cancel="handleDismiss"
                :noteName="''"
            />
        </div>
    </div>
</template>

<script>
import NoteListStore from '../stores/NoteListStore.js'
import Notes from '../components/Notes.vue'
import Popup from '../components/Popup.vue'
import AddNoteList from '../components/AddNoteList.vue'

export default {
    props: {
        currentBoardId: String,
        currentBoardName: String,
        cancel: Function
    },

    components: {
        Notes,
        Popup,
        AddNoteList
    },

    data() {
        return {
            noteList: [],
            isAddingNotes: false,
            noteListStore: null,
            listIdForUpdate: null,
            listNameForUpdate: null
        }
    },

    computed: {
        computedNoteList() {
            return this.noteList
        }
    },

    mounted() {
        this.noteListStore = new NoteListStore()
        this.noteListStore.getBoardNoteListsFromDb(this.currentBoardId)
        this.noteList = this.noteListStore.boardNoteListFromDb
    },

    methods: {
        async addNoteList(list) {
            list._id = await this.noteListStore.addNoteListToDb(list)
            this.noteList.push(list)
        },

        deleteNoteList(noteListId) {
            this.noteListStore.deleteNoteListFromDb(noteListId)
            this.noteList = this.noteList.filter(list => {
                if (String(list._id) !== String(noteListId)) {
                    return list
                }
            })
        },

        triggerUpdate(list) {
            this.listIdForUpdate = list._id
            this.listNameForUpdate = list.name
            console.log(this.listNameForUpdate)
        },

        updateNoteList(listId, newName) {
            this.noteListStore.updateNoteListFromDb(listId, newName)
            for (let i = 0; i < this.noteList.length; ++i) {
                if (String(this.noteList[i]._id) === String(listId)) {
                    this.noteList[i].name = newName
                    break
                }
            }

            this.listIdForUpdate = ''
            this.listNameForUpdate = ''
        },

        handleGoBack() {
            this.cancel()
        },

        handleClickAddNote() {
            this.isAddingNotes = true;
        },

        handleDismiss() {
            this.isAddingNotes = false;
        }
    }
}
</script>

<style scoped>
</style>