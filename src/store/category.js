import {getDatabase, ref, get, child, update, set, push} from "firebase/database"

export default {
    actions: {
        async createCategory({dispatch, commit}, {title, limit, file}) {
            try {
                const uid = await dispatch('getUid');
                //Создать категорию с полями title и limit по адресу users/uid/categories
                const category = await push(ref(getDatabase(), `users/${uid}/categories`), {
                    title,
                    limit,
                    picture: dispatch('uploadFile', {path: `categories/${title}`,file})
                })
                return {title, limit, file, id: category.key}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchCategories({dispatch, commit}) {
            try {
            const uid = await dispatch('getUid');
            //Получить массив всех категорий по адресу users/uid/categories
            const categories = (await get(child(ref(getDatabase()), `users/${uid}/categories`))).val() || {};

            return Object.keys(categories).map(key => ({...categories[key], id: key}))
        } catch (e) {
            commit('setError', e)
            throw e
        }},
        async fetchCategoryById({dispatch, commit}, id) {
            try {
                const uid = await dispatch('getUid');
                const category = (await get(child(ref(getDatabase()), `users/${uid}/categories/${id}`))).val() || {};

                return {...category, id}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateCategory({dispatch, commit}, {id, title, limit}) {
            try {
                const uid = await dispatch('getUid');
                const db = ref(getDatabase())
                //Обновить поля title и limit в категории по адресу users/uid/categories/id
                await update(child(db, `users/${uid}/categories/${id}`), {
                    title,
                    limit
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}
