import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import cropper from 'vue-image-crop-upload'
// import Pagination from 'v-pagination-3';
import messagePlugin from "@/utils/message.plugin";
import filtersPlugin from "@/utils/filters.plugin";
import Loader from "@/components/app/Loader";
import Pagination from "@/components/app/Pagination";
import vueAnkaCropper from 'vue-anka-cropper'
import tooltipDirective from "@/directives/tooltip.directive";
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
            .use(filtersPlugin)
            .directive('tooltip', tooltipDirective)
            .component('Cropper', cropper)
            .component('Pagination', Pagination)
            .component('VueAnkaCropper', vueAnkaCropper)
            .component('Loader', Loader)
            .mount("#app");
    }
})