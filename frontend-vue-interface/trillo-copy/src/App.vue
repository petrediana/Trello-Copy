<template>
  <div class="app">
    <div class="app-container">
      <Login/>
    </div>
    <p class="bottom-right"> Created by Petre Diana</p>
  </div>
</template>

<script>
import Login from './components/Login.vue'

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.bottom-right {
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 10px;
}

.app-container {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
