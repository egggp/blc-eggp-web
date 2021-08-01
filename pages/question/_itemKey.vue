<template>
  <div>
    <div>
      {{ itemKey }}
    </div>
    <div>
      {{ content }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext
} from '@nuxtjs/composition-api'
import useApi from '~/compositions/useApi'
import { Model } from '~/types/model.type'

export default defineComponent({
  name: 'QuestionItem',
  setup () {
    const context = useContext()
    const { getItem } = useApi()

    const { itemKey } = context.route.value.params

    const content = getItem<Model.Question>(`/question/${itemKey}`)

    return {
      itemKey,
      content
    }
  }
})
</script>

<style scoped>

</style>
