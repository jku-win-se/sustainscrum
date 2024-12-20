<template>
  <div class="assessment">
    <h1>Assess Software Requirement</h1>
    <div class="row">
      <div class="column">
        <h4>Assess Requirement: {{ requirementName }}</h4>
      </div>
      <div class="column">
        <h4 style="text-align: right">Project: {{ projectName }}</h4>
      </div>
    </div>
    For the following questions, answer if it is relevant and what impact the requirement has on it
    <hr>
      <div v-for="n in 55" :key="n">
          <div v-if="n===1 && dimensionStore.selectedDimensions.Social">
              <impact-legend dimension="Social"/>
          </div>
          <div v-else-if="n===9 && dimensionStore.selectedDimensions.Individual">
              <impact-legend dimension="Individual"/>
          </div>
          <div v-else-if="n===17 && dimensionStore.selectedDimensions.Environmental">
              <impact-legend dimension="Environmental"/>
          </div>
          <div v-else-if="n===31 && dimensionStore.selectedDimensions.Economic">
              <impact-legend dimension="Economic"/>
          </div>
          <div v-else-if="n===45 && dimensionStore.selectedDimensions.Technical">
              <impact-legend dimension="Technical"/>
          </div>
          <div v-if="dimensionStore.mappedIrrelQuests[n-1]">
              <div class="row">
                  <div class="column" style="width: 35% !important; text-align: left">
                      <p>
                          {{ questions[n - 1] }}
                          <v-tooltip activator="parent" location="top">{{ tooltips[n - 1] }}</v-tooltip>
                      </p>
                  </div>
                  <div class="column" style="width: 15% !important;">
                      <input type="checkbox" class="largerCheckbox"
                             v-model="requirementStore.getRequirement(requirementName).irrelQuest[n-1]">
                  </div>
                  <div class="column" style="width: 50% !important;">
                      <div class="slidecontainer">
                          <input type="range" min="1" max="5" value="3" class="slider"
                                 :class="{'slider-red':requirementStore.getRequirement(requirementName).questions[n-1]<3,'slider-green':requirementStore.getRequirement(requirementName).questions[n-1]>3, 'grayed':requirementStore.getRequirement(requirementName).irrelQuest[n-1]}"
                                 v-model="requirementStore.getRequirement(requirementName).questions[n-1]">
                          <v-tooltip activator="parent" location="top">
                              {{ getTooltip(requirementStore.getRequirement(requirementName).questions[n - 1]) }}
                          </v-tooltip>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
    <div>
    <button @click="downloadProject()" class="btn btn-secondary" style="margin-right: 20px">Save Assessment</button>
    <button @click="showModal(); requirementStore.getRequirement(requirementName).assessed = true"
            class="btn btn-secondary">Next Requirement
    </button>
    <modal-popup v-show="isModalVisible" @close="closeModal" @assess="closeModal" calculate="true"
                 projectName="{{projectName}}"/>
  </div>
</template>
<script>
import { useRequirementStore } from '@/stores/requirementStore'
import { useDimensionStore } from '@/stores/dimensionStore'
import impactLegend from '@/components/impactLegend.vue'
import modalPopup from '@/components/requirementsPopup.vue'
import questionsCatalogue from '@/assets/questions-catalogue.json'
import questionsTooltips from '@/assets/questions-tooltips.json'

export default {
  name: 'AssessmentView',
  props: ['requirementName', 'projectName'],
  setup () {
    const requirementStore = useRequirementStore()
    const dimensionStore = useDimensionStore()
    const questions = questionsCatalogue
    const tooltips = questionsTooltips
    return {
      requirementStore,
      dimensionStore,
      questions,
      tooltips
    }
  },
  data () {
    return {
      isModalVisible: false
    }
  },
  methods: {
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    getTooltip (value) {
      switch (value) {
        case '5': return 'direct positive sustainability impact'
        case '4': return 'indirect positive sustainability impact'
        case 3:
        case '3': return 'no sustainability impact'
        case '2': return 'indirect negative sustainability impact'
        case '1': return 'direct negative sustainability impact'
        default: return 'error'
      }
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
    }
  },
  components: {
    modalPopup,
    impactLegend
  }
}
</script>
<style scoped>
.column {
  float: left;
  width: 50%;
  height: 60px;
  vertical-align: center;
}

.grayed {
  background-color: #eee !important;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.assessment {
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

.row {
  height: 106px;
}

.slider-red {
  background-color: #ea5656;
}

.slider-green {
  background-color: #4cc56b;
}

.slider {
  width: 95%;
}
</style>
