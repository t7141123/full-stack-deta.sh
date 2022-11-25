<template>
  <div class="container d-flex flex-column min-vh-100">
    <h1 class="text-center mt-3">Welcome {{ user.name }}</h1>
    <div v-if="user.name.length == 0" class="d-flex flex-column">
      <div class="mx-auto">
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </div>
      <p class="my-5 text-center">Please login to use our services!</p>
    </div>

    <div v-else class="d-flex flex-column justify-content-center">
      <h5 class="text-center mb-4">Successfully logged in!</h5>
      <div class="mx-auto">
        <router-link to="/account">Account</router-link> |
        <router-link to="/logout">Logout</router-link>
      </div>
    </div>

    <p class="mt-auto text-center">&copy; 2022 David Liu</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      user: {
        id: '',
        name: '',
      },
    };
  },
  created() {
    // enter your code here
    if (localStorage.getItem('user')) {
      this.user.id = JSON.parse(localStorage.getItem('user')).data.id;
      this.user.name = JSON.parse(localStorage.getItem('user')).data.name;
    }
  },
};
</script>
