<template>
  <div id="nav">
    <router-link to="/" class="link">Weather today</router-link>
    <router-link to="/photos" class="link">Collection of photos</router-link>
  </div>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
body {
  background-color: #80919c;
}
#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  color: #fff;
  font-family: Raleway, Verdana, sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
}
#nav {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.link {
  width: 50%;
  padding: 25px 0;
  position: relative;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
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
  color: #153a54;
}
.link:active {
  transform: scale(0.95);
  color: #ffa400;
  transition: all 1s ease-in-out;
}
</style>
