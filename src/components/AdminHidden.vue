<template>
    <section>
    <div class="row">
        <div class="class col-sm-12 col-md-6">
            <pp-new-pizza></pp-new-pizza>
        </div>
        <div class="class col-sm-12 col-md-6">
            <h3>Menu:</h3>
            <table class="table table-hover">
                <thead class="thead-default">
                    <tr>
                        <th>Item</th>
                        <th>Remove from menu</th>
                    </tr>
                </thead>
                <tbody v-for="item in getMenuItems"  :key="item['.key']">
                    <tr>
                        <td>{{ item.name }}</td>
                        <td>
                            <button 
                                class="btn btn-danger btn-sm"
                                v-confirm="{
                                    loader: true,
                                    ok: dialog => removeMenuItem(dialog, item['.key']),
                                    message: 'Are you sure you want to delete?'
                                }"
                                >X</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
    <div class="class row">
        <div class="class col-sm-12">
            <h3>Current Orders: {{ numberOfOrders }}</h3>
            <div><b>Current Time: </b>{{ moment(now).format() }}</div>
            <table class="table table-sm" v-for="(orders, index) in getOrders" :key="orders['.key']">
                <thead class="thead-default">
                    <tr>
                        <th>Item</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <div class="order-number">
                        <strong><em>Order Number: {{ index + 1 }}</em></strong>
                        <button class="btn btn-outline-danger btn-sm" 
                            v-confirm="{
                                    loader: false,
                                    ok: dialog => removeOrderItem(dialog, orders['.key']),
                                    message: 'Are you sure you want to delete?'
                                }"
                        >X</button>
                        
                        <div>Order Time: {{ moment(getOrderTime[index]).format() }}  <br>
                            <em>Elasped Time: </em> 
                            <span :style="sytleState">
                                {{ elaspedTime[index].days }} days
                                {{ elaspedTime[index].hours }} hrs
                                {{ elaspedTime[index].minutes }} min
                                {{ elaspedTime[index].seconds }} sec
                            </span>
                        </div>
                    </div>
                    <tr v-for="(orderItems, index) in orders['.value']" :key='index'>
                        <td>{{ orderItems.name }}</td>
                        <td>{{ orderItems.size }}</td>
                        <td>{{ orderItems.quantity }}</td>
                        <td>{{ orderItems.price | currency }}</td>
                        <td><b>{{ (orderItems.quantity*orderItems.price) | currency }}</b></td>
                    </tr>
                    
                </tbody>
            </table>
            <table class="table table-sm">
                <tbody>
                    <tr>
                        <td align="right"><b>Total: {{ total() | currency }}</b></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </section>
</template>

<script>
import NewPizza from './NewPizza.vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
import { dbMenuRef, dbOrdersRef } from '../firebaseConfig'

export default {
    data() {
        return {
            orderTime:0,
            interval: null,
            now: '',
            timeElapsed: 0,
            timeElapsedFormat: {
            },
            
        };
    },
    components: {
        ppNewPizza: NewPizza,
    },
    computed: {
        ...mapGetters([
            'numberOfOrders',
            'getMenuItems',
            'getOrders',
        ]),
        sytleState() {
            if (this.timeElapsed >= 30 * 60000 ) { // minutes
                return {
                    color: 'red'
                }
            } 
        },
        getOrderTime() {
            return this.getOrders.map(function(orders) {
                return orders['.value'][0]['orderTime']
            }) 
        },
        elaspedTime() {
            let now = this.now
            return this.getOrders.map(function(orders) {
                let value = now - orders['.value'][0]['orderTime']
                return { 
                    days: moment.duration(value).days(), 
                    hours: moment.duration(value).hours(), 
                    minutes: moment.duration(value).minutes(), 
                    seconds: moment.duration(value).seconds() 
                    }
            }) 
        },
        
    },
    methods: {
        removeMenuItem(dialog, key) {
            dbMenuRef.child(key).remove()
                .then((error) => {
                    dialog.close()
                    console.log("Remove succeeded")
                })
                .catch((error) => {
                    console.log("Remove failed: " + error.message)
                })
        },
        removeOrderItem(dialog, key) {
            dbOrdersRef.child(key).remove()
                .then((error) => {
                    // dialog.close()
                    console.log("Remove succeeded")
                })
                .catch((error) => {
                    console.log("Remove failed: " + error.message)
                })
        },
        total: function() {
            // calculates total price
            let total=0;
            for (let x in this.getOrders) {
                for (let y in this.getOrders[x]['.value']) {
                    total += this.getOrders[x]['.value'][y]['quantity'] 
                    * this.getOrders[x]['.value'][y]['price']  
                }
            }
            return total;
        },
        moment,
    },
    filters: {
        formatOrderTime(value) {
            return moment(value).format("YYYY-MM-DD dddd HH:MM:SS ") 
        },
    },
    beforeDestroy() {
        /**
         * Clear the interval when destroying the component.
         * In this case unnecessary, but when dealing with components may be very useful
         * to clear up resources.
         */
        clearInterval(this.interval)
    },
    mounted() {
        // When the component/instance is mounted, update this.now each second
        let timer = setInterval(() => {
            this.now = Date.now()
        }, 1000)
        // this.calcTotal();
    }
};
</script>

<style>
    .order-number {
        margin: 10px 0;
    }
</style>