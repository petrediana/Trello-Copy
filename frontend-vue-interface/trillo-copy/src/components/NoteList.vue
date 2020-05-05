<template>
    <div>
        <div>
             <b-link href="#" @click="handleGoBack()">Go back...</b-link>
         </div>
        <b-card-group deck>
            <b-card
                v-for="(noteList, index) in noteList"
                :key="index"
                :header="noteList.name"
            >
                <p class="card-text mt-2">
                    {{ currentBoardName }}:
                </p>
                <b-button-group size="sm">
                    <b-button @click="handleClickAddNote" variant="success">Add Note</b-button>
                    <b-button variant="danger">Delete notes</b-button>
                </b-button-group>
                <p></p> 
                <b-list-group>
                    <Notes :currentNoteListId="noteList._id"/>
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

export default {
    props: {
        currentBoardId: String,
        currentBoardName: String,
        cancel: Function
    },

    components: {
        Notes,
        Popup
    },

    data() {
        return {
            noteList: [],
            isAddingNotes: false
        }
    },

    mounted() {
        console.log('notelist component mounted')
        const noteListStore = new NoteListStore();
        noteListStore.getBoardNoteListsFromDb(this.currentBoardId)
        this.noteList = noteListStore.boardNoteListFromDb
    },

    methods: {
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