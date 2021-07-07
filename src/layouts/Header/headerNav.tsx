// 函数式组件
import { Dispatch, useStore } from 'vuex'
import { Router, useRouter } from 'vue-router'
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElHeader } from 'element-plus'
import { SET_USER } from '@/store/login/actionType'
import { defineComponent } from 'vue'

const DropdownMenu = (dispatch: Dispatch, router: Router): JSX.Element => (
  <ElDropdownMenu>
    <ElDropdownItem
      {...{
        onClick: () => {
          dispatch(`login/${SET_USER}`, {})
          localStorage.removeItem('user')
          router.push({ name: 'login' })
        }
      }}
      icon="el-icon-switch-button"
    >
      退出登录
    </ElDropdownItem>
  </ElDropdownMenu>
)
export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    return () => (
      <ElHeader class="header" height="54px">
        <ElDropdown
          style={{
            marginBottom: '15px'
          }}
          v-slots={{
            dropdown: () => DropdownMenu(store.dispatch, router)
          }}
        >
          <span>
            <i
              class="el-icon-s-tools el-icon--right"
              style={{
                marginRight: '8px'
              }}
            />
            设置
          </span>
        </ElDropdown>
      </ElHeader>
    )
  }
})
