<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          Hello Add
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="onClickTest"
          >
            Test
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Add',
  middleware: ['auth'],
  setup () {
    const context = useContext()
    const onClickTest = async () => {
      const result = await context.$axios.$post('/api/question/', {
        title: '똥 같은 카레 vs 카레 같은 똥',
        itemA: {
          title: '똥 같은 카레',
          description: '똥 같은 카레 먹을래',
          selectRate: 0
        },
        itemB: {
          title: '카레같은 똥',
          description: '카레 같은 똥을 먹을래',
          selectRate: 0
        },
        tags: ['음식', '더러움']
      })
      console.log(result)
    }

    return {
      onClickTest
    }
  }
})
</script>

<style scoped>

</style>
