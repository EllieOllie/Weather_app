<template>
  <div class="wrapper">
    <h2 class="title">Collection of photos</h2>
    <p class="subtitle">Let's go to find any photo</p>
    <div class="wrap-form">
      <form class="search" @submit.prevent="checkForm">
        <div class="search-container">
          <input
            type="text"
            placeholder="Enter..."
            autofocus
            v-model="inputQuery"
          />
          <button class="search-btn" type="submit" @click="getPhotosCollection">
            <img src="../assets/find.svg" alt="search" />
          </button>
        </div>
        <p class="error" v-if="errorInputEmpty">Value should not be empty!</p>
      </form>
    </div>
    <div class="loader" v-if="loader"></div>
    <div v-else class="container">
      <div v-if="collection.length" class="collection">
        <CollectionOfPhotos
          v-for="item in collection"
          :key="item.id"
          :item="item"
        />
      </div>
      <RandomPhoto v-else :photo="photo" />
    </div>
  </div>
</template>

<script>
import RandomPhoto from "@/components/RandomPhoto";
import CollectionOfPhotos from "@/components/CollectionOfPhotos";

export default {
  components: {
    RandomPhoto,
    CollectionOfPhotos,
  },
  data() {
    return {
      errorInputEmpty: false,
      inputQuery: "",
      loader: false,
      photo: {},
      collection: [],
      unsplashBaseUrl: "https://api.unsplash.com/",
      unsplashAccessKey: "pSBNMKu-4dNX_ePbWQ_XhiLhikczjUqOTCABxOCDkmE",
    };
  },
  created() {
    this.getRandomPhoto();
  },
  methods: {
    checkForm() {
      if (this.inputQuery.length !== 0) {
        return true;
      }
      this.errorInputEmpty = false;
      if (this.inputQuery.length === 0) {
        this.errorInputEmpty = true;
      }
    },
    getRandomPhoto() {
      this.loader = true;

      this.axios
        .get(
          `${this.unsplashBaseUrl}photos/random/?client_id=${this.unsplashAccessKey}`
        )
        .then((response) => {
          this.photo = response.data;
          this.loader = false;
        });
    },
    getPhotosCollection() {
      this.loader = true;

      this.axios
        .get(
          `${this.unsplashBaseUrl}search/collections/?client_id=${this.unsplashAccessKey}&per_page=20&query=${this.inputQuery}`
        )
        .then((response) => {
          this.collection = response.data.results;
          this.loader = false;
        });

      this.inputQuery = "";
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
  color: #000;
  background-color: #80919c;
}
.wrapper > * {
  margin-bottom: 1rem;
}
.title {
  padding: 30px 0 10px;
  color: #ccd755;
  text-align: center;
  word-wrap: break-word;
  font-family: Calistoga;
  font-size: 46px;
  line-height: 40px;
  text-shadow: 2px 2px 10px rgb(100, 100, 100);
}
.subtitle {
  font-weight: normal;
}
.search {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
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
.loader {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: no-repeat center center url(../assets/gif/loader.gif);
}
.container {
  width: 90%;
}
.collection {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1em;
  justify-content: center;
  align-items: start;
}
</style>
