<template>
<div>
    <ppAdminHidden v-if="currentUser"></ppAdminHidden>
    <hr>
    <div class="class row">
        <div class="class col-sm-12 col-lg-6">
            <pp-login></pp-login>
        </div>
    </div>
</div>
</template>


<script>
import Login from './Login.vue'
import { mapGetters } from 'vuex'

// dynamic import
const AdminHidden = () => import('./AdminHidden.vue')

export default {
    components: {
        ppLogin: Login,
        ppAdminHidden: AdminHidden
    },
    computed: {
        ...mapGetters([
            'currentUser',
        ]),
    },
};
</script>