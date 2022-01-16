import {child, get, getDatabase, ref, remove, update} from "firebase/database";

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
        async fetchRequests({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid');
                return (await get(child(ref(getDatabase()), `users/${uid}/teacherRequests`))).val() || {}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchUsername({dispatch, commit}, uid) {
            try {
                return (await get(child(ref(getDatabase()), `users/${uid}/info/username`))).val() || ''
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
        },
        async teacherRequest({dispatch, commit}, teacherRequest) {
            try {
                const uid = await dispatch('getUid')
                const db = ref(getDatabase())
                //Обновить информацию из входного аргумента toUpdate в инфе по адресу users/uid/info
                await update(child(db, `users/v1ObQdeO33Tm2vCAwb3RF8pI6gA2/teacherRequests/${uid}`), teacherRequest)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async acceptRequest({dispatch, commit, getters}, teacherRequest) {
            try {
                const uid = await dispatch('getUid')
                const db = ref(getDatabase())

                await remove(ref(getDatabase(), `users/v1ObQdeO33Tm2vCAwb3RF8pI6gA2/teacherRequests/${teacherRequest.uid}`))
                await update(child(db, `users/${teacherRequest.uid}/info`), {teacher: true})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async rejectRequest({dispatch, commit, getters}, teacherRequest) {
            try {
                const uid = await dispatch('getUid')
                const db = ref(getDatabase())

                await remove(ref(getDatabase(), `users/v1ObQdeO33Tm2vCAwb3RF8pI6gA2/teacherRequests/${teacherRequest.uid}`))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

    },
    getters: {
        info: s => s.info
    }
}