<template>
  <div class="wrap-form">
    <form class="search">
      <input type="text" placeholder="Enter..." />
      <button class="search-btn">
        <img src="../assets/find.svg" alt="search" />
      </button>
    </form>
  </div>
</template>

<style scoped>
.search {
  display: flex;
  gap: 15px;
}
input {
  height: 40px;
  padding-left: 15px;
  border: 2px solid #071d2c;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
}
input:focus {
  background-color: rgba(255, 255, 255, 0.9);
}
input::-webkit-input-placeholder {
  font-family: Raleway;
  color: #000;
}
input::-webkit-input-placeholder {
  opacity: 1;
  transition: opacity 0.7s ease;
}
input:focus::-webkit-input-placeholder {
  opacity: 0;
  transition: opacity 0.7s ease;
}
.search-btn {
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid #071d2c;
  border-radius: 8px;
  cursor: pointer;
}
.search-btn:hover {
  background-color: #ccd755;
  transition: all 0.7s ease-in-out;
}
.search-btn:active {
  border: 2px solid #ccd755;
  transform: scale(0.95);
  box-shadow: 2px 2px 10px #071d2c;
  transition: all 0.7s ease-in-out;
}
.search-btn img {
  width: 36px;
  padding: 2px 4px;
}
</style>
