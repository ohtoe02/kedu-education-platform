import {getStorage, ref, uploadBytes } from "firebase/storage"

export default {
    actions: {
        async uploadFile({dispatch, commit}, {path, file}) {
            try {
                console.log(file)
                const uid = await dispatch('getUid');
                const storage = ref(getStorage(), `/${uid}/${path}/${file.name}`);
                return await uploadBytes(storage, file)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}