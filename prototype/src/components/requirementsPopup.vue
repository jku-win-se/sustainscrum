<script setup>
import { useRequirementStore } from '@/stores/requirementStore'
const requirementStore = useRequirementStore()
</script>
<script>
export default {
  name: 'modalPopup',
  props: ['calculate'],
  methods: {
    close () {
      this.$emit('close')
    },
    scrollToTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h2>Select Requirement to Assess</h2>
          <v-virtual-scroll :items="requirementStore.requirements" height="300" item-height="50">
            <template v-slot:default="{ item }">
              <v-list-item>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <template v-slot:append>
                  <div v-if="item.assessed" style="margin-right: 20px; color: green">assessed</div>
                  <div v-else style="margin-right: 20px; color: darkred">not assessed</div>
                  <router-link :to="'/assessment/' + requirementStore.projectName + '/' + item.name" @click="scrollToTop">
                    <v-btn size="small" variant="tonal" style="width: 80px" @click="close">
                      <div v-if="item.assessed">Edit</div>
                      <div v-else>Assess</div>
                    </v-btn>
                  </router-link>
                </template>
              </v-list-item>
            </template>
          </v-virtual-scroll>
          <footer>
              <router-link :to="'/results/' + requirementStore.projectName">
                <button v-if="calculate" type="button" class="btn btn-secondary" @click="close" style="margin-right: 20px;">Calculate Results</button>
              </router-link>
            <button type="button" class="btn btn-secondary" @click="close">Close</button>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
.modal-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 700px !important;
  height: 500px !important;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.v-virtual-scroll__container {
  text-align: left;
}
.btn {
  color: white !important;
}
</style>
