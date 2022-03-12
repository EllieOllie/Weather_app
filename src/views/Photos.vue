<template>
  <div class="photos">
    <h2 class="title">Collection of photos</h2>
    <p class="subtitle">Let's to find any photo</p>
    <PhotoSearchForm @getPhotosCollection="getPhotosCollection" />
    <div v-if="errored" class="error">
      <p>
        We're sorry, we're not able to retrieve this information at the moment,
        please try back later
      </p>
    </div>
    <div class="loader" v-if="loader"></div>
    <div class="photo-wrapper" v-else>
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
      errored: false,
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
    getRandomPhoto: async function () {
      this.loader = true;
      try {
        const response = await this.axios(
          `${this.unsplashBaseUrl}photos/random/?client_id=${this.unsplashAccessKey}`
        );
        this.photo = await response.data;
      } catch (error) {
        console.log(error);
        this.errored = true;
      } finally {
        this.loader = false;
      }
    },
    getPhotosCollection: async function (data) {
      this.inputQuery = data;
      this.loader = true;
      try {
        const response = await this.axios(
          `${this.unsplashBaseUrl}search/collections/?client_id=${this.unsplashAccessKey}&per_page=20&query=${this.inputQuery}`
        );
        this.collection = await response.data.results;
      } catch (error) {
        console.log(error);
        this.errored = true;
      } finally {
        this.loader = false;
      }
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
  background-color: #ccc7c2;
}
.title {
  padding: 0 0 10px;
  color: #ccd755;
  text-align: center;
  word-wrap: break-word;
  font: 46px/40px Calistoga;
  text-shadow: 2px 2px 10px rgb(100, 100, 100);
}
.subtitle,
.error {
  color: #0e1011;
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
