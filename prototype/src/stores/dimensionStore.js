import { defineStore } from 'pinia'
import selectedDimensions from '@/assets/dimensions.json'
export const useDimensionStore = defineStore('selectedDimensionstore', {
  state: () => {
    return {
      selectedDimensions,
      mappedIrrelQuests: []
    }
  },
  actions: {
    toggleDim (name) {
      // this.selectedDimensions.Social = !this.selectedDimensions.Social
      console.log(name)
      console.log(this.selectedDimensions.Social)
    },
    setTransformedDim (transformed) {
      this.mappedIrrelQuests = transformed
    }
  }
  // getters
})
