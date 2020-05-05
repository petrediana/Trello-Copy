<template>
    <div class="board-container">
        <p><b>{{ board.description }} </b></p>
    </div>
</template>

<script>
export default {
    props: {
        board: Object
    }
}
</script>

<style scoped>
    .board-container {
        padding: 0.8rem;
        margin-right: 10px
    }
</style>