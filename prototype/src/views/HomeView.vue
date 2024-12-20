<template>
  <div class="home">
    <h1>Assess new Softwareproject</h1>
    <div class="row">
      <div class="column">
        <h4>Project Name</h4>
      </div>
      <div class="column">
        <textarea placeholder="Name" rows="1" wrap="soft" class="form-control"
                  style="resize: none; height: 20px;"
                  type="text" v-model="requirementStore.projectName"></textarea>
      </div>
    </div>
    <div class="row" style="height: 120px">
      <div class="column" style="width: 100% !important;">
        Or import existing project (*.json File):
        <input type="file" accept="application/json" @change="onFileChange">
      </div>
    </div>
    <h2>Add Requirements</h2>
    <div class="row">
      <div class="column">
        <h4>Requirement</h4>
      </div>
      <div class="column">
        <h4 style="text-align: center">
            Stakeholder Rating
            <v-tooltip activator="parent" location="top">Relevance of the requirement in this project</v-tooltip>
        </h4>
        <div class="column" style="text-align: left">
          very irrelevant
        </div>
        <div class="column" style="text-align: right">
          very relevant
        </div>
      </div>
    </div>
    <div v-for="requirement in requirementStore.requirements" :key="requirement.name">
      <div class="row">
        <div class="left-column">
          <button @click="requirementStore.removeRequirement(requirement.name)" class="btn btn-secondary">Delete</button>
        </div>
        <div class="mid-column" style="text-align: left">
          <p>{{requirement.name}}</p>
        </div>
        <div class="mid-column">
          <div class="slidecontainer">
            <input type="range" min="1" max="9" v-model="requirement.relevance" class="slider">
          </div>
          <p></p>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top: 20px !important;">
      <div class="left-column" style="width: 10% !important;">
        <button @click="requirementStore.addRequirement(tempRequirementName, tempRequirementValue); resetData()" class="btn btn-secondary">Add</button>
      </div>
      <div class="mid-column" style="width: 45% !important; text-align: left">
        <input type="text" placeholder="Requirement" wrap="soft" style="width: 100%" v-model="tempRequirementName"
               @keydown.enter="requirementStore.addRequirement(tempRequirementName, tempRequirementValue); resetData()">
      </div>
      <div class="mid-column" style="width: 45% !important;">
        <div class="slidecontainer">
          <input type="range" min="1" max="9" value="5" class="slider" v-model="tempRequirementValue">
        </div>
      </div>
    </div>
    <p></p>
    Import Requirements.csv:
    <vue-csv-import v-model="mappedCsv" :fields="fields">
      <vue-csv-errors/>
      <div class="btn btn-secondary">
        <vue-csv-input/>
      </div>
      <vue-csv-toggle-headers style="margin-left: 20px"/>
      <div class="row" style="text-align: left; height: 120px !important; margin-top: 10px !important;" :class="{'hidden':isImportRowVisible}">
        <div class="column">
          <div v-if="mappedCsv!=null" style="text-align: left">
            Choose Columns:
          </div>
          <vue-csv-map/>
        </div>
        <div class="column">
          <div v-if="mappedCsv!=null">
            Preview:
            <button class="btn btn-secondary" @click="mapRequirements();toggleImportRow()">Import</button>
            <pre>Requirement Name: {{ mappedCsv[0].name }}</pre>
            <pre>Requirement Rating: {{ mappedCsv[0].rating }}</pre>
          </div>
        </div>
      </div>
    </vue-csv-import>
    <hr>
    <h2 style="height: 80px">Choose and Assess relevant Sustainability Dimensions</h2>
    <div class="row">
      <div class="column">
        <h4>Dimension</h4>
      </div>
      <div class="column">
        <h4 style="text-align: center">Relevance Rating
          <v-tooltip activator="parent" location="top">Relevance of the sustainability dimension in this project</v-tooltip>
        </h4>
        <div class="column" style="text-align: left">
          very irrelevant
        </div>
        <div class="column" style="text-align: right">
          very relevant
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column" style="text-align: left">
        <input type="checkbox" class="largerCheckbox" id="social" value="Social" v-model="dimensionStore.selectedDimensions.Social">
        <label for="social" class="dimensionLabel">Social
          <v-tooltip activator="parent" location="top">Ensuring a stable society, as well as social and cultural systems</v-tooltip>
        </label>
      </div>
      <div class="column">
        <div class="slidecontainer">
          <input type="range" min="1" max="9" value="5" class="slider" :class="{'grayed':!dimensionStore.selectedDimensions.Social}" v-model="dimensionStore.selectedDimensions.SocialRating">
        </div>
      </div>
    </div>
    <div class="row" v-if="dimensionStore.selectedDimensions.Social">
      <div class="column dim">
        <div class="column" style="width: 15% !important;">
          <input type="checkbox" id="Sense of Community" class="midCheckbox" v-model="dimensionStore.selectedDimensions.soc1">
        </div>
        <div class="column">
          <label for="Sense of Community" style="font-size: smaller; width: 100px">Sense of Community
            <v-tooltip activator="parent" location="top">Feeling of belonging to an organization, to an area or to a group of like-minded people</v-tooltip>
          </label>
        </div>
      </div>
      <div class="column dim">
          <div class="column" style="width: 15% !important;">
            <input type="checkbox" id="Trust" class="midCheckbox" v-model="dimensionStore.selectedDimensions.soc2">
          </div>
          <div class="column">
            <label for="Trust" style="font-size: smaller; width: 100px">Trust
              <v-tooltip activator="parent" location="top">Having a firm belief in the reliability, truth, or ability of someone or something</v-tooltip>
            </label>
          </div>
      </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
              <input type="checkbox" id="Inclusiveness and Diversity" class="midCheckbox" v-model="dimensionStore.selectedDimensions.soc3">
            </div>
            <div class="column">
              <label for="Inclusiveness and Diversity" style="font-size: smaller; width: 100px">Inclusiveness and Diversity
                <v-tooltip activator="parent" location="top">Inclusion of people who might otherwise be excluded or marginalized</v-tooltip>
              </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Equity" class="midCheckbox" v-model="dimensionStore.selectedDimensions.soc4">
            </div>
            <div class="column">
                <label for="Equity" style="font-size: smaller; width: 100px">Equity
                  <v-tooltip activator="parent" location="top">Quality of being fair and impartial</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Participation and Communication" class="midCheckbox" v-model="dimensionStore.selectedDimensions.soc5">
            </div>
            <div class="column">
                <label for="Participation and Communication" style="font-size: smaller; width: 100px">Participation and Communication
                  <v-tooltip activator="parent" location="top">Imparting or interchanging thoughts, opinions or information by speech, writing, or sings</v-tooltip>
                </label>
            </div>
        </div>
    </div>
    <div class="row">
      <div class="column" style="text-align: left">
        <input type="checkbox" class="largerCheckbox" id="individual" value="Individual" v-model="dimensionStore.selectedDimensions.Individual">
        <label for="individual" class="dimensionLabel">Individual
          <v-tooltip activator="parent" location="top">Protection of privacy and the private property of every individual</v-tooltip>
        </label>
      </div>
      <div class="column">
        <div class="slidecontainer">
          <input type="range" min="1" max="9" value="5" class="slider" :class="{'grayed':!dimensionStore.selectedDimensions.Individual}" v-model="dimensionStore.selectedDimensions.IndividualRating">
        </div>
      </div>
    </div>
    <div class="row"  v-if="dimensionStore.selectedDimensions.Individual">
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Health" class="midCheckbox" v-model="dimensionStore.selectedDimensions.ind1">
            </div>
            <div class="column">
                <label for="Health" style="font-size: smaller; width: 100px">Health
                  <v-tooltip activator="parent" location="top">State of a person‘s mental or physical condition</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Lifelong learning" class="midCheckbox" v-model="dimensionStore.selectedDimensions.ind2">
            </div>
            <div class="column">
                <label for="Lifelong learning" style="font-size: smaller; width: 100px">Lifelong learning
                  <v-tooltip activator="parent" location="top">Use of learning opportunities throughout people‘s lives for continuous development</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Privacy" class="midCheckbox" v-model="dimensionStore.selectedDimensions.ind3">
            </div>
            <div class="column">
                <label for="Privacy" style="font-size: smaller; width: 100px">Privacy
                  <v-tooltip activator="parent" location="top">Being free from intrusion or disturbance in one‘s private life</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Safety" class="midCheckbox" v-model="dimensionStore.selectedDimensions.ind4">
            </div>
            <div class="column">
                <label for="Safety" style="font-size: smaller; width: 100px">Safety
                  <v-tooltip activator="parent" location="top">Being protected from danger, risk, or injury</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Self-awareness and Free will" class="midCheckbox" v-model="dimensionStore.selectedDimensions.ind5">
            </div>
            <div class="column">
                <label for="Self-awareness and Free will" style="font-size: smaller; width: 100px">Self-awareness and Free will
                  <v-tooltip activator="parent" location="top">Capacity of an individual to act or make decisions on their own</v-tooltip>
                </label>
            </div>
        </div>
    </div>
    <div class="row">
      <div class="column" style="text-align: left">
        <input type="checkbox" class="largerCheckbox" id="environmental" value="Environmental"
               v-model="dimensionStore.selectedDimensions.Environmental">
        <label for="environmental" class="dimensionLabel">Environmental
          <v-tooltip activator="parent" location="top">Protection of natural resources such as land, minerals and ecosystems, to improve human well-being</v-tooltip>
        </label>
      </div>
      <div class="column">
        <div class="slidecontainer">
          <input type="range" min="1" max="9" value="5" class="slider" :class="{'grayed':!dimensionStore.selectedDimensions.Environmental}" v-model="dimensionStore.selectedDimensions.EnvironmentalRating">
        </div>
      </div>
    </div>
    <div class="row" v-if="dimensionStore.selectedDimensions.Environmental">
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Material & Resources" class="midCheckbox" v-model="dimensionStore.selectedDimensions.env1">
            </div>
            <div class="column">
                <label for="Material & Resources" style="font-size: smaller; width: 100px">Material & Resources
                  <v-tooltip activator="parent" location="top">Everything that is needed to produce, deploy, operate, and cease a product or service</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Waste & Pollution" class="midCheckbox" v-model="dimensionStore.selectedDimensions.env2">
            </div>
            <div class="column">
                <label for="Waste & Pollution" style="font-size: smaller; width: 100px">Waste & Pollution
                  <v-tooltip activator="parent" location="top">Effects the product or service might have on soil, atmospheric, and water pollution</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Biodiversity" class="midCheckbox" v-model="dimensionStore.selectedDimensions.env3">
            </div>
            <div class="column">
                <label for="Biodiversity" style="font-size: smaller; width: 100px">Biodiversity
                  <v-tooltip activator="parent" location="top">Effects of a product or service on biodiversity in its operational environment and other affected land</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Energy" class="midCheckbox" v-model="dimensionStore.selectedDimensions.env4">
            </div>
            <div class="column">
                <label for="Energy" style="font-size: smaller; width: 100px">Energy
                  <v-tooltip activator="parent" location="top">All energy use that results from producing and using a product or service</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Logistics" class="midCheckbox" v-model="dimensionStore.selectedDimensions.env5">
            </div>
            <div class="column">
                <label for="Logistics" style="font-size: smaller; width: 100px">Logistics
                  <v-tooltip activator="parent" location="top">Effects of the product or service on moving people and/or goods</v-tooltip>
                </label>
            </div>
        </div>
    </div>
    <div class="row">
      <div class="column" style="text-align: left">
        <input type="checkbox" class="largerCheckbox" id="economic" value="Economic" v-model="dimensionStore.selectedDimensions.Economic">
        <label for="economic" class="dimensionLabel">Economic
          <v-tooltip activator="parent" location="top">Guarantee of assets in the form of capital and value creation</v-tooltip>
        </label>
      </div>
      <div class="column">
        <div class="slidecontainer">
          <input type="range" min="1" max="9" value="5" class="slider" :class="{'grayed':!dimensionStore.selectedDimensions.Economic}" v-model="dimensionStore.selectedDimensions.EconomicRating">
        </div>
      </div>
    </div>
    <div class="row" v-if="dimensionStore.selectedDimensions.Economic">
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Value" class="midCheckbox" v-model="dimensionStore.selectedDimensions.eco1">
            </div>
            <div class="column">
                <label for="Value" style="font-size: smaller; width: 100px">Value
                  <v-tooltip activator="parent" location="top">Worth, or usefulness of something, principles or standards; judgement of what is important in life</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Customer Relationship Management" class="midCheckbox" v-model="dimensionStore.selectedDimensions.eco2">
            </div>
            <div class="column">
                <label for="Customer Relationship Management" style="font-size: smaller; width: 100px">Customer Relationship Management
                  <v-tooltip activator="parent" location="top">Steers a company’s interaction with current and potential customers to improve business relationships (e.g. retention, growth)</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Supply Chain" class="midCheckbox" v-model="dimensionStore.selectedDimensions.eco3">
            </div>
            <div class="column">
                <label for="Supply Chain" style="font-size: smaller; width: 100px">Supply Chain
                  <v-tooltip activator="parent" location="top">System of organizations, people, activities, information, and resources involved in moving a product or service from supplier to customer</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Governance" class="midCheckbox" v-model="dimensionStore.selectedDimensions.eco4">
            </div>
            <div class="column">
                <label for="Governance" style="font-size: smaller; width: 100px">Governance
                  <v-tooltip activator="parent" location="top">Processes of interaction and decision-making among the actors involved in a system through the laws, norms, power or language of an organized society</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Innovation" class="midCheckbox" v-model="dimensionStore.selectedDimensions.eco5">
            </div>
            <div class="column">
                <label for="Innovation" style="font-size: smaller; width: 100px">Innovation
                  <v-tooltip activator="parent" location="top">Something new or to a change made to an existing product, idea, or field</v-tooltip>
                </label>
            </div>
        </div>
    </div>
    <div class="row">
      <div class="column" style="text-align: left">
        <input type="checkbox" class="largerCheckbox" id="technical" value="Technical" v-model="dimensionStore.selectedDimensions.Technical">
        <label for="technical" class="dimensionLabel">Technical
          <v-tooltip activator="parent" location="top">Ensuring the longevity of software systems with changing conditions and requirements</v-tooltip>
        </label>
      </div>
      <div class="column">
        <div class="slidecontainer">
          <input type="range" min="1" max="9" value="5" class="slider" :class="{'grayed':!dimensionStore.selectedDimensions.Technical}" v-model="dimensionStore.selectedDimensions.TechnicalRating">
        </div>
      </div>
    </div>
    <div class="row" v-if="dimensionStore.selectedDimensions.Technical">
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Maintainability" class="midCheckbox" v-model="dimensionStore.selectedDimensions.tec1">
            </div>
            <div class="column">
                <label for="Maintainability" style="font-size: smaller; width: 100px">Maintainability
                  <v-tooltip activator="parent" location="top">Degree to which an application is understood, repaired, or enhanced</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Usability" class="midCheckbox" v-model="dimensionStore.selectedDimensions.tec2">
            </div>
            <div class="column">
                <label for="Usability" style="font-size: smaller; width: 100px">Usability
                  <v-tooltip activator="parent" location="top">Ability of users to productively use the system for the intended purpose</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Adaptability" class="midCheckbox" v-model="dimensionStore.selectedDimensions.tec3">
            </div>
            <div class="column">
                <label for="Adaptability" style="font-size: smaller; width: 100px">Adaptability
                  <v-tooltip activator="parent" location="top">Ability of a system to adapt itself to fit its behaviour according to changes in its environment or in parts of the system itself</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Security" class="midCheckbox" v-model="dimensionStore.selectedDimensions.tec4">
            </div>
            <div class="column">
                <label for="Security" style="font-size: smaller; width: 100px">Security
                  <v-tooltip activator="parent" location="top">Freedom from, or resilience against, potential harm (or other unwanted coercive change) caused by external or internal attacks</v-tooltip>
                </label>
            </div>
        </div>
        <div class="column dim">
            <div class="column" style="width: 15% !important;">
                <input type="checkbox" id="Scalability" class="midCheckbox" v-model="dimensionStore.selectedDimensions.tec5">
            </div>
            <div class="column">
                <label for="Scalability" style="font-size: smaller; width: 100px">Scalability
                  <v-tooltip activator="parent" location="top">Systems ability to handle growing amounts of work in a graceful manner or to be enlarged horizontally or vertically and will continue to function with comparable response times</v-tooltip>
                </label>
            </div>
        </div>
    </div>
    <div>
      <button @click="downloadProject" class="btn btn-secondary" style="margin-right: 20px">Save Assessment</button>
      <button @click="startAssessment" class="btn btn-secondary">Start Assessment</button>
      <modal-popup v-show="isModalVisible" @close="closeModal" :calculate="requirementStore.isAssessed()"/>
    </div>
  </div>
