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
            />
        </div>

        <div v-if="isAddingNote">
            <p></p>
            <Popup
                :action="'add'"
                :cancel="handleCloseAddingComponent"
                :noteName="''"
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
        },

        handleOutsideClick() {
            this.isNoteClicked = false
            console.log(this.isNoteClicked)
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