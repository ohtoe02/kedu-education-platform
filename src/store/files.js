import {getStorage, ref, uploadBytes, getDownloadURL, deleteObject, uploadString } from "firebase/storage"

export default {
    actions: {
        async uploadFile({dispatch, commit}, {path, file, name}) {
            try {
                const uid = await dispatch('getUid');
                const storage = ref(getStorage(), `/${uid}/${path}/${file.name}`);
                const uploaded = await uploadBytes(storage, file);
                const resPath = await getDownloadURL(uploaded.ref);
                return {path: resPath, name}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async uploadCroppedFile({dispatch, commit}, {path, file, name}) {
            try {
                const uid = await dispatch('getUid');
                const storage = ref(getStorage(), `/${uid}/${path}/${name}`);
                const uploaded = await uploadString(storage, file, "data_url");
                return await getDownloadURL(uploaded.ref);
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async readFile({dispatch, commit}, {path, file}) {
            try {
                const uid = await dispatch('getUid');
                const storage = ref(getStorage(), `/${uid}/${path}/${file.name}`);
                return await uploadBytes(storage, file);
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async removeFile({dispatch, commit}, {path, file}) {
            try {
                const uid = await dispatch('getUid');
                const storage = ref(getStorage(), `/${uid}/${path}/${file}`);
                await deleteObject(storage)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}