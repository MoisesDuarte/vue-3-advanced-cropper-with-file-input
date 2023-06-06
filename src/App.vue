<template>
  <div id="app">
    <ImageCropper />
  </div>
</template>

<script>
import ImageCropper from './components/ImageCropper';

export default {
  name: 'App',
  components: {
    ImageCropper,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 16px;
}
</style>
