<template>
  <div class="row">
    <div class="column">
      <h2 style="text-align: left">{{dimension}}</h2>
    </div>
    <div class="column">
      <p style="text-align: center">Rating</p>
      <div class="column" style="width: 10% !important;">
        <img src="@/assets/red_arrow.png" style="width: 50px"/>
      </div>
      <div class="column" style="width: 40% !important;">
        <p>negative Impact</p>
      </div>
      <div class="column" style="width: 40% !important;">
        <p>positive Impact</p>
      </div>
      <div class="column" style="width: 10% !important;">
        <img src="@/assets/green_arrow.png" style="width: 50px"/>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="column" style="width: 35% !important;"></div>
    <div class="column" style="width: 15% !important;">
      <p>irrelevant
        <v-tooltip activator="parent" location="top">Check if Question is irrelevant to this requirement</v-tooltip>
      </p>
    </div>
    <div class="column" style="width: 50% !important;">
      <div class="column" style="width: 20% !important; text-align: left">
        DIRECT
      </div>
      <div class="column" style="width: 20% !important; text-align: left">
        INDIRECT
      </div>
      <div class="column" style="width: 20% !important;">
        NO IMPACT
      </div>
      <div class="column" style="width: 20% !important; text-align: right">
        INDIRECT
      </div>
      <div class="column" style="width: 20% !important; text-align: right">
        DIRECT
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['dimension']
}
</script>
<style scoped>
.row {
  height: 60px
}
</style>
