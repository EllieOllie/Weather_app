<template>
  <Menu />
  <router-view />
</template>

<script>
import Menu from "@/components/Menu";
export default {
  components: {
    Menu,
  },
};
</script>

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
  color: #fff;
  background: #939494;
  font-family: Raleway, Verdana, sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
}
a {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
input {
  height: 40px;
  padding-left: 15px;
  border: 2px solid;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
}
input:focus {
  background-color: rgba(255, 255, 255, 0.9);
}
input::-webkit-input-placeholder {
  font-family: Raleway;
}
input::-webkit-input-placeholder {
  opacity: 1;
  transition: opacity 0.7s ease;
}
input:focus::-webkit-input-placeholder {
  opacity: 0;
  transition: opacity 0.7s ease;
}
#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
</style>
