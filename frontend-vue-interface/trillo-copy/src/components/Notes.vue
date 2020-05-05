<template>
    <div>
        <b-list-group-item button variant="info"
        v-for="(note, index) in this.notes"
        :key="index"
        @focus="handleClick(note._id)"
        @focusout="handleOutsideClick()"
        >
            {{ note.name }}
        </b-list-group-item>

        <div v-if="isNoteClicked">
            <Popup />
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
            isNoteClicked: false
        }
    },

    mounted() {
        const noteStore = new NoteStore();
        noteStore.getNotesOfANoteListFromDb(this.currentNoteListId)
        this.notes = noteStore.notesOfNoteListFromDb
    },

    methods: {
        handleClick(id) {
            this.isNoteClicked = true
            console.log(this.isNoteClicked + ' ' + id)
        },

        handleOutsideClick() {
            this.isNoteClicked = false
            console.log(this.isNoteClicked)
        }
    }
}
</script>