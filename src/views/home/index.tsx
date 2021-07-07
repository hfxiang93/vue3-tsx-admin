import { useStore } from 'vuex'
import { defineComponent, ref } from 'vue'
import { SET_USER } from '@/store/login/actionType'
import TodoList from '@/components/todoList'

import { ElSkeleton, ElDescriptions, ElAlert, ElDescriptionsItem } from 'element-plus'
import pkg from '../../../package.json'

export interface DescItem {
  labelMinWidth?: number
  contentMinWidth?: number
  field: string
  label: string | JSX.Element
  // Merge column
  span?: number
  show?: (...arg: any) => boolean
}

export default defineComponent({
  setup() {
    const { dependencies, devDependencies, version } = pkg
    const schema: DescItem[] = []
    const devSchema: DescItem[] = []
    Object.keys(dependencies).forEach((key) => {
      schema.push({ field: key, label: key })
    })

    Object.keys(devDependencies).forEach((key) => {
      devSchema.push({ field: key, label: key })
    })
    const store = useStore()
    const name = ref<string>('')
    const password = ref<string>('')
    setTimeout(() => {
      const userString = localStorage.getItem('user')
      if (userString) {
        const user = JSON.parse(userString)
        store.dispatch(`login/${SET_USER}`, user)
      }
      name.value = store.state.login.user.name
      password.value = store.state.login.user.password.replace(/[\s\S]/g, '*')
    }, 1000)

    return () =>
      name.value ? (
        <>
          <ElAlert title={version} type="success" closable={false} />
          <ElDescriptions
            title="依赖信息"
            style={{
              margin: '20px 0',
              padding: '10px 16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)'
            }}
          >
            {schema.map((item, index) => (
              <ElDescriptionsItem
                key={index}
                {...{
                  label: item.field
                }}
              >
                {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  dependencies[item.field]
                }
              </ElDescriptionsItem>
            ))}
          </ElDescriptions>
          <ElDescriptions
            title="开发依赖信息"
            style={{
              padding: '10px 16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)'
            }}
          >
            {devSchema.map((item, index) => (
              <ElDescriptionsItem
                key={index}
                {...{
                  label: item.field
                }}
              >
                {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  devDependencies[item.field]
                }
              </ElDescriptionsItem>
            ))}
          </ElDescriptions>
          <TodoList />
        </>
      ) : (
        <ElSkeleton rows={5} animated></ElSkeleton>
      )
  }
})
