import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { ElMain } from 'element-plus'

export default defineComponent({
  components: {},
  props: {},
  emits: [],
  setup(props, ctx) {
    return () => (
      <>
        <ElMain>
          <RouterView
            v-slots={{
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              default: ({ Component }) => <Component />
            }}
          />
        </ElMain>
      </>
    )
  }
})
