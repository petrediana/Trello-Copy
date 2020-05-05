<template>
    <div>
        <b-card-group deck>
            <b-card
                v-for="(noteList, index) in noteList"
                :key="index"
                :header="noteList.name"
            >

            </b-card>
        </b-card-group>
    </div>
</template>

<script>
import NoteListStore from '../stores/NoteListStore.js'

export default {
    props: {
        currentBoardId: String
    },

    data() {
        return {
            noteList: []
        }
    },

    mounted() {
        console.log('notelist component mounted')
        const noteListStore = new NoteListStore();
        noteListStore.getBoardNoteListsFromDb(this.currentBoardId)
        this.noteList = noteListStore.boardNoteListFromDb
    }
}
</script>