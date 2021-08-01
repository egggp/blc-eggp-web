import {
  useContext,
  useAsync
} from '@nuxtjs/composition-api'

export default function useApi () {
  const { $axios, error } = useContext()

  const getItem = <T> (path: string) => {
    return useAsync(async () => {
      try {
        const { result } = await $axios.$get(`/api${path}`)
        return result as T
      } catch (e) {
        error(e)
      }
    })
  }

  return {
    getItem
  }
}
