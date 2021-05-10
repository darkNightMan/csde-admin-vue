<template>
  <div class="row">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable
        class="dragArea list-group"
        :list="packages"
        :group="{ name: 'com', pull: 'clone', put: false }"
      >
        <div
          class="list-group-item"
          v-for="element in packages"
          :key="element.componentName"
        >
          {{ element.componentName }}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable
        class="dragArea list-group"
        :list="list2"
        group="com"

      >
        <div
          class="list-group-item"
          v-for="element in list2"
          :key="element.componentName"
        >
          {{ element.componentName }}
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import packages from '@/package'
import draggable from 'vuedraggable'
export default {
  name: 'clone',
  display: 'Clone',
  order: 2,
  components: {
    draggable
  },
  data () {
    return {
      packages,
      list2: [
        // { name: 'Juan', id: 5 },
        // { name: 'Edgard', id: 6 },
        // { name: 'Johnson', id: 7 }
      ]
    }
  },
  computed: {

  },
  methods: {
    log: function (evt) {
      window.console.log(evt)
    }
  }
}
</script>
<style scoped></style>
