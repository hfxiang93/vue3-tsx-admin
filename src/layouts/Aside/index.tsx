import { defineComponent } from 'vue'
import { ElAside } from 'element-plus'

export default defineComponent({
  components: {},
  props: {},
  emits: [],
  setup(props, ctx) {
    return () => (
      <ElAside class="aside" width="200px">
        Aside
      </ElAside>
    )
  }
})
