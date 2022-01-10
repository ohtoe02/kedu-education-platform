import {child, get, getDatabase, push, ref, remove, set, update} from "firebase/database";


export default {
    state: {

    },
    actions: {
        async createRecord({dispatch, commit}, {
            categoryId,
            title,
            type,
            video,
            image,
            date
        })
        {
            try {
                const uid = await dispatch('getUid')

                // const videoRef = await this.$store.dispatch('uploadFile', {path: 'records/', file: this.currentFile})
                // const imageRef = await this.$store.dispatch('uploadCroppedFile', {path: 'records', file: this.imgDataUrl})

                const record = await push(ref(getDatabase(), `/categories/${categoryId}/records`), {
                    title,
                    author: uid,
                    type,
                    date
                })
                await set(ref(getDatabase(), `users/${uid}/records/${record.key}`), record.key)
                const imageURL = await dispatch('uploadCroppedFile', {path: `records/${record.key}`, file: image})
                const videoURL = await dispatch('uploadFile', {path: `records/${record.key}`, file: video})
                dispatch('updateRecord', {title, catId: categoryId , author: uid, imageURL, videoURL, id: record.key})
                const newRec = {title, catId: categoryId, author: uid, imageURL, videoURL}
                // await push(ref(getDatabase(), `categories/${categoryId}/records`), {...newRec, author: uid})
                return newRec
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
        },
        async updateRecord({dispatch, commit}, {catId, id, title, imageURL, videoURL}) {
            try {
                const uid = await dispatch('getUid');
                const db = ref(getDatabase())
                //Обновить поля title и limit в категории по адресу users/uid/categories/id
                await update(child(db, `categories/${catId}/records/${id}`), {
                    title,
                    categoryId: catId,
                    author: uid,
                    videoURL,
                    imageURL
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    },
    getters: {

    }
}