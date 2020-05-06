<template>
    <div>
        <div role="group" class="input-container">
            <b-form-input
            id="input-live"
            v-model="noteName"
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
            v-model="noteDescription"
            :value="this.noteDescription"
            placeholder="Note's description"
            ></b-form-input>
        </div>
        <p> </p>
        <b-button @click="handleCommitClick" variant="success">Commit</b-button>
        <b-button @click="handleDismissClick">Dismiss</b-button>
        <b-button v-if="canDeleteNote" @click="handleDeleteNoteClick(noteName)" variant="danger">Delete</b-button>
    </div>
</template>

<script>
export default {
    props: {
        noteName: String,
        noteDescription: String,
        noteId: String,
        cancel: Function,
        action: String
    },

    computed: {
        nameState() {
            return this.noteName.trim().length > 0 ? true : false
      }
    },

    mounted() {
        if (this.action === 'update') {
            this.canDeleteNote = true;
        }

        console.log(this.noteName + ' ' + this.noteDescription + ' ' + this.noteId)
    },

    data() {
        return {
            canDeleteNote: false
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
                    break;
                default:
                    break;
            }
            this.cancel();
        },

        handleDeleteNoteClick(note) {
            console.log('delete this note: ' + note)
            this.cancel()
        }
    }
}
</script>

<style scoped>
.btn {
    margin-left: 2px;
}
</style>