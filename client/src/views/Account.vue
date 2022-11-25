<template>
  <div id="app" class="container d-flex flex-column min-vh-100">
    <h1 class="text-center my-3">{{ user.name }}'s Account</h1>
    <div class="mx-auto d-block">
      <router-link to="/">Home</router-link> | <router-link to="/logout">Logout</router-link>
    </div>
    <p v-if="prime != null" class="text-center my-3">You secret: {{ prime }}</p>
    <p class="text-center font-weight-bold mt-3">Please enter your credit card number below.</p>
    <div class="row">
      <div class="col-3 offset-4">
        <input type="text" class="form-control" placeholder="We can only accept VISA" />
      </div>
      <div class="col-3">
        <button onclick="alert('This is only a simulation!')" class="btn btn-primary">Submit</button>
      </div>
    </div>
    <p class="mt-auto text-center">&copy; 2022 David Liu</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        id: '',
        name: '',
      },
      prime: '',
    };
  },
  async created() {
    // enter your code here
    const a=JSON.parse(localStorage.getItem('user'));
    this.user.id=a.data.id;
    this.user.name=a.data.name;
    const b=await axios({
      url: '/secretdata',
      method: 'GET',
    });
    this.prime=b.data;
  },
};
</script>

<style lang="scss" scoped></style>
