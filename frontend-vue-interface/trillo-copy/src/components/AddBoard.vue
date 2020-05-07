<template>
    <div class="component-container">
        <b-form-input
            v-model="inputName"
            placeholder="Enter board name"
            trim
            @keyup="submitBoard"
            ></b-form-input>
        
        <p v-if="isErrorDisplayed">
            invalid name
         </p>

    </div>
</template>

<script>
export default {
    props: {
        onAdd: Function,
        currentUserId: String,
        board: Object,
        onUpdate: Function
    },

    data() {
        return {
            inputName: '',
            isErrorDisplayed: false
        }
    },

    mounted() {
        if (this.board !== undefined) {
            this.inputName = this.board.description
        }
    },

    computed: {
        nameState() {
            return this.inputName.trim().length > 0 ? true : false
      }
    },

    methods: {
        submitBoard() {
            if (String(this.currentUserId) !== 'update') {
                if (event.key == "Enter") {
                    if (this.inputName.trim().length > 0) {
                        this.onAdd({
                            "description": this.inputName,
                            "userId": this.currentUserId
                        })
                        this.inputName = ''
                        this.isErrorDisplayed = false
                    } else {
                        this.isErrorDisplayed = true
                    }
                }
            } else {
                if (event.key == "Enter") {
                    if (this.inputName.trim().length > 0) {
                        this.onUpdate(this.board._id, this.inputName)
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