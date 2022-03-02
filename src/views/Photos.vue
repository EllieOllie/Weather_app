<template>
  <div class="photos">
    <h2 class="title">Collection of photos</h2>
    <p class="subtitle">Let's to find any photo</p>
    <PhotoSearchForm @getPhotosCollection="getPhotosCollection" />
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
import PhotoSearchForm from "@/components/PhotoSearchForm";
import RandomPhoto from "@/components/RandomPhoto";
import CollectionOfPhotos from "@/components/CollectionOfPhotos";

export default {
  components: {
    PhotoSearchForm,
    RandomPhoto,
    CollectionOfPhotos,
  },
  data() {
    return {
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
    getPhotosCollection(data) {
      this.inputQuery = data;
      this.loader = true;

      this.axios
        .get(
          `${this.unsplashBaseUrl}search/collections/?client_id=${this.unsplashAccessKey}&per_page=20&query=${this.inputQuery}`
        )
        .then((response) => {
          this.collection = response.data.results;
          this.loader = false;
        });
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
  background-color: #c5c0bb;
}
.title {
  padding: 0 0 10px;
  color: #ccd755;
  text-align: center;
  word-wrap: break-word;
  font: 46px/40px Calistoga;
  text-shadow: 2px 2px 10px rgb(100, 100, 100);
}
.subtitle {
  font-weight: normal;
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
@media (max-width: 500px) {
  .title {
    font-size: 35px;
  }
}
</style>
