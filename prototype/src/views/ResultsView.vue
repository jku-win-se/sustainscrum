<template>
  <div class="results">
    <h1>Assessment Results</h1>
    <h3 style="text-align: left">Overall sustainability indicators per dimension</h3>
    <v-data-table-virtual
      :items="virtualDimIndicators"
      height="120"
      item-value="name"
      style="margin-bottom: 60px;"
    >
      <template v-slot:item.social="{ value }">
        <v-chip :color="getColor(value)">
          {{value}}
          <v-tooltip activator="parent" location="top">{{ getTooltip(value) }}</v-tooltip>
        </v-chip>
      </template>
      <template v-slot:item.individual="{ value }">
        <v-chip :color="getColor(value)">
          {{value}}
          <v-tooltip activator="parent" location="top">{{ getTooltip(value) }}</v-tooltip>
        </v-chip>
      </template>
      <template v-slot:item.environmental="{ value }">
        <v-chip :color="getColor(value)">
          {{value}}
          <v-tooltip activator="parent" location="top">{{ getTooltip(value) }}</v-tooltip>
        </v-chip>
      </template>
      <template v-slot:item.economic="{ value }">
        <v-chip :color="getColor(value)">
          {{value}}
          <v-tooltip activator="parent" location="top">{{ getTooltip(value) }}</v-tooltip>
        </v-chip>
      </template>
      <template v-slot:item.technical="{ value }">
        <v-chip :color="getColor(value)">
          {{value}}
          <v-tooltip activator="parent" location="top">{{ getTooltip(value) }}</v-tooltip>
        </v-chip>
      </template>
      <template v-slot:item.indicator="{ value }">
        <v-chip :color="getColor(value)">
          {{value}}
          <v-tooltip activator="parent" location="top">{{ getTooltip(value) }}</v-tooltip>
        </v-chip>
      </template>
    </v-data-table-virtual>
    <h3 style="text-align: left">Sustainability indicators per requirement</h3>
    <v-data-table-virtual
      fixed-header
      :items="virtualRequirements"
      height="400"
      item-value="name"
      style="margin-bottom: 60px;"
    >
      <template v-slot:item.social="{ value }">
        <v-chip :color="getColor(value)">
          {{value}}
          <v-tooltip activator="parent" location="top">{{ getTooltip(value) }}</v-tooltip>
        </v-chip>
      </template>
      <template v-slot:item.individual="{ value }">
        <v-chip :color="getColor(value)">
          {{value}}
          <v-tooltip activator="parent" location="top">{{ getTooltip(value) }}</v-tooltip>
        </v-chip>
      </template>
      <template v-slot:item.environmental="{ value }">
        <v-chip :color="getColor(value)">
          {{value}}
          <v-tooltip activator="parent" location="top">{{ getTooltip(value) }}</v-tooltip>
        </v-chip>
      </template>
      <template v-slot:item.economic="{ value }">
        <v-chip :color="getColor(value)">
          {{value}}
          <v-tooltip activator="parent" location="top">{{ getTooltip(value) }}</v-tooltip>
        </v-chip>
      </template>
      <template v-slot:item.technical="{ value }">
        <v-chip :color="getColor(value)">
          {{value}}
          <v-tooltip activator="parent" location="top">{{ getTooltip(value) }}</v-tooltip>
        </v-chip>
      </template>
      <template v-slot:item.indicator="{ value }">
        <v-chip :color="getColor(value)">
          {{value}}
          <v-tooltip activator="parent" location="top">{{ getTooltip(value) }}</v-tooltip>
        </v-chip>
      </template>
    </v-data-table-virtual>
    <div>
      <button @click="showModal" class="btn btn-secondary" style="margin-right: 20px">Edit assessment</button>
      <button @click="downloadCsv" class="btn btn-secondary" style="margin-right: 20px">Download as .csv</button>
      <button @click="downloadProject" class="btn btn-secondary" style="margin-right: 20px">Save Assessment</button>
      <a href="/">
        <button class="btn btn-secondary">Assess new project</button>
      </a>
    </div>
    <modal-popup v-show="isModalVisible" @close="closeModal" projectName="{{projectName}}"/>
  </div>
</template>

