<template>
    <div>
        <div role="group" class="input-container">
            <b-form-input
            id="input-live"
            v-model="noteName"
            :state="nameState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Enter note name"
            value="foo"
            trim
            ></b-form-input>

            <b-form-invalid-feedback id="input-live-feedback">
            Name can't be empty!
            </b-form-invalid-feedback>

            <b-form-input  type="text" placeholder="Note's description"></b-form-input>
        </div>
        <p> </p>
        <b-button variant="success">Commit</b-button>
        <b-button @click="handleDismissClick">Dismiss</b-button>
    </div>
</template>

<script>
export default {
    props: {
        noteName: String,
        cancel: Function,
        action: String
    },

    computed: {
        nameState() {
            return this.noteName.trim().length > 0 ? true : false
      }
    },

    data() {
        return {
            
        }
    },

    methods: {
        handleDismissClick() {
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