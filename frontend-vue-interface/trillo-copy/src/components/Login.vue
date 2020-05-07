<template>
    <div v-if="userId === null">
        <div v-if="!isCreatingUser">
            <b-jumbotron header="Welcome to my Trello copy!" lead="Please login">
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

                <b-button @click="handleLoginClick" variant="primary">Login</b-button>
                <b-button @click="handleSignUpClick" variant="primary">Sign up</b-button>

                <div v-if="isMessageDisplayed" class="error-message-container">
                    <b>Name and password do not match</b>
                </div>
            </b-jumbotron>
        </div>
        <div v-else>
            <SignUp
             :onCancel="handleStopSignUpClick"
             :onAdd="addUser"
            />
         </div>
    </div>
    <div v-else>
        <Header 
            :currentUserName="this.inputName"
            :logout="handleLogOut"
         />
        
        <MainMenu
            :currentUserId="this.userId"
            :currentUserName="this.inputName"
         />
    </div>
</template>


<script>
import UserStore from '../stores/UserStore.js'
import MainMenu from '../components/MainMenu.vue'
import Header from '../components/Header.vue'
import SignUp from '../components/SignUp.vue'

export default {
    components: {
        MainMenu,
        Header,
        SignUp
    },

    data() {
        return {
            inputName: '',
            inputPass: '',
            allUsers: [],
            userId: null,
            isCreatingUser: false,
            userStore: null,
            isMessageDisplayed: false
        }
    },

    mounted() {
        this.userStore = new UserStore()
        this.userStore.getUsersFromDb()
        this.allUsers = this.userStore.usersFromDb
    },

    methods: {
        handleSignUpClick() {
            this.isCreatingUser = true
            this.isMessageDisplayed = false
        },

        handleStopSignUpClick() {
            this.isCreatingUser = false
        },

        async addUser(newUser) {
            newUser._id = await this.userStore.addUserToDb(newUser)
            this.allUsers.push(newUser)
        },

        handleLoginClick() {
            const filteredUser = this.allUsers.filter(user => {
                if (user.name === this.inputName && user.pass === this.inputPass) {
                    return user
                }
            })

            if (filteredUser.length === 1) {
                this.userId = filteredUser[0]._id
                this.isMessageDisplayed = false
            } else {
                this.isMessageDisplayed = true;
            }
        },

        handleLogOut() {
            this.userId = null
        }
    }
}
</script>

<style scoped>
    .btn {
        margin-left: 10px;
    }

    .error-message-container {
        margin-top: 10px;
    }

    .error-message-container > b {
        margin-top: 10px;
        color: red;
    }
</style>