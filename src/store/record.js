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

                let path = `/categories/${categoryId}/records`
                if (categoryId === 'empty') {
                    path = `users/${uid}/records`
                }
                const record = await push(ref(getDatabase(), path), {
                    title,
                    author: uid,
                    type,
                    date
                })
                await set(ref(getDatabase(), `users/${uid}/records/${record.key}`), {id: record.key, categoryId})
                const imageURL = await dispatch('uploadCroppedFile', {path: `records/${record.key}/images`, file: image, name: record.key})
                const videoURL = await dispatch('uploadFile', {path: `records/${record.key}/videos`, file: video, name: video.name})
                dispatch('updateRecord', {path, title, categoryId, date, author: uid, imageURL, videoURL, id: record.key})
                // await push(ref(getDatabase(), `categories/${categoryId}/records`), {...newRec, author: uid})
                return {title, catId: categoryId, author: uid, imageURL, videoURL}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        // async addRecord({dispatch, commit}, record)
        // {
        //     try {
        //         const uid = await dispatch('getUid')
        //
        //         await set(ref(getDatabase(), `users/${uid}/records/${record.id}`), {id: record.id, categoryId: record.categoryId})
        //     } catch (e) {
        //         commit('setError', e)
        //         throw e
        //     }
        // },
        async addRecord({dispatch, commit}, record)
        {
            try {
                const uid = await dispatch('getUid')

                await set(ref(getDatabase(), `users/${uid}/records/${record.id}`), {...record, author: uid, categoryId: 'empty'})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async removeRecordRef({dispatch, commit}, record)
        {
            try {
                const uid = await dispatch('getUid')
                const db = ref(getDatabase())

                await remove(ref(getDatabase(), `users/${uid}/records/${record.id}`))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecords({dispatch, commit}, catId) {
            try {
                const uid = await dispatch('getUid');
                let records = {};
                if (catId !== 'empty')
                    records = (await get(child(ref(getDatabase()), `categories/${catId}/records`))).val() || {};
                else
                    records = (await get(child(ref(getDatabase()), `users/${uid}/records`))).val() || {};

                let res = Object.keys(records).map(key => {if (records[key].title) return {...records[key], id: key}})

                res = res.filter(n => n)


                return Object.keys(records).map(key => {if (records[key].title) return {...records[key], id: key}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchMyRecords({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid');
                const records = (await get(child(ref(getDatabase()), `users/${uid}/records`))).val() || {};

                const res = [];
                for (const rec of Object.values(records)) {
                    let skip = false
                    rec.title
                        ? res.push(rec)
                        : res.push(await dispatch('fetchRecordById', {catId: rec.categoryId, id: rec.id}))
                }
                return res

                // return records
                // return Object.keys(records).map(key => ({...records[key], id: key}))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecordById({dispatch, commit}, {catId, id}) {
            try {
                const uid = await dispatch('getUid');
                let path = `categories/${catId}/records/${id}`
                if (catId === 'empty')
                    path = `users/${uid}/records/${id}`
                const record = (await get(child(ref(getDatabase()), path))).val() || {};

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
                dispatch('removeFile', {path: `records/${id}/images`, file: id})
                dispatch('removeFile', {path: `records/${id}/videos`, file: file})
                if (catId !== 'empty')
                    await remove(ref(getDatabase(), `categories/${catId}/records/${id}`))
                await remove(ref(getDatabase(), `users/${uid}/records/${id}`))
                // await remove(child(db, `categories/${catId}/records/${id}`))

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateRecord({dispatch, commit}, toUpdate) {
            try {
                const uid = await dispatch('getUid');
                const db = ref(getDatabase())

                const path = toUpdate.categoryId === 'empty'
                    ? `users/${uid}/records`
                    : `categories/${toUpdate.categoryId}/records`
                //Обновить поля title и limit в категории по адресу users/uid/categories/id
                // await update(child(db, `categories/${catId}/records/${id}`), {
                // if (toUpdate.catId !== 'empty')
                //     await set(ref(getDatabase(), `users/${uid}/records/${toUpdate.id}`), {id: toUpdate.id, categoryId: toUpdate.catId})
                await update(child(db, `${path}/${toUpdate.id}`), toUpdate)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateEmptyRecord({dispatch, commit}, {recordData, record}) {
            try {
                const uid = await dispatch('getUid');
                const db = ref(getDatabase())

                const path = recordData.categoryId === 'empty'
                    ? `users/${uid}/records`
                    : `categories/${recordData.categoryId}/records`
                //Обновить поля title и limit в категории по адресу users/uid/categories/id
                // await update(child(db, `categories/${catId}/records/${id}`), {
                // if (toUpdate.catId !== 'empty')
                if (record.categoryId === 'empty' && recordData.categoryId !== 'empty') {
                    await set(ref(getDatabase(), `users/${uid}/records/${recordData.id}`), {
                        id: recordData.id,
                        categoryId: recordData.categoryId
                    })
                    await set(ref(getDatabase(), `categories/${recordData.categoryId}/records/${recordData.id}`), {...record})
                }
                else if (record.categoryId !== 'empty' && recordData.categoryId === 'empty') {
                    await remove(ref(getDatabase(), `categories/${record.categoryId}/records/${recordData.id}`))
                    await set(ref(getDatabase(), `users/${uid}/records/${recordData.id}`), {...record})
                }
                else {
                    await remove(ref(getDatabase(), `categories/${record.categoryId}/records/${recordData.id}`))
                    await set(ref(getDatabase(), `categories/${recordData.categoryId}/records/${recordData.id}`), {...record})
                    await set(ref(getDatabase(), `users/${uid}/records/${recordData.id}`), {
                        id: recordData.id,
                        categoryId: recordData.categoryId
                    })
                }
                await update(child(db, `${path}/${recordData.id}`), {...record, ...recordData})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    },
    getters: {

    }
}