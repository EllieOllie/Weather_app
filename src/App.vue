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
</style>
