<template>
  <div class="wrapper">
    <h2 class="title">Collection of photos</h2>
    <p class="subtitle">Let's go to find any photo</p>
    <PhotoSearchForm />
    <div class="container">
      <Photo :photo="photo" />
    </div>
  </div>
</template>

<script>
import PhotoSearchForm from "@/components/PhotoSearchForm";
import Photo from "@/components/Photo";

export default {
  components: {
    PhotoSearchForm,
    Photo,
  },
  data() {
    return {
      photo: {},
      unsplashUrlApi: "https://api.unsplash.com/photos/",
      unsplashAccessKey: "pSBNMKu-4dNX_ePbWQ_XhiLhikczjUqOTCABxOCDkmE",
    };
  },
  created() {
    this.fetchRandomPhoto();
  },
  methods: {
    fetchRandomPhoto() {
      this.axios
        .get(
          `${this.unsplashUrlApi}random/?client_id=${this.unsplashAccessKey}`
        )
        .then((response) => {
          this.photo = response.data;
          // console.log(response.data);
        });
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
  color: #000;
  background-color: #80919c;
}
.wrapper > * {
  margin-bottom: 15px;
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
.container {
  width: 90%;
}
</style>
