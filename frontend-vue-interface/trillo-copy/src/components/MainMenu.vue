<template>
    <div>
        This is the main menu for {{ this.currentUserId }}
    </div>
</template>

<script>
export default {
    props: {
        currentUserId: String,
        currentUserName: String
    },

    data() {
        return {
            
        }
    }
}
</script>