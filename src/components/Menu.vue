<template>
<div class="class row">
    <div class="class col-sm-12 md-6">
        <table class="class table table-hover">
            <thead class="thead-default">
                <tr>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Add to basket</th>
                </tr>
            </thead>
            <tbody v-for="item in getMenuItems" :key="item['.key']">
                <tr>
                    <td><strong>{{ item.name }}</strong></td>
                </tr>
                <tr v-for="(option, index2) in item.options" :key="index2" >
                    <td>{{ option.size }}</td>
                    <td>{{ option.price | currency }}</td>
                    <td >
                        <button 
                            class="btn btn-sm btn-outline-success"
                            type="button"
                            @click="addToBasket( item, option)"
                            :disabled="isDisable(item, option, basket)" 
                        >+</button>
                        <span v-if="isDisable(item, option, basket)">
                            {{ maxText }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- Shopping Basket -->
    <div class="class col-sm-12 col-md-6">
        <div v-if="basket.length > 0">
            <table class="class table">
                <thead class="thead-default">
                    <tr>
                        <th>Quantity</th>
                        <th>Item</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in basket" :key="index">
                    <tr>
                        <td>
                            <button
                                class="btn btn-sm"
                                type="button"
                                @click="increaseQuantity(item)" 
                                :disabled="item.quantity >= itemMaxQty"
                            >+</button>
                                <span>{{ item.quantity }}</span>
                                <button
                                    class="btn btn-sm"
                                    type="button"
                                    @click="decreaseQuantity(item)"
                                    :disabled="item.quantity < 1"
                                >-</button>
                        </td>
                        <td>{{ item.name }} {{ item.size }}"</td>
                        <td>{{ getSubTotal(item) }}</td>
                        <td>
                        <button
                            class="btn btn-sm btn-outline-danger"
                            type="button"
                            @click="removeFromBasket( item)"
                        >X</button>
                    </td>
                    </tr>
                </tbody>
            </table>
            <p align="right"><b>Order total: {{ total | currency }} </b></p>
            <button
                class="class btn btn-success btn-block"
                @click="addNewOrder"
            >Place Order</button>
        </div>
        <div v-else>
            <p>{{ basketText }}</p> 
            <!-- {{ this.$store.state.orders }} -->
        </div>
        
    </div>
</div>
</template>

<style>
.open {
    background: gray;
}
</style>

<script>
import { mapGetters } from 'vuex'
import { dbOrdersRef } from '../firebaseConfig'
export default {
    data() {
        return {
            basket: [],
            basketText: "Your basket is empty!",
            itemMaxQty: 10,
            maxText: "Max number allowed!",
        };
    },
    computed: {
        ...mapGetters ([
            'getMenuItems',
        ]),
        total() {
            let totalCost = 0;
            for (let items in this.basket) {
                let individualItem = this.basket[items];
                totalCost += individualItem.quantity * individualItem.price
            }
            return totalCost;
        }
        // getMenuItems() {
        //     //   return this.$store.state.menuItems
        //     return this.$store.getters.getMenuItems
        // }
    },
    methods: {
        addToBasket(item, option, index1, index2) {
            if (this.basket.length > 0) {
                for (let x in this.basket) {
                    if (this.basket[x].name === item.name && // if item already in basket
                        this.basket[x].size === option.size) { 
                        this.basket[x].quantity++; // add one to its qty instead
                        return;
                    }
                }
            }
            this.basket.push({
                name: item.name,
                price: option.price,
                size: option.size,
                quantity: 1,
                orderTime: null, 
            });
        },
        isDisable(item, option, basket) {
            if (basket) {
                for (let x in basket) {
                    if (basket[x].name === item.name && basket[x].size === option.size) { 
                        if (basket[x].quantity >= this.itemMaxQty) {
                            this.maxText = "Max!"
                            return true
                        }
                    }
                }
            } else {
                return false
            }
        },
        removeFromBasket(item) {
            console.log(item)
            this.basket.splice(this.basket.indexOf(item), 1);
        },
        increaseQuantity(item) {
            if (item.quantity < this.itemMaxQty) {
                item.quantity++;
            }
        },
        decreaseQuantity(item) {
            if (item.quantity > 0) {
                item.quantity--;
                // if (item.quantity <= 0) {
                //     this.basket.splice(this.basket.indexOf(item), 1);
                // }
            }
        },
        addNewOrder(item) {
            // this.$store.commit('addOrder', this.basket)
            this.basket[0].orderTime = Date.now()
            console.log(this.basket)
            for (let x in this.basket) {
                if (this.basket[x].quantity <= 0) {
                    this.basket.splice(x, 1);
                }
            }
            dbOrdersRef.push(this.basket)
            console.log(this.basket)
            this.basket = []
            this.basketText = "Thank you, your order has been placed! :)"
        },
        getSubTotal(item) {
            // console.log(item)
           return (item.price * item.quantity).toFixed(2) 
        },
        
    }
};
</script>
