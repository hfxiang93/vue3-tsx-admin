import { defineComponent, KeepAlive } from 'vue'
import { RouterView } from 'vue-router'
import HeaderNav from './Header/headerNav'
import MainContent from './MainContent/index'
import Foot from './Foot/index'
import Aside from './Aside/index'
import { ElAside, ElHeader, ElMain, ElFooter, ElContainer } from 'element-plus'

export default defineComponent({
  components: {
    ElAside,
    ElHeader,
    ElMain,
    ElFooter,
    ElContainer,
    RouterView,
    KeepAlive,
    HeaderNav,
    MainContent,
    Foot
  },
  props: {},
  emits: [],
  setup(props, ctx) {
    return () => (
      <>
        <el-container style={{ height: '100vh' }}>
          <Aside />
          <el-container>
            <HeaderNav />
            <MainContent />
            <el-footer>
              <Foot />
            </el-footer>
          </el-container>
        </el-container>
      </>
    )
  }
})
