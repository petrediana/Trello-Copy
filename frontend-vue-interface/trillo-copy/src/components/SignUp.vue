<template>
    <div>
        <b-jumbotron lead="Please create your user">
            <b-form-group
                    id="name-input"
                    label-cols-sm="3"
                    label-cols-lg="2"
                    label="Choose your name:"
                    label-for="input-horizontal"
                >
                    <b-form-input v-model="inputName" type="text" name="name-input-txt"></b-form-input>
                </b-form-group>

                <b-form-group true
                    id="name-input"
                    label-cols-sm="3"
                    label-cols-lg="2"
                    label="Choose your password:"
                    label-for="input-horizontal"
                >
                    <b-form-input v-model="inputPass" type="password" name="pass-input-txt"></b-form-input>
                </b-form-group>

                <div v-if="!isInputOk" class="warn-msg-container">
                    <b>Please insert valid data</b>
                </div>
                <b-button  @click="handleSignUp" variant="success">Sign up</b-button>
                <b-button @click="handleCancelClick" variant="primary">Back</b-button>     
        </b-jumbotron>
    </div>
</template>

<script>
export default {
    props: {
        onCancel: Function,
        onAdd: Function
    },

    data() {
        return {
            inputName: '',
            inputPass: '',
            isInputOk: true
        }
    },

    methods: {
        handleCancelClick() {
            this.onCancel()
        },

        handleSignUp() {
            if (this.inputName.trim().length > 0 && this.inputPass.trim().length > 0) {
                this.onAdd({
                    name: this.inputName,
                    pass: this.inputPass
                })
                
                this.onCancel()
            } else {
                this.isInputOk = false
            }
        }
    }
}
</script>

<style scoped>
.btn {
    margin-left: 10px;
}

.warn-msg-container > b{
    color: red;
}
</style>