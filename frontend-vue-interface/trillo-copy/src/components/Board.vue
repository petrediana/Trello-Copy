<template>
    <div class="board-container">
        <b>{{ board.description }}</b>
        <div class="mt-3">
            <b-button-group size="sm" vertical>
                <b-button>Update</b-button>
                <b-button @click="selectBoard" variant="success">Select</b-button>
                <b-button variant="danger">Delete</b-button>
            </b-button-group>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        board: Object,
        onSelect: Function
    },

    data() {
        return {

        }
    },

    methods: {
        selectBoard() {
            this.onSelect(this.board)
        }
    }
}
</script>

<style scoped>
    .board-container {
        padding: 0.8rem;
    }
</style>