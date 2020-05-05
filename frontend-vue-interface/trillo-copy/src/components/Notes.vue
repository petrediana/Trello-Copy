<template>
    <div>
        <b-list-group-item button variant="primary"
        v-for="(note, index) in this.notes"
        :key="index"
        >
            {{ note.name }}
        </b-list-group-item>
    </div>
</template>

<script>
import NoteStore from '../stores/NoteStore'

export default {
    props: {
        currentNoteListId: String
    },

    data() {
        return {
            notes: []
        }
    },

    mounted() {
        const noteStore = new NoteStore();
        noteStore.getNotesOfANoteListFromDb(this.currentNoteListId)
        this.notes = noteStore.notesOfNoteListFromDb
    }
}
</script>