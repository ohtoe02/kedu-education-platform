import {getDatabase, ref, get, child, update, set, push, remove} from "firebase/database"

export default {
    actions: {
        async createCategory({dispatch, commit}, {title, isPublic, file, tags}) {
            try {
                const uid = await dispatch('getUid');
                //Создать категорию с полями title и limit по адресу users/uid/categories
                const category = await push(ref(getDatabase(), `/categories`), {
                    title,
                    author: uid,
                    isPublic,
                    tags
                })
                await set(ref(getDatabase(), `users/${uid}/categories/${category.key}`), category.key)
                const catFile = await dispatch('uploadCroppedFile', {path: `categories/${category.key}`, file})
                dispatch('updateCategory', {title, author: uid, isPublic, tags, file: catFile, id: category.key})
                return {title, author: uid, isPublic, tags, file: catFile, id: category.key}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchCategories({dispatch, commit}) {
            try {
            //Получить массив всех категорий по адресу users/uid/categories
            const categories = (await get(child(ref(getDatabase()), `categories`))).val() || {};

            return Object.keys(categories).map(key => ({...categories[key], id: key}))
        } catch (e) {
            commit('setError', e)
            throw e
        }},
        async fetchMyCategories({dispatch, commit}) {
            try {
            const uid = await dispatch('getUid');
            const categories = (await get(child(ref(getDatabase()), `users/${uid}/categories`))).val() || {};
            const res = [];
            for (const catId of Object.values(categories)) {
                res.push(await dispatch('fetchCategoryById', {id: catId}))
                // debugger
            }
                return res

            // return Object.keys(categories).map(key => ({...categories[key], id: key}))
        } catch (e) {
            commit('setError', e)
            throw e
        }},
        async fetchCategoryById({dispatch, commit}, {id}) {
            try {
                const uid = await dispatch('getUid');
                const category = (await get(child(ref(getDatabase()), `categories/${id}`))).val() || {};

                return {...category, id}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateCategory({dispatch, commit}, {id, title, isPublic, tags, file}) {
            try {
                const uid = await dispatch('getUid');
                const db = ref(getDatabase())
                //Обновить поля title и limit в категории по адресу users/uid/categories/id
                await update(child(db, `categories/${id}`), {
                    title,
                    author: uid,
                    file,
                    isPublic,
                    tags
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async removeCategory({dispatch, commit}, {id, file}) {
            try {
                const uid = await dispatch('getUid');
                const db = ref(getDatabase())
                dispatch('removeFile', {path: `categories/${id}`, file})
                await remove(child(db, `categories/${id}`))
                await remove(child(db, `users/${uid}/categories/${id}`))

            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}
