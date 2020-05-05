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
                <b-list-group>
                    <Notes :currentNoteListId="noteList._id"/>
                </b-list-group>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
import NoteListStore from '../stores/NoteListStore.js'
import Notes from '../components/Notes'

export default {
    props: {
        currentBoardId: String,
        cancel: Function
    },

    components: {
        Notes
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
    },

    methods: {
        handleGoBack() {
            this.cancel()
        }
    }
}
</script>