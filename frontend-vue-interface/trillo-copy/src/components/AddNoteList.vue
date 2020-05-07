<template>
    <div class="component-container">
        <b-form-input
            v-model="inputName"
            placeholder="Add list..."
            trim
            @keyup="submitNoteList"
            ></b-form-input>
        
        <p v-if="isErrorDisplayed">
            invalid name
        </p>
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
            inputName: '',
            isErrorDisplayed: false
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
            if (this.listName === '') {
                if (event.key == "Enter") {
                    if (this.inputName.trim().length > 0) {
                        this.onAdd({
                            "name": this.inputName,
                            "boardId": this.boardId
                        })
                        this.inputName = ''
                        this.isErrorDisplayed = false
                    } else {
                        this.isErrorDisplayed = true
                    } 
                }
            } else {
                if (event.key == "Enter"){
                    if (this.inputName.trim().length > 0) {
                        this.onUpdate(this.listId, this.inputName)
                        this.inputName = ''
                        this.isErrorDisplayed = false
                    } else {
                        this.isErrorDisplayed = true
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

    .component-container > p {
        margin-top: 10px;
        color: red;
    }
</style>