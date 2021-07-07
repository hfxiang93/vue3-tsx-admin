import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {},
  emits: [],
  setup(props, ctx) {
    return () => (
      <div class="footer">
        <a>在线预览</a>
        <i class="el-icon-share" />
        <a>在线预览</a>
        <div>Copyright &copy;2020 vue3 Admin</div>
      </div>
    )
  }
})
