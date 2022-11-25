<template>
  <div>
    <div class="container login">
      <form @submit.prevent="login">
        <h1 class="text-center mb-4">Login</h1>
        <p class="text-center text-danger">{{ message }}</p>
        <div class="row">
          <div class="mx-auto col-8 my-3">
            <input
              class="form-control"
              type="email"
              v-model="email"
              placeholder="Email"
              required
            />
          </div>
          <div class="w-100"></div>
          <div class="mx-auto col-8 my-3">
            <input
              class="form-control"
              type="password"
              v-model="password"
              placeholder="Password"
              required
            />
          </div>
          <div class="w-100"></div>
          <div class="mx-auto col-8 my-3">
            <button class="btn btn-primary loginButton">Login</button>
          </div>
        </div>
      </form>

      <p class="mt-5 text-center">
        No account? <a href="/register">Register</a> first!
      </p>
    </div>

    <!-- Footer -->
    <Footer></Footer>
  </div>
</template>

<script>
import axios from 'axios';
import Footer from '@/components/Footer';

export default {
  name: 'Login',
  components: { Footer },
  data() {
    return {
      email: 'john@gmail.com',
      password: '1234',
      message: '',
    };
  },
  methods: {
    async login() {
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
  },
};
</script>

<style lang="css" scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -300px 0px 0px -225px;
  padding: 75px 0 50px 0;
  width: 450px;
  height: 500px;
  border: 1px black solid;
  border-radius: 10px;
}
.loginButton {
  width: 100%;
}
</style>
