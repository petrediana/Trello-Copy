<template>
    <div>
        <div role="group" class="input-container">
            <b-form-input
            id="input-live"
            v-model="inputName"
            :state="nameState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Enter note name"
            trim
            ></b-form-input>

            <b-form-invalid-feedback id="input-live-feedback">
            Name can't be empty!
            </b-form-invalid-feedback>

            <b-form-input
            type="text"
            v-model="inputDescription"
            :value="this.noteDescription"
            placeholder="Note's description"
            ></b-form-input>
        </div>
        <p> </p>
        <b-button @click="handleCommitClick" variant="success">Commit</b-button>
        <b-button @click="handleDismissClick">Dismiss</b-button>
        <b-button v-if="canDeleteNote" @click="handleDeleteNoteClick(noteId)" variant="danger">Delete</b-button>
    </div>
</template>

<script>
export default {
    props: {
        noteName: String,
        noteDescription: String,
        noteId: String,
        currentNoteListId: String,
        cancel: Function,
        action: String,
        onDelete: Function,
        onAdd: Function
    },

    computed: {
        nameState() {
            return this.inputName.trim().length > 0 ? true : false
      }
    },

    mounted() {
        if (this.action === 'update') {
            this.canDeleteNote = true;
        }
        this.inputName = this.noteName
        this.inputDescription = this.noteDescription
        //console.log(this.currentNoteListId + ' ' + this.noteName + ' ' + this.noteDescription + ' ' + this.noteId)
    },

    data() {
        return {
            canDeleteNote: false,
            inputName: '',
            inputDescription: ''
        }
    },

    methods: {
        handleDismissClick() {
            this.cancel()
        },

        handleCommitClick() {
            switch(this.action) {
                case 'update':
                    console.log('update')
                    break
                case 'add':
                    console.log('adding')
                    this.addNoteToDb()
                    break;
                default:
                    break;
            }
            this.cancel();
        },

        handleDeleteNoteClick(noteId) {
            console.log('delete this note: ' + noteId)
            this.onDelete(noteId)
            this.cancel()

        },

        addNoteToDb() {
            if (this.inputName.trim().length > 0) {
                const noteToAdd = {
                    name: this.inputName,
                    description: this.inputDescription,
                    noteListId: this.currentNoteListId
                }
                this.onAdd(noteToAdd)
            }
        }
    }
}
</script>

<style scoped>
.btn {
    margin-left: 2px;
}
</style>