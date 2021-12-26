import {child, get, getDatabase, ref, update} from "firebase/database";

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
                commit('setError', e)
                throw e
            }
        },
        async fetchRoleInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid');
                return (await get(child(ref(getDatabase()), `users/${uid}/info/teacher`))).val() || false
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateInfo({dispatch, commit, getters}, toUpdate) {
            try {
                const uid = await dispatch('getUid')
                const db = ref(getDatabase())
                //Обновить информацию из входного аргумента toUpdate в инфе по адресу users/uid/info
                const updateData = {...getters.info, ...toUpdate}
                await update(child(db, `users/${uid}/info`), updateData)
                commit('setInfo', updateData)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    },
    getters: {
        info: s => s.info
    }
}