import { useStore } from 'vuex'
import { IUser } from '@/store/login'
import { useRouter } from 'vue-router'
import { SET_USER } from '@/store/login/actionType'
import { defineComponent, ref, reactive, onMounted } from 'vue'
import {
  ElForm,
  ElInput,
  ElButton,
  ElMessage,
  ElTooltip,
  ElFormItem,
  ElNotification,
  ElCheckbox
} from 'element-plus'

export default defineComponent({
  setup() {
    const data = reactive<{
      user: IUser
    }>({
      user: {
        name: '',
        password: ''
      }
    })
    const checked = ref(true)
    const loginForm = ref<typeof ElForm | null>(null)
    const { dispatch } = useStore()
    const router = useRouter()

    onMounted(() => {
      ElNotification({
        type: 'info',
        title: '账户信息',
        dangerouslyUseHTMLString: true,
        message: '账号：<strong>admin</strong>  密码：<strong>123456</strong>'
      })
    })

    function login() {
      if (!loginForm.value) return
      loginForm.value.validate((valid: boolean) => {
        if (valid) {
          if (data.user.name === 'admin' && data.user.password === '123456') {
            router.push({
              name: 'home'
            })

            localStorage.setItem('user', JSON.stringify(data.user))
            dispatch(`login/${SET_USER}`, data.user)
          } else {
            data.user = {
              name: '',
              password: ''
            }

            localStorage.removeItem('user')
            ElMessage.error('用户名或密码错误')
          }
        } else {
          return false
        }
      })
    }

    function keyUp({ code }: KeyboardEvent) {
      if (code === 'Enter' || code === 'NumpadEnter') {
        login()
      }
    }

    return () => (
      <div class="login">
        <ElForm class="login-form" model={data.user} ref={loginForm}>
          <h1>登录</h1>
          <ElFormItem
            label=""
            prop="name"
            rules={[{ required: true, message: '请输入用户名', trigger: 'blur' }]}
          >
            <ElInput
              placeholder="请输入用户名:admin"
              v-model={data.user.name}
              v-slots={{
                prefix: () => <i class="el-input__icon el-icon-user" />
              }}
              {...{
                onKeyup: keyUp
              }}
            />
          </ElFormItem>
          <ElFormItem
            label=""
            prop="password"
            rules={[{ required: true, message: '请输入密码', trigger: 'blur' }]}
          >
            <ElInput
              type="password"
              placeholder="请输入密码:123456"
              v-model={data.user.password}
              v-slots={{
                prefix: () => <i class="el-input__icon el-icon-unlock" />
              }}
              {...{
                onKeyup: keyUp
              }}
            />
          </ElFormItem>
          <ElFormItem>
            <ElCheckbox modelValue={checked.value}>记住我</ElCheckbox>
            <ElButton style={{ float: 'right' }} type="text">
              忘记密码
            </ElButton>
          </ElFormItem>
          <ElFormItem class="login-button">
            <ElTooltip placement="top" content="账号：admin 密码：123456">
              <ElButton
                style={{ width: '300px', background: '#0960bd', borderColor: '#0960bd' }}
                type="primary"
                {...{
                  onClick: login
                }}
              >
                登陆
              </ElButton>
            </ElTooltip>
          </ElFormItem>
        </ElForm>
      </div>
    )
  }
})
