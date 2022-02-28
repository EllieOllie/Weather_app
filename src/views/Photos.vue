<template>
  <div class="photos">
    <h2 class="title">Collection of photos</h2>
    <p class="subtitle">Let's to find any photo</p>
    <form class="search-form" @submit.prevent="checkForm">
      <div class="search__input">
        <input
          type="text"
          placeholder="Enter..."
          autofocus
          v-model.trim="inputQuery"
        />
        <p class="error" v-if="errorInputEmpty">Value should not be empty!</p>
      </div>
      <button class="search__btn" type="submit" @click="getPhotosCollection">
        <img src="../assets/find.svg" alt="search" />
      </button>
    </form>
    <div class="loader" v-if="loader"></div>
    <div v-else class="photo-wrapper">
      <div class="collection" v-if="collection.length">
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
      this.inputQuery.length === 0
        ? (this.errorInputEmpty = true)
        : (this.errorInputEmpty = false);
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
.photos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
  background-color: #747679;
}
.title {
  padding: 30px 0 10px;
  color: #ccd755;
  text-align: center;
  word-wrap: break-word;
  font: 46px/40px Calistoga;
  text-shadow: 2px 2px 10px rgb(100, 100, 100);
}
.subtitle {
  font-weight: normal;
}
.search-form {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.search__input {
  display: flex;
  flex-direction: column;
}
input {
  height: 40px;
  padding-left: 15px;
  border: 2px solid #ccd755;
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
.search__btn {
  height: 40px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid #0e1011;
  border-radius: 8px;
  cursor: pointer;
}
.search__btn:hover {
  background-color: #ccd755;
  transition: all 0.7s ease-in-out;
}
.search__btn:active {
  border: 2px solid #ccd755;
  transform: scale(0.95);
  box-shadow: 2px 2px 10px #0e1011;
  transition: all 0.7s ease-in-out;
}
.search__btn img {
  width: 36px;
  padding: 2px 4px;
}
.error {
  color: #0e1011;
  text-align: center;
  font-size: 14px;
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
.photo-wrapper {
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
