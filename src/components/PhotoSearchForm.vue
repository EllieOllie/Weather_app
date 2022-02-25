<template>
  <div class="wrap-form">
    <form class="search" @submit.prevent="checkForm">
      <div class="search-container">
        <input
          type="text"
          placeholder="Enter..."
          autofocus
          v-model="inputQuery"
        />
        <button class="search-btn" @click="getQuery">
          <img src="../assets/find.svg" alt="search" />
        </button>
      </div>
      <p class="error" v-if="errorInputEmpty">Value should not be empty!</p>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    unsplashBaseUrl: {
      required: true,
    },
    unsplashAccessKey: {
      required: true,
    },
  },
  data() {
    return {
      errorInputEmpty: false,
      inputQuery: "",
      photos: [],
      // cors: "https://cors-anywhere.herokuapp.com/", // если опять будет ошибка cors
    };
  },
  // created() {
  //   this.getQuery();
  // },
  methods: {
    getQuery() {
      console.log(this.inputQuery);
      // this.inputQuery = "";
    },
    getPhotosCollection() {
      this.axios
        .get(
          `${this.unsplashBaseUrl}search/collections/?client_id=${this.unsplashAccessKey}&query=${this.inputQuery}`
        )
        .then((response) => {
          this.photos = response.data;
          console.log(response.data);
        });
    },
    checkForm() {
      if (this.inputQuery.length !== 0) {
        return true;
      }
      this.errorInputEmpty = false;
      if (this.inputQuery.length === 0) {
        this.errorInputEmpty = true;
      }
    },
  },
};
</script>

<style scoped>
.search {
  display: flex;
  flex-direction: column;
}
.search-container {
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
.error {
  color: red;
  text-align: center;
  font-size: 14px;
  font-weight: normal;
}
.error ul {
  list-style: none;
}
</style>