</template>

<script>
import { useRequirementStore } from '@/stores/requirementStore'
import { useDimensionStore } from '@/stores/dimensionStore'
import modalPopup from '@/components/requirementsPopup.vue'
import { VueCsvToggleHeaders, VueCsvMap, VueCsvInput, VueCsvErrors, VueCsvImport } from 'vue-csv-import'

export default {
  name: 'HomeView',
  setup () {
    const requirementStore = useRequirementStore()
    const dimensionStore = useDimensionStore()
    return { requirementStore, dimensionStore }
  },
  data () {
    return {
      projectName: 'name',
      tempRequirementName: '',
      tempRequirementValue: 5,
      dimensionSelection: [],
      requirementsId: 0,
      isModalVisible: false,
      mappedCsv: null,
      isImportRowVisible: false,
      fields: {
        name: {
          required: true,
          label: 'Requirement'
        },
        rating: {
          required: true,
          label: 'Rating'
        }
      }
    }
  },
  methods: {
    resetData () {
      this.tempRequirementName = ''
      this.tempRequirementValue = 5
    },
    mapRequirements () {
      if (this.mappedCsv != null) {
        let i = 0
        while (i < this.mappedCsv.length) {
          this.requirementStore.addRequirement(this.mappedCsv[i].name, this.mappedCsv[i].rating)
          this.requirementsId++
          i++
        }
      }
    },
    startAssessment () {
      if (!this.requirementStore.projectName) {
        alert('Please type in a project name!')
        return
      }
      if (this.requirementStore.requirements.length === 0) {
        alert('Please add requirements!')
        return
      }
      this.requirementStore.mapDimensions()
      this.showModal()
    },
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    toggleImportRow () {
      this.isImportRowVisible = !this.isImportRowVisible
    },
    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.readFile(files[0])
    },
    readFile (file) {
      const reader = new FileReader()
      const requirementStore = useRequirementStore()
      const dimensionStore = useDimensionStore()
      reader.onload = e => {
        console.log(e.target.result)
        try {
          const importedRequirement = JSON.parse(e.target.result.split(';division-here;')[0])
          requirementStore.projectName = importedRequirement.projectName
          requirementStore.requirements = importedRequirement.requirements
          requirementStore.dimensionWeights = importedRequirement.dimensionWeights
          const importedDimension = JSON.parse(e.target.result.split(';division-here;')[1])
          dimensionStore.selectedDimensions = importedDimension.selectedDimensions
          dimensionStore.mappedIrrelQuests = importedDimension.mappedIrrelQuests
          alert('Project successfully imported!')
        } catch (e) {
          alert('An error occurred when reading the file')
        }
      }
      reader.readAsText(file)
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
    VueCsvToggleHeaders,
    VueCsvInput,
    VueCsvErrors,
    VueCsvMap,
    VueCsvImport
  }
}
</script>
<style>
input.largerCheckbox {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

input.midCheckbox {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

label.dimensionLabel {
  font-size: large;
}

html body div#app div.home label {
  margin-left: 20px;
}

.column {
  float: left;
  height: 60px;
  width: 50% !important;
  vertical-align: center;
}

.left-column {
  width: 10% !important;
}

.mid-column {
  width: 45% !important;
}

.dim {
  height: 60px;
  width: 20% !important;
  text-align: left;
}

.hidden {
  display: none !important;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.row {
  display: block ruby !important;
}

html body div#app div.home div.row div.column table thead tr th {
  width: 130px;
}

.home {
  width: 1000px;
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

.slider {
  -webkit-appearance: none;
  width: 80%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
}
.grayed {
  background-color: #eee !important;
}
</style>
