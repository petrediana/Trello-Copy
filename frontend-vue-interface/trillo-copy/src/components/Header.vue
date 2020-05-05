<template>
    <div class="header-container">
        <b-nav tabs>
            <b-nav-item disabled><b>Trello copy :)</b></b-nav-item>
            <b-nav-item disabled>ToDo: maybe change this</b-nav-item>
            <b-nav-item disabled>Created by Petre Diana</b-nav-item>
            <b-nav-item disabled>Logged as {{ this.userName }} </b-nav-item>
            <b-nav-item @click="this.logout">Log out </b-nav-item>
        </b-nav>

    </div>
</template>

<script>
export default {
    props: {
        userName: String,
        logout: Function
    }
}
</script>

<style scoped>
    .header-container {
        margin-bottom: 2rem 
    }
</style>