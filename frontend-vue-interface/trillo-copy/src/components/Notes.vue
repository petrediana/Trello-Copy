<template>
    <div>
        <b-list-group-item button variant="info"
        v-for="(note, index) in this.notes"
        :key="index"
        @click="handleClick(note)"
        
        >
            {{ note.name }}
        </b-list-group-item>

        <div v-if="isNoteClicked">
            <p></p>
            <Popup
                :cancel="handleOutsideClick"
                :noteName="this.noteName"
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
            noteName: ''
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
        }
    }
}
</script>