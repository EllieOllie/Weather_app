<template>
  <nav class="nav">
    <router-link to="/" class="link">Weather today</router-link>
    <router-link to="/photos" class="link">Collection of photos</router-link>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.link {
  width: 50%;
  padding: 25px 0;
  position: relative;
  text-shadow: 2px 2px 10px darkgray;
  transition: 1s;
}
.link:before,
.link:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  transition: 1s;
  transform: rotateX(90deg);
  z-index: -1;
}
.link:before {
  transform: rotateX(90deg);
}
.link:after {
  transform: rotateY(90deg);
}
.link:hover:before {
  transform: rotateX(0deg);
}
.link:hover:after {
  transform: rotateY(0deg);
}
.link:hover {
  color: #0e1011;
  text-shadow: none;
}
.link:active {
  transform: scale(0.95);
  transition: all 1s ease-in-out;
}
.link.router-link-exact-active {
  color: #0e1011;
  background: #fff;
  box-shadow: 2px 2px 10px darkgray;
}
</style>
