<template>
    <div>
        <b-jumbotron header="Welcome to my Trillo copy!" lead="Please login">
            <b-form-group
                id="name-input"
                label-cols-sm="3"
                label-cols-lg="2"
                label="Enter your name"
                label-for="input-horizontal"
            >
                <b-form-input type="text"></b-form-input>
            </b-form-group>

            <b-form-group true
                id="name-input"
                label-cols-sm="3"
                label-cols-lg="2"
                label="Enter your password"
                label-for="input-horizontal"
            >
                <b-form-input type="password"></b-form-input>
            </b-form-group>

            <b-button variant="primary">Login</b-button>
        </b-jumbotron>
    </div>
</template>