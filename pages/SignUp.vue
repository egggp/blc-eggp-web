<template>
  <v-row>
    <v-col>
      SignUp
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SignUp',
  auth: 'guest'
})
</script>

<style scoped>

</style>
