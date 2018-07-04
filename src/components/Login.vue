<template>
<div class="row">
    <div>
        <div v-if="currentUser != null">
            <p>Logged in as: <br>{{ currentUser }}</p>
            <button
                type="button"
                class="btn btn-danger"
                @click.prevent="signout"
            >Sign out</button>
        </div>

        <form v-else>
            <div class="class form-group">
                <label class="col-sm-3">Email</label>
                <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                >
            </div>
            <div class="class form-group">
                <label class="col-sm-3">Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Enter password"
                >
            </div>
            <button
                type="button"
                class="btn btn-primary"
                @click.prevent="signin"
            >Sign in</button>
                <!-- <button type="button" class="btn btn-danger" @click.prevent="signout">Sign out</button> -->
        </form>
    </div>
</div>
</template>


<script>
import Firebase from 'firebase'
import {
    store
} from '../store/store.js'

Firebase.auth().onAuthStateChanged(function (user) {
    user ? store.dispatch('setUser', user) : store.dispatch('setUser', null)
    console.log(user)
})

export default {
    methods: {
        signin() {
            let email = document.getElementById('email').value
            let password = document.getElementById('password').value

            Firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password');
                } else {
                    alert(errorMessage);
                }
            })
        },
        signout() {
            Firebase.auth().signOut().then(function () {
                alert('logged out');
            }).catch(function (error) {
                alert(error);
            })
        }
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser
        }
    }
}
</script>

<style>
    form {
        margin: 20px 0;
    }
</style>
