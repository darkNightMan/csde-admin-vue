<template>
  <div class="row">
    <div class="col-8">
      <h3>Nested draggable</h3>
      <nested-draggable :tasks="list" />
    </div>

    <rawDisplayer class="col-3" :value="list" title="List" />
  </div>
</template>

<script>
import nestedDraggable from './raw'
import rawDisplayer from './rawDisplayer'
export default {
  name: 'nested-example',
  display: 'Nested',
  order: 15,
  components: {
    nestedDraggable,
    rawDisplayer
  },
  data () {
    return {
      list: [
        {
          name: 'task 1',
          tasks: [
            {
              name: 'task 2',
              tasks: []
            }
          ]
        },
        {
          name: 'task 3',
          tasks: [
            {
              name: 'task 4',
              tasks: []
            }
          ]
        },
        {
          name: 'task 5',
          tasks: []
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
body, dl, dt, dd, ul, ol, li, pre, form, fieldset, input, p, blockquote, th, td{
    padding: revert;

}

</style>
