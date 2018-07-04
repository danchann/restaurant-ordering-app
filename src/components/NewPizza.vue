<template>
    <form action="">
        <h3>Add new pizza:</h3>

        <div class="class form-group row">
            <label class="col-sm-3">Name</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" v-model="newPizza.name" required>
            </div>
        </div>

        <div class="class form-group row">
            <label class="col-sm-3">Description</label>
            <div class="col-sm-9">
                <textarea type="text" class="form-control" rows="5" v-model="newPizza.description"></textarea>
            </div>
        </div>

        <p><strong>Option 1:</strong></p>
        <div class="class form-group row">
            <label class="col-sm-3">Size (")</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" v-model="newPizza.options[0].size">
            </div>
        </div>

        <div class="class form-group row">
            <label class="col-sm-3">Price</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" v-model="newPizza.options[0].price">
            </div>
        </div>

         <p><strong>Option 2:</strong></p>
        <div class="class form-group row">
            <label class="col-sm-3">Size (")</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" v-model="newPizza.options[1].size">
            </div>
        </div>

        <div class="class form-group row">
            <label class="col-sm-3">Price</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" v-model="newPizza.options[1].price">
            </div>
        </div>

        <div class="form-group row">
            <button type="button" class="btn btn-success btn-block" @click="addMenuItem">Add</button>
        </div>
    </form>
</template>

<script>
import { dbMenuRef } from '../firebaseConfig.js'
export default {
    data() {
        return {
            newPizza: {
                name: '',
                description: '',
                options: [
                    {
                size: null,
                price: null
                },
                {
                size: null,
                price: null
                }
          ]
            }
        }
    },
    methods: {
        addMenuItem() {
            console.log(this.newPizza)
            if (this.newPizza.name){
                dbMenuRef.push(this.newPizza)
                this.newPizza = {
                    name: '',
                    description: '',
                    options: [
                        {
                            size: null,
                            price: null
                        },
                        {
                            size: null,
                            price: null
                        }
                    ]
                }
            } else {
                alert ('Cannot be blank!')
            }
        },
    }
}
</script>
