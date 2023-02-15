<script>
import NavbarComponent from './components/NavbarComponent.vue';
import ProductsComponent from './components/ProductsComponent.vue';
import CardComponent from './components/CardComponent.vue';

export default {
  
  components: {
    NavbarComponent,
    ProductsComponent,
    CardComponent
  }
}
</script>

<template>
  <div class="container">
    <Navbar-component></Navbar-component>
    <Card-component></Card-component>
    <Products-component></Products-component>
  </div>
</template>

<style lang="scss">
@import "./assets/all.scss";
</style>
