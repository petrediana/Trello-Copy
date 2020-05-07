<template>
    <div class="component-container">
        <b-form-input
            id="input-live"
            v-model="inputName"
            :state="nameState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Add list..."
            trim
            @keyup="submitNoteList"
            ></b-form-input>

            <b-form-invalid-feedback id="input-live-feedback-notelist">
            Name can't be empty!
            </b-form-invalid-feedback>
    </div>
</template>

<script>
export default {
    props: {
        boardId: String,
        onAdd: Function,
        listName: String,
        listId: String,
        onUpdate:Function
    },

    data() {
        return {
            inputName: ''
        }
    },

    computed: {
        nameState() {
            return this.inputName.trim().length > 0 ? true : false
      }
    },

    mounted() {
        this.inputName = this.listName
    },

    methods: {
        submitNoteList() {
            if (this.listName === undefined) {
                if (event.key == "Enter") {
                    if (this.inputName.trim().length > 0) {
                        this.onAdd({
                            "name": this.inputName,
                            "boardId": this.boardId
                        })
                        this.inputName = ''
                    }
                }
            } else {
                if (event.key == "Enter"){
                    if (this.inputName.trim().length > 0) {
                        this.onUpdate(this.listId, this.inputName)
                        this.inputName = ''
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
.component-container {
    padding: 10px;
    margin-bottom: 10px;
}
</style>