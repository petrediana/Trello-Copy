<template>
    <div>
        <b-button size="sm" @click="handleAddNoteClick" variant="success">Add Note</b-button>
        <p></p>
        <b-list-group-item button variant="info"
        v-for="(note, index) in this.notes"
        :key="index"
        @click="handleClick(note)"
        >
            {{ note.name }}
            <div class="description-container">
                Description: {{ note.description }}
             </div>
        </b-list-group-item>

        <div v-if="isNoteClicked">
            <p></p>
            <Popup
                :action="'update'"
                :cancel="handleOutsideClick"
                :noteName="this.noteName"
                :noteDescription="this.noteDescription"
                :noteId="this.noteId"
            />
        </div>

        <div v-if="isAddingNote">
            <p></p>
            <Popup
                :action="'add'"
                :cancel="handleCloseAddingComponent"
                :noteName="''"
                :noteDescription="''"
                :noteId="''"
            />
        </div>
    </div>

</template>

<script>
import NoteStore from '../stores/NoteStore.js'
import Popup from '../components/Popup.vue'

export default {
    props: {
        currentNoteListId: String
    },

    components: {
        Popup
    },

    data() {
        return {
            notes: [],
            isNoteClicked: false,
            noteName: '',
            noteDescription: '',
            noteId: '',
            isAddingNote: false
        }
    },

    mounted() {
        const noteStore = new NoteStore();
        noteStore.getNotesOfANoteListFromDb(this.currentNoteListId)
        this.notes = noteStore.notesOfNoteListFromDb
    },

    methods: {
        handleClick(note) {
            this.isNoteClicked = true
            this.noteName = note.name
            this.noteDescription = note.description
            this.noteId = note._id
        },

        handleOutsideClick() {
            this.isNoteClicked = false
            this.noteName = ''
            this.noteDescription = ''
            this.noteId = ''
        },

        handleAddNoteClick() {
            this.isAddingNote = true;
        },

        handleCloseAddingComponent() {
            this.isAddingNote = false;
        }
    }
}
</script>

<style scoped>
.description-container {
    font-style: italic;
}
</style>