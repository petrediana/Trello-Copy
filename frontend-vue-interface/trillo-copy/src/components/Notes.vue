<template>
    <div>
        <b-button size="sm" @click="handleAddNoteClick" variant="success">Add Note</b-button>
        <p></p>
        <b-list-group-item button variant="info"
        v-for="(note, index) in computedNotes"
        :key="index"
        @click="handleClick(note)"
        >
            <div class="note-container"> 
                {{ note.name }}
                <div class="description-container">
                    Description: {{ note.description }}
                </div>
            </div>
        </b-list-group-item>

        <div v-if="isNoteClicked">
            <p></p>
            <Popup
                :onTrigger="triggerRender"
                :onAdd="addNote"
                :onDelete="deleteNote"
                :action="'update'"
                :cancel="handleOutsideClick"
                :noteName="this.noteName"
                :noteDescription="this.noteDescription"
                :noteId="this.noteId"
                :currentNoteListId="this.currentNoteListId"
            />
        </div>

        <div v-if="isAddingNote">
            <p></p>
            <Popup
                :onTrigger="triggerRender"
                :onAdd="addNote"
                :onDelete="deleteNote"
                :action="'add'"
                :cancel="handleCloseAddingComponent"
                :noteName="''"
                :noteDescription="''"
                :noteId="''"
                :currentNoteListId="this.currentNoteListId"
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
            isAddingNote: false,
            noteStore: null,
            trigger: 0
        }
    },

    computed: {
        computedNotes() {
            return this.notes
        }
    },

    mounted() {
        this.noteStore = new NoteStore()
        this.noteStore.getNotesOfANoteListFromDb(this.currentNoteListId)
        this.notes = this.noteStore.notesOfNoteListFromDb
    },

    methods: {
        deleteNote(noteId) {
            this.noteStore.deleteNoteFromDb(noteId)
            this.notes = this.notes.filter(note => {
                if (String(note._id) !== String(noteId)) {
                    return note
                }
            })
        },
        addNote(note) {
            this.noteStore.addNoteToDb(note)
            this.notes.push(note)
        },
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
            console.log('Closing adding componenet')
        }
    }
}
</script>

<style scoped>
.description-container {
    font-style: italic;
}
</style>