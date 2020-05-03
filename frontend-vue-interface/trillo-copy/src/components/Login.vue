<template>
    <div v-if="userId === null">
        <b-jumbotron header="Welcome to my Trillo copy!" lead="Please login">
            <b-form-group
                id="name-input"
                label-cols-sm="3"
                label-cols-lg="2"
                label="Enter your name"
                label-for="input-horizontal"
            >
                <b-form-input v-model="inputName" type="text" name="name-input-txt"></b-form-input>
            </b-form-group>

            <b-form-group true
                id="name-input"
                label-cols-sm="3"
                label-cols-lg="2"
                label="Enter your password"
                label-for="input-horizontal"
            >
                <b-form-input v-model="inputPass" type="password" name="pass-input-txt"></b-form-input>
            </b-form-group>

            <b-button @click="handleLoginClick()" variant="primary">Login</b-button>
        </b-jumbotron>
    </div>
    <div v-else>
        This will be the main menu user id: {{ userId }}
    </div>
</template>


<script>
import UserStore from '../stores/UserStore.js'

export default {
    data() {
        return {
            inputName: '',
            inputPass: '',
            allUsers: [],
            userId: null
        }
    },

    mounted() {
        console.log('Login component mounted')
        const userStore = new UserStore()
        userStore.getUsersFromDb()
        this.allUsers = userStore.usersFromDb
    },

    methods: {
        handleLoginClick() {
            console.log(this.allUsers.length)
            console.log(this.inputName + ' ' + this.inputPass)

            const filteredUser = this.allUsers.filter(user => {
                if (user.name === this.inputName && user.pass === this.inputPass) {
                    return user
                }
            })

            if (filteredUser.length === 1) {
                console.log('user exists')
                this.userId = filteredUser[0]._id
                console.log(this.userId)
            } else {
                console.log('user does not exist')
            }
        }
    }
}
</script>