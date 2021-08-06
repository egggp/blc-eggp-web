<template>
  <v-app-bar
    app
    dark
    color="primary"
  >
    <div class="app-max-width mx-auto d-flex justify-space-between">
      <v-toolbar-title>
        밸런스게임
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn
          v-if="!loggedIn"
          text
          to="/login"
          class="rounded-lg"
        >
          로그인
        </v-btn>
        <template v-else>
          <v-menu
            v-model="menu"
            rounded
            offset-y
          >
            <template #activator="{ on }">
              <v-btn
                text
                x-large
                class="rounded-lg"
                v-on="on"
              >
                {{ user.userName }} 님
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item>
                <v-btn
                  text
                  block
                  class="rounded-lg"
                  @click="onClickLogout"
                >
                  로그아웃
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-toolbar-items>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, ref,
  useContext
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AppBar',
  setup () {
    const { $auth } = useContext()
    const menu = ref<boolean>(false)

    const loggedIn = computed<boolean>(() => $auth.loggedIn)
    const user = computed(() => $auth.user)

    const onClickLogout = () => $auth.logout()

    return {
      onClickLogout,
      loggedIn,
      user,
      menu
    }
  }
})
</script>

<style scoped>

</style>
