<template>
  <v-app>
    <v-main>
      <v-container style="max-width: 800px">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DefaultLayout',
  setup () {
    return {
    }
  }
})
</script>
