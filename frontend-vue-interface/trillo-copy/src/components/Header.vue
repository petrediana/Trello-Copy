<template>
    <div class="header-container">
        <b-nav tabs>
            <b-nav-item disabled><b>Trello copy :)</b></b-nav-item>
            <b-nav-item disabled>ToDo: maybe change this</b-nav-item>
            
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                <template v-slot:button-content>
                    <em>Logged as: {{ currentUserName }}</em>
                </template>
                <b-dropdown-item href="#" @click="this.logout">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
        </b-navbar-nav>                

        </b-nav>

    </div>
</template>

<script>
export default {
    props: {
        currentUserName: String,
        logout: Function
    }
}
</script>

<style scoped>
    .header-container {
        margin-bottom: 2rem 
    }
</style>