<template>
  <div class="container d-flex flex-column min-vh-100">
    <form @submit.prevent="login">
      <h1 class="text-center my-3">Login</h1>
      <p class="text-center text-danger">{{ message }}</p>
      <div class="row">
        <div class="col-3">
          <input
            class="form-control"
            type="email"
            v-model="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="col-3">
          <input
            class="form-control"
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>
        <div class="col-2">
          <button class="btn btn-primary">Login</button>
        </div>
      </div>
    </form>

    <form @submit.prevent="test">
      <h1 class="text-center my-3">test</h1>
      <div class="row">
        <div class="col-2">
          <button class="btn btn-primary">test~</button>
        </div>
      </div>
    </form>

    <p class="mt-4 text-center">
      No account? <a href="/register">Register</a> first!
    </p>
    <p class="mt-auto text-center">&copy; 2022 David Liu</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: 'john@gmail.com',
      password: '1234',
      message: '',
    };
  },
  methods: {
    async login() {
      // enter your code here
      try {
        let a = await axios({
          url: '/login',
          method: 'POST',
          data: {
            email: this.email,
            password: this.password,
          },
        });

        if (a.status == 200) {
          localStorage.setItem('user', JSON.stringify(a));
          window.location.href = '/';
        }
      } catch (error) {
        this.message = error.response.data;
      }
    },
    async test() {
      // enter your code here
      try {
        let a = await axios({
          url: '/test',
          method: 'GET',
        });

        if (a.status == 200) {
          alert('YYY');
        } else {
          alert('NNN');
        }
      } catch (error) {
        this.message = error.response.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
