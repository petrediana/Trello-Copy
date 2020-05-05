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
        <b-button @click="handleClick()" variant="success">Ok</b-button>
    </div>
</template>

<script>
export default {
    props: {
        noteName: String,
        cancel: Function
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
        handleClick() {
            console.log('click')
            this.cancel()
        }
    }
}
</script>

<style scoped>
</style>