<script>
import modalPopup from '@/components/requirementsPopup.vue'
import { useRequirementStore } from '@/stores/requirementStore'
import { useDimensionStore } from '@/stores/dimensionStore'
import questionsCatalogue from '@/assets/questions-catalogue.json'
// @ is an alias to /src
export default {
  name: 'ResultsView',
  props: ['projectName'],
  setup () {
    const requirementStore = useRequirementStore()
    const dimensionStore = useDimensionStore()
    // calculating requirements indicators
    const virtualRequirements = []
    requirementStore.calculateResults()
    for (let i = 0; i < requirementStore.requirements.length; i++) {
      if (!requirementStore.requirements[i].assessed) continue
      virtualRequirements.push({
        name: requirementStore.requirements[i].name,
        rating: requirementStore.requirements[i].relevance
      })
      if (dimensionStore.selectedDimensions.Social) virtualRequirements[i].social = requirementStore.getIndicator(i, 0, 8).toFixed(4)
      if (dimensionStore.selectedDimensions.Individual) virtualRequirements[i].individual = requirementStore.getIndicator(i, 8, 16).toFixed(4)
      if (dimensionStore.selectedDimensions.Environmental) virtualRequirements[i].environmental = requirementStore.getIndicator(i, 16, 30).toFixed(4)
      if (dimensionStore.selectedDimensions.Economic) virtualRequirements[i].economic = requirementStore.getIndicator(i, 30, 44).toFixed(4)
      if (dimensionStore.selectedDimensions.Technical) virtualRequirements[i].technical = requirementStore.getIndicator(i, 44, 55).toFixed(4)
      virtualRequirements[i].indicator = requirementStore.getIndicator(i, 0, 55).toFixed(4)
    }
    // calculating overall indicators
    const virtualDimIndicators = []
    const sums = [0, 0, 0, 0, 0, 0]
    virtualDimIndicators.push({ name: requirementStore.projectName })
    for (let i = 0; i < virtualRequirements.length; i++) {
      sums[0] += parseFloat(virtualRequirements[i].social)
      sums[1] += parseFloat(virtualRequirements[i].individual)
      sums[2] += parseFloat(virtualRequirements[i].environmental)
      sums[3] += parseFloat(virtualRequirements[i].economic)
      sums[4] += parseFloat(virtualRequirements[i].technical)
      sums[5] += parseFloat(virtualRequirements[i].indicator)
    }
    const count = virtualRequirements.length
    if (dimensionStore.selectedDimensions.Social) virtualDimIndicators[0].social = (sums[0] / count).toFixed(4)
    if (dimensionStore.selectedDimensions.Individual) virtualDimIndicators[0].individual = (sums[1] / count).toFixed(4)
    if (dimensionStore.selectedDimensions.Environmental) virtualDimIndicators[0].environmental = (sums[2] / count).toFixed(4)
    if (dimensionStore.selectedDimensions.Economic) virtualDimIndicators[0].economic = (sums[3] / count).toFixed(4)
    if (dimensionStore.selectedDimensions.Technical) virtualDimIndicators[0].technical = (sums[4] / count).toFixed(4)
    virtualDimIndicators[0].indicator = (sums[5] / count).toFixed(4)
    return {
      requirementStore,
      dimensionStore,
      virtualRequirements,
      virtualDimIndicators
    }
  },
  data: () => ({
    isModalVisible: false,
    csvData: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
  }),
  components: {
    modalPopup
  },
  methods: {
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    downloadCsv () {
      const requirementStore = useRequirementStore()
      const dimensionStore = useDimensionStore()
      let csv = 'Assessment: ' + requirementStore.projectName + '\n' + 'Requirement;Stakeholder Rating'
      for (let i = 0; i < 55; i++) {
        csv += ';' + questionsCatalogue[i]
      }
      for (let i = 0; i < requirementStore.requirements.length; i++) {
        if (!requirementStore.requirements[i].assessed) continue
        csv += '\n'
        csv += requirementStore.requirements[i].name + ';' + requirementStore.requirements[i].relevance
        for (let ind = 0; ind < 55; ind++) {
          if (requirementStore.requirements[i].irrelQuest[ind]) csv += ';x'
          else csv += ';' + requirementStore.requirements[i].questions[ind]
        }
      }
      csv += '\n\nResults:\nProject'
      if (dimensionStore.selectedDimensions.Social) csv += ';Social'
      if (dimensionStore.selectedDimensions.Individual) csv += ';Individual'
      if (dimensionStore.selectedDimensions.Environmental) csv += ';Environmental'
      if (dimensionStore.selectedDimensions.Economic) csv += ';Economic'
      if (dimensionStore.selectedDimensions.Technical) csv += ';Technical'
      csv += ';Sustainability Indicator\n' + this.requirementStore.projectName
      if (dimensionStore.selectedDimensions.Social) csv += ';' + this.virtualDimIndicators[0].social.replace('.', ',')
      if (dimensionStore.selectedDimensions.Individual) csv += ';' + this.virtualDimIndicators[0].individual.replace('.', ',')
      if (dimensionStore.selectedDimensions.Environmental) csv += ';' + this.virtualDimIndicators[0].environmental.replace('.', ',')
      if (dimensionStore.selectedDimensions.Economic) csv += ';' + this.virtualDimIndicators[0].economic.replace('.', ',')
      if (dimensionStore.selectedDimensions.Technical) csv += ';' + this.virtualDimIndicators[0].technical.replace('.', ',')
      csv += ';' + this.virtualDimIndicators[0].indicator.replace('.', ',')
      csv += '\n\nRequirement;Stakeholder Rating'
      if (dimensionStore.selectedDimensions.Social) csv += ';Social'
      if (dimensionStore.selectedDimensions.Individual) csv += ';Individual'
      if (dimensionStore.selectedDimensions.Environmental) csv += ';Environmental'
      if (dimensionStore.selectedDimensions.Economic) csv += ';Economic'
      if (dimensionStore.selectedDimensions.Technical) csv += ';Technical'
      csv += ';Sustainability Indicator'
      for (let i = 0; i < requirementStore.requirements.length; i++) {
        if (!requirementStore.requirements[i].assessed) continue
        csv += '\n'
        csv = csv + requirementStore.requirements[i].name + ';' + requirementStore.requirements[i].relevance
        if (dimensionStore.selectedDimensions.Social) csv += ';' + this.virtualRequirements[i].social.replace('.', ',')
        if (dimensionStore.selectedDimensions.Individual) csv += ';' + this.virtualRequirements[i].individual.replace('.', ',')
        if (dimensionStore.selectedDimensions.Environmental) csv += ';' + this.virtualRequirements[i].environmental.replace('.', ',')
        if (dimensionStore.selectedDimensions.Economic) csv += ';' + this.virtualRequirements[i].economic.replace('.', ',')
        if (dimensionStore.selectedDimensions.Technical) csv += ';' + this.virtualRequirements[i].technical.replace('.', ',')
        csv += ';' + this.virtualRequirements[i].indicator.replace('.', ',')
      }
      const download = document.createElement('a')
      download.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv))
      download.setAttribute('download', requirementStore.projectName + '.csv')
      document.body.appendChild(download)
      download.click()
      download.remove()
    },
    downloadProject () {
      const requirementStore = useRequirementStore()
      const dimensionStore = useDimensionStore()
      const projectStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(requirementStore) + ';division-here;' + JSON.stringify(dimensionStore))
      const download = document.createElement('a')
      download.setAttribute('href', projectStr)
      download.setAttribute('download', requirementStore.projectName + '.json')
      document.body.appendChild(download)
      download.click()
      download.remove()
    },
    getColor (indicator) {
      if (indicator > 0.9) return '#329a00'
      else if (indicator > 0.8) return '#5f9f00'
      else if (indicator > 0.7) return '#6ca900'
      else if (indicator > 0.6) return '#6a9400'
      else if (indicator > 0.5) return '#7c8a00'
      else if (indicator > 0.4) return '#c4ac00'
      else if (indicator > 0.3) return '#a47f00'
      else if (indicator > 0.2) return '#a95b00'
      else if (indicator > 0.1) return '#982d00'
      else return '#800000'
    },
    getTooltip (indicator) {
      if (indicator > 0.7) return 'strong positive sustainability impact'
      else if (indicator > 0.5) return 'slight positive sustainability impact'
      else if (indicator > 0.3) return 'slight negative sustainability impact'
      else return 'strong negative sustainability impact'
    }
  }
}
</script>
<style>

table {
  text-align: left;
}

.v-data-table__th {
  font-weight: bold !important;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.results {
  width: 1200px;
  padding: 50px;
  margin: auto;
}

textarea {
  width: 80%;
  text-align: center;
}

h3, h4 {
  text-align: left;
}

</style>
