<script>
  import Register from "./Register.svelte";
  import Login from "./Login.svelte";
  import Router from "svelte-spa-router";

const routes = {
  "/": Login,
  "/login": Login,
  "/register": Register,
};

</script>

<nav>
  <a href="#/login">LOGIN</a>
  <a href="#/register">REGISTER</a>
</nav>
<main>
  <h1>Lovely Sensor Value App</h1>
<Router {routes} />
</main>

<style>
  h1 {
    color: red;
  }
</style>
