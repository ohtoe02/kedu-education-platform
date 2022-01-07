import {child, get, getDatabase, push, ref, remove, update} from "firebase/database";


export default {
    state: {

    },
    actions: {
        async createRecord({dispatch, commit}, record) {
            try {
                const uid = await dispatch('getUid')
                const db = ref(getDatabase())

                const category = await push(ref(getDatabase(), `categories/${record.categoryId}/records`), record)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecords({dispatch, commit}, catId) {
            try {
                const uid = await dispatch('getUid');
                const records = (await get(child(ref(getDatabase()), `categories/${catId}/records`))).val() || {};

                return Object.keys(records).map(key => ({...records[key], id: key}))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecordById({dispatch, commit}, {catId, id}) {
            try {
                const uid = await dispatch('getUid');
                const record = (await get(child(ref(getDatabase()), `categories/${catId}/records/${id}`))).val() || {};

                return {...record, id}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async removeRecord({dispatch, commit}, {catId, id, file}) {
            try {
                const uid = await dispatch('getUid');
                const db = ref(getDatabase())
                dispatch('removeFile', {path: `records`, file})
                await remove(child(db, `categories/${catId}/records/${id}`))

            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    },
    getters: {

    }
}