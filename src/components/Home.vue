<template>
    <div class="row">
        <div id="home" class="col-sm-12 text-center">
            <div class="background">
                <h1>Welcome to App Order</h1>
                <h2>Don't want to wait?</h2>
                <button class="btn btn-success" @click="goToMenu">Let's order!</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    goToMenu() {
      this.$router.push({ name: "menuLink" });
    }
  }
};
</script>


<style>
#home {
  background: url("../../src/assets/7005443909_ddf26d7112_b.jpg");
  height: 800px;
  padding: 10%;
  background-repeat: no-repeat;
}
h1,
h2 {
  margin: 6%;
}

.background {
  background: #eee;
  opacity: 0.8;
  max-width: 60%;
  margin: 0 auto;
  padding: 20% 0;
}
</style>
