import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "@/utils/message.plugin";
import Loader from "@/components/app/Loader";
import "materialize-css/dist/js/materialize.min";
import "./registerServiceWorker";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAwwimePkUZA7epMpb3W8WoO9QQiV-xPwQ",
    authDomain: "kids-edu-platform.firebaseapp.com",
    databaseURL: "https://kids-edu-platform-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "kids-edu-platform",
    storageBucket: "kids-edu-platform.appspot.com",
    messagingSenderId: "774552168099",
    appId: "1:774552168099:web:47331b2d9ed9307167c116"
};

initializeApp(firebaseConfig);

let app

onAuthStateChanged(getAuth(), (user) => {
    if (!app) {
        app = createApp(App)
            .use(router)
            .use(store)
            .use(router)
            .use(messagePlugin)
            .component('Loader', Loader)
            .mount("#app");
    }
})