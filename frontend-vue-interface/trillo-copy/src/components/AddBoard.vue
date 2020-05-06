<template>
    <div class="component-container">
        <b-form-input
            id="input-live"
            v-model="inputName"
            :state="nameState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Enter note name"
            trim
            @keyup="submitBoard"
            ></b-form-input>

            <b-form-invalid-feedback id="input-live-feedback">
            Name can't be empty!
            </b-form-invalid-feedback>
    </div>
</template>

<script>
export default {
    props: {
        onAdd: Function,
        currentUserId: String
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

    methods: {
        submitBoard() {
            if (event.key == "Enter") {
                if (this.inputName.trim().length > 0) {
                    this.onAdd({
                        "description": this.inputName,
                        "userId": this.currentUserId
                    })
                    this.inputName = ''
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