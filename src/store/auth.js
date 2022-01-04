import {signOut, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database"

export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                await signInWithEmailAndPassword(getAuth(), email, password);
            } catch (e) {
                commit('setError', e)
                throw e;
            }
        },
        async register({dispatch, commit}, {email, password, username, teacher}) {
            try {
                await createUserWithEmailAndPassword(getAuth(), email, password);
                const uid = await dispatch('getUid')
                await set(ref(getDatabase(), `users/${uid}/info`), {
                    username,
                    teacher
                })
            } catch (e) {
                commit('setError', e)
                throw e;
            }
        },
        getUid() {
            const user = getAuth().currentUser;
            return user ? user.uid : null;
        },
        async logout({commit}) {
            await signOut(getAuth());
            commit('clearInfo')
        }
    }
}