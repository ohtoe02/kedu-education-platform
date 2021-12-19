import {getDatabase, ref, child, get} from "firebase/database";

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
          state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const info = (await get((ref(getDatabase(), `users/${uid}/info`)))).val()
                commit('setInfo', info)
            } catch (e) {
                throw e
            }
        }
    },
    getters: {
        info: s => s.info
    }
}