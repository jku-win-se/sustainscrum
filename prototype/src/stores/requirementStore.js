import { defineStore } from 'pinia'
import { useDimensionStore } from '@/stores/dimensionStore'

export const useRequirementStore = defineStore('requirementStore', {
  state: () => {
    return {
      requirements: [],
      rowOneTable: [],
      transformedTable: [],
      best: [],
      worst: [],
      maxValues: [],
      minValues: [],
      projectName: '',
      dimensionWeights: {
        Social: 1,
        Individual: 1,
        Environmental: 1,
        Economic: 1,
        Technical: 1
      }
    }
  },
  // actions
  actions: {
    addRequirement (name, rating) {
      if (this.getRequirement(name)) {
        alert('Requirement already exists!')
        return
      }
      if (name.length === 0) {
        alert('Name is empty!')
        return
      }
      if (name.includes('/')) {
        alert('Character "/" is not allowed!')
        return
      }
      if (rating > 9) rating = 9
      const length = this.requirements.push({
        name: name,
        relevance: rating,
        questions: [],
        irrelQuest: [],
        assessed: false
      })
      this.requirements[length - 1].questions.length = 55
      this.requirements[length - 1].questions.fill(3)
      this.requirements[length - 1].irrelQuest.length = 55
      this.requirements[length - 1].irrelQuest.fill(false)
    },
    removeRequirement (name) {
      let i = 0 // this.requirements.lastIndexOf(name)
      while (i < this.requirements.length) {
        if (this.requirements[i].name === name) {
          break
        }
        i++
      }
      if (this.requirements.length > 1) {
        this.requirements.splice(i, 1)
      } else {
        this.requirements = []
      }
    },
    isAssessed () {
      let i = 0
      while (i < this.requirements.length) {
        if (this.requirements[i].assessed) return true
        i++
      }
      return false
    },
    getRequirement (name) {
      let i = 0
      while (i < this.requirements.length) {
        if (this.requirements[i].name === name) {
          return this.requirements[i]
        }
        i++
      }
      return null
    },
    mapDimensions () {
      const dimensionStore = useDimensionStore()
      const result = []
      result.length = 55
      result.fill(false)
      if (dimensionStore.selectedDimensions.Social) {
        if (dimensionStore.selectedDimensions.soc1) result[0] = true
        if (dimensionStore.selectedDimensions.soc2) result[1] = true
        if (dimensionStore.selectedDimensions.soc3) {
          result[2] = true
          result[3] = true
        }
        if (dimensionStore.selectedDimensions.soc4) result[4] = true
        if (dimensionStore.selectedDimensions.soc5) {
          result[5] = true
          result[6] = true
          result[7] = true
        }
      }
      if (dimensionStore.selectedDimensions.Individual) {
        if (dimensionStore.selectedDimensions.ind1) result[8] = true
        if (dimensionStore.selectedDimensions.ind2) result[9] = true
        if (dimensionStore.selectedDimensions.ind3) result[10] = true
        if (dimensionStore.selectedDimensions.ind4) {
          result[11] = true
          result[12] = true
          result[13] = true
        }
        if (dimensionStore.selectedDimensions.ind5) {
          result[14] = true
          result[15] = true
        }
      }
      if (dimensionStore.selectedDimensions.Environmental) {
        if (dimensionStore.selectedDimensions.env1) {
          result[16] = true
          result[17] = true
          result[18] = true
        }
        if (dimensionStore.selectedDimensions.env2) {
          result[19] = true
          result[20] = true
          result[21] = true
          result[22] = true
        }
        if (dimensionStore.selectedDimensions.env3) {
          result[23] = true
          result[24] = true
        }
        if (dimensionStore.selectedDimensions.env4) {
          result[25] = true
          result[26] = true
          result[27] = true
        }
        if (dimensionStore.selectedDimensions.env5) {
          result[28] = true
          result[29] = true
        }
      }
      if (dimensionStore.selectedDimensions.Economic) {
        if (dimensionStore.selectedDimensions.eco1) {
          result[30] = true
          result[31] = true
        }
        if (dimensionStore.selectedDimensions.eco2) {
          result[32] = true
          result[33] = true
          result[34] = true
        }
        if (dimensionStore.selectedDimensions.eco3) {
          result[35] = true
          result[36] = true
          result[37] = true
        }
        if (dimensionStore.selectedDimensions.eco4) {
          result[38] = true
          result[39] = true
          result[40] = true
        }
        if (dimensionStore.selectedDimensions.eco5) {
          result[41] = true
          result[42] = true
          result[43] = true
        }
      }
      if (dimensionStore.selectedDimensions.Technical) {
        if (dimensionStore.selectedDimensions.tec1) {
          result[44] = true
          result[45] = true
        }
        if (dimensionStore.selectedDimensions.tec2) result[46] = true
        if (dimensionStore.selectedDimensions.tec3) {
          result[47] = true
          result[48] = true
          result[49] = true
        }
        if (dimensionStore.selectedDimensions.tec4) {
          result[50] = true
          result[51] = true
          result[52] = true
        }
        if (dimensionStore.selectedDimensions.tec5) {
          result[53] = true
          result[54] = true
        }
      }
      dimensionStore.setTransformedDim(result)
    },
    mapRequirementsIrrel () {
      const dimensionStore = useDimensionStore()
      for (let i = 0; i < this.requirements.length; i++) {
        for (let ind = 0; ind < 55; ind++) {
          if (!this.requirements[i].irrelQuest[ind] && !dimensionStore.mappedIrrelQuests[ind]) this.requirements[i].irrelQuest[ind] = true
        }
      }
    },
    getIndicator (id, start, end) {
      let result = NaN
      let bestDistance = 0
      let worstDistance = 0
      let bestSum = 0
      let worstSum = 0
      for (let questInd = start; questInd < end; questInd++) {
        if (!this.requirements[id].irrelQuest[questInd]) {
          bestSum += this.best[id].values[questInd]
          worstSum += this.worst[id].values[questInd]
        }
      }
      bestDistance = Math.sqrt(bestSum)
      worstDistance = Math.sqrt(worstSum)
      if (worstDistance + bestDistance < 0.00001) result = 1
      else result = worstDistance / (worstDistance + bestDistance)
      console.log('rowOneTable: ')
      console.log(this.rowOneTable)
      console.log('transformed: ')
      console.log(this.transformedTable)
      console.log('best table: ')
      console.log(this.best)
      console.log('worst table: ')
      console.log(this.worst)
      console.log(result)
      return result
    },
    calculateResults () {
      this.rowOneTable = []
      this.rowOneTable = []
      this.dimensionWeights = {
        Social: 1,
        Individual: 1,
        Environmental: 1,
        Economic: 1,
        Technical: 1
      }
      this.transformedTable = []
      this.minValues = []
      this.maxValues = []
      this.best = []
      this.worst = []
      this.maxValues.length = 55
      this.minValues.length = 55
      this.maxValues.fill(0)
      this.minValues.fill(1)
      this.mapRequirementsIrrel()
      this.rowOneTable = this.calculateRowOneTable()
      this.calculateDimensionWeights()
      this.calculateTransformedTable()
      this.calculateBestnWorstTable()
    },
    calculateBestnWorstTable () {
      for (let index = 0; index < this.requirements.length; index++) {
        if (!this.requirements[index].assessed) continue
        this.best.push({
          values: []
        })
        this.worst.push({
          values: []
        })
        for (let ind = 0; ind < 55; ind++) {
          let valBest = NaN
          let valWorst = NaN
          if (!this.requirements[index].irrelQuest[ind]) {
            valBest = Math.pow(this.transformedTable[index].values[ind] - this.maxValues[ind], 2)
            valWorst = Math.pow(this.transformedTable[index].values[ind] - this.minValues[ind], 2)
          }
          this.best[index].values.push(valBest)
          this.worst[index].values.push(valWorst)
        }
      }
    },
    calculateTransformedTable () {
      for (let index = 0; index < this.requirements.length; index++) {
        if (!this.requirements[index].assessed) continue
        // calculate weights of each question per dimension
        const questionSum = [0, 0, 0, 0, 0]
        for (let ind = 0; ind < 8; ind++) {
          if (!this.requirements[index].irrelQuest[ind]) questionSum[0]++
        }
        for (let ind = 8; ind < 16; ind++) {
          if (!this.requirements[index].irrelQuest[ind]) questionSum[1]++
        }
        for (let ind = 16; ind < 30; ind++) {
          if (!this.requirements[index].irrelQuest[ind]) questionSum[2]++
        }
        for (let ind = 30; ind < 44; ind++) {
          if (!this.requirements[index].irrelQuest[ind]) questionSum[3]++
        }
        for (let ind = 44; ind < 55; ind++) {
          if (!this.requirements[index].irrelQuest[ind]) questionSum[4]++
        }
        this.transformedTable.push({
          values: []
        })
        console.log('irrel question of requirement:')
        console.log(this.requirements[index])
        for (let ind = 0; ind < 55; ind++) {
          let numb = NaN
          if (!this.requirements[index].irrelQuest[ind]) {
            console.log('question relevant')
            if (ind < 8) {
              console.log('calculating numb: requirements[index].questions[ind] / rowOneTable[ind] * dimensionWeights.Social / questionSum[0]')
              console.log(this.requirements[index].questions[ind])
              console.log(this.rowOneTable[ind])
              console.log(this.dimensionWeights.Social)
              console.log(questionSum[0])
              numb = this.requirements[index].questions[ind] / this.rowOneTable[ind] * (this.dimensionWeights.Social / questionSum[0])
              console.log('numb = ' + numb)
            } else if (ind < 16) {
              numb = this.requirements[index].questions[ind] / this.rowOneTable[ind] * (this.dimensionWeights.Social / questionSum[1])
            } else if (ind < 30) {
              numb = this.requirements[index].questions[ind] / this.rowOneTable[ind] * (this.dimensionWeights.Social / questionSum[2])
            } else if (ind < 44) {
              numb = this.requirements[index].questions[ind] / this.rowOneTable[ind] * (this.dimensionWeights.Social / questionSum[3])
            } else if (ind < 55) numb = this.requirements[index].questions[ind] / this.rowOneTable[ind] * (this.dimensionWeights.Social / questionSum[4])
            if (numb > this.maxValues[ind]) this.maxValues[ind] = numb
            if (numb < this.minValues[ind]) this.minValues[ind] = numb
          }
          this.transformedTable[index].values.push(numb)
        }
      }
    },
    calculateDimensionWeights () {
      const dimensionStore = useDimensionStore()
      let sum = 0
      if (dimensionStore.selectedDimensions.Social) sum += dimensionStore.selectedDimensions.SocialRating
      if (dimensionStore.selectedDimensions.Individual) sum += dimensionStore.selectedDimensions.IndividualRating
      if (dimensionStore.selectedDimensions.Environmental) sum += dimensionStore.selectedDimensions.EnvironmentalRating
      if (dimensionStore.selectedDimensions.Economic) sum += dimensionStore.selectedDimensions.EconomicRating
      if (dimensionStore.selectedDimensions.Technical) sum += dimensionStore.selectedDimensions.TechnicalRating
      this.dimensionWeights.Social = dimensionStore.selectedDimensions.SocialRating / sum
      this.dimensionWeights.Individual = dimensionStore.selectedDimensions.IndividualRating / sum
      this.dimensionWeights.Environmental = dimensionStore.selectedDimensions.EnvironmentalRating / sum
      this.dimensionWeights.Economic = dimensionStore.selectedDimensions.EconomicRating / sum
      this.dimensionWeights.Technical = dimensionStore.selectedDimensions.TechnicalRating / sum
    },
    calculateRowOneTable () {
      for (let index = 0; index < 55; index++) {
        let sum = 0
        for (let ind = 0; ind < this.requirements.length; ind++) {
          if (!this.requirements[ind].irrelQuest[index] && this.requirements[ind].assessed) sum += Math.pow(this.requirements[ind].questions[index], 2)
        }
        this.rowOneTable.push(Math.sqrt(sum))
      }
      return this.rowOneTable
    }
  },
  // getters
  getters: {
    getHelperTable () {
      return this.rowOneTable
    },
    getTransformedTable () {
      return this.rowOneTable
    }
  }
})
