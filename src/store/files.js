import {getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

export default {
    actions: {
        async uploadFile({dispatch, commit}, {path, file}) {
            try {
                console.log(file)
                const uid = await dispatch('getUid');
                const storage = ref(getStorage(), `/${uid}/${path}/${file.name}`);
                const uploaded = await uploadBytes(storage, file);
                console.log(uploaded)
                return getDownloadURL(uploaded.ref);
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async readFile({dispatch, commit}, {path, file}) {
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