<template>
    <div class="cart-wrapper">
        <h1>Shopping cart</h1>
        <div class="shopping-cart" v-if="products.length > 0">
            <div class="shopping-cart_row" v-for="product in products" v-bind:key="product.id">
                <div class="product">
                    <div class="product_image">
                        <img class="product_image_picture" :src="product.image" alt="Product image">
                    </div>
                    <div class="product_details">
                        <div class="product_details_description">
                            <strong>{{ product.title }}</strong>
                            <p>{{ product.category }}</p>
                            <p>{{ product.description }}</p>
                            <star-rating :starwidth="product.rating.rate/5*100" :ratingcount="product.rating.count"></star-rating>
                        </div>
                        <div class="product_details_shipping">
                            <p>Delivery stuff blabla</p>
                        </div>
                    </div>
                    <div class="product_actions">
                        <div class="product_actions_buttons">
                        <badge-button @click="removeProduct(product)">🗑️ Remove</badge-button>
                            </div>
                        <div class="product_actions_price">
                            <!-- Format to 2 digits after comma -->
                            <strong>${{ product.price }}</strong>
                        </div>
                    </div>
                </div>
                <br>
            </div>
        </div>
        <div v-else>
            Empty cart
        </div>
    </div>
</template>

<script>
import { BadgeButton, StarRating } from '@cgi/styleguide';

export default {
    Name: 'CartPage',
    props: {
        // TODO: Turn prop into data
        products: Array
    },
    components: {
        StarRating,
        BadgeButton
    },
    methods: {
        // TODO: Share event dispatcher across Angular product page & CartPage?
        // Vue does not want the parameters typed but Angular does?
        publishProductEvent(eventId, detail) {
            const productEvent = new CustomEvent(eventId, { detail });
            window.dispatchEvent(productEvent);
        },
        removeProduct(product) {
            this.products.splice(this.products.findIndex(x => x.id == product.id), 1);
            this.publishProductEvent('removeProductFromCart', { product })
        }
    }
}
</script>

<style>
    .star-rating {
        position: relative;
        display: inline-block;
        width: 5rem;
        height: 1.5rem;
        vertical-align: bottom;
    }
    .star-rating:after, .star-rating:before {
        position: absolute;
    }
    .star-rating:before {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: block;
        width: 5rem;
        content: '';
        background-image: url("data:image/svg+xml;base64,IDxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTQnIGhlaWdodD0nMTQnIGZpbGw9J3JnYigyMzAsMjMwLDIzMCknPjxwYXRoIGZpbGwtcnVsZT0nZXZlbm9kZCcgZD0nTTQuNTIgMTEuODk2Yy0uNjMzLjI4MS0xLjE5OS0uMTc5LTEuMDMzLS44NTVsLjU0OC0yLjIyNGEuNDQzLjQ0MyAwIDAwLS4xMDQtLjM0M2wtMS42MjItMS41MWMtLjQ5LS40NTUtLjMxMy0xLjE1Mi4zNC0xLjMxOGwyLjE2My0uNTQ5YS43NzQuNzc0IDAgMDAuMzg0LS4zMDVsMS4xMzUtMi4zMDZjLjI5OS0uNjA2IDEuMDMtLjYxOCAxLjMzNSAwTDguOCA0Ljc5MmEuNzkxLjc5MSAwIDAwLjM4NS4zMDVsMi4xNjIuNTVjLjY0Ny4xNjMuODM1Ljg1Ny4zNCAxLjMxOGwtMS42MjEgMS41MWEuNDc0LjQ3NCAwIDAwLS4xMDUuMzQybC41NDggMi4yMjRjLjE2OC42ODQtLjQwMiAxLjEzNi0xLjAzMy44NTVsLTIuMjE3LS45ODVhLjgyMi44MjIgMCAwMC0uNTIyIDBsLTIuMjE3Ljk4NXonLz48L3N2Zz4=");
        background-repeat: repeat-x;
        background-position: left 50%;
        background-size: 1rem;
    }
    .star-rating>span, .star-rating>span:before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        display: block;
    }
    .star-rating>span:before {
        right: 0;
        content: '';
        background-repeat: repeat-x;
        background-position: left 50%;
        background-size: 1rem;
        background-image: url("data:image/svg+xml;base64,IDxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTQnIGhlaWdodD0nMTQnIGZpbGw9J3JnYigyNTUsMjA1LDApJz48cGF0aCBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGQ9J000LjUyIDExLjg5NmMtLjYzMy4yODEtMS4xOTktLjE3OS0xLjAzMy0uODU1bC41NDgtMi4yMjRhLjQ0My40NDMgMCAwMC0uMTA0LS4zNDNsLTEuNjIyLTEuNTFjLS40OS0uNDU1LS4zMTMtMS4xNTIuMzQtMS4zMThsMi4xNjMtLjU0OWEuNzc0Ljc3NCAwIDAwLjM4NC0uMzA1bDEuMTM1LTIuMzA2Yy4yOTktLjYwNiAxLjAzLS42MTggMS4zMzUgMEw4LjggNC43OTJhLjc5MS43OTEgMCAwMC4zODUuMzA1bDIuMTYyLjU1Yy42NDcuMTYzLjgzNS44NTcuMzQgMS4zMThsLTEuNjIxIDEuNTFhLjQ3NC40NzQgMCAwMC0uMTA1LjM0MmwuNTQ4IDIuMjI0Yy4xNjguNjg0LS40MDIgMS4xMzYtMS4wMzMuODU1bC0yLjIxNy0uOTg1YS44MjIuODIyIDAgMDAtLjUyMiAwbC0yLjIxNy45ODV6Jy8+PC9zdmc+");
    }
    .cart-wrapper {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 0px 100px;
    }
    .shopping-cart {
        padding: 1px;
    }
    .shopping-cart_row:first-child {
        border-width: 1px 0;
        border-style: solid;
        border-color: #aaa;
    }
    .shopping-cart_row {
        padding-top: 24px;
        border-width: 0 0 1px;
        border-style: solid;
        border-color: #aaa;
    }
    .product {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
    }
    .product_image {
        display: flex;
        justify-content: center;
        width: 15%;
    }
    .product_details {
        width: 85%;
        display: flex;
    }
    .product_details_description {
        width: 65%;
        padding-left: 24px;
    }
    .product_details_shipping {
        text-align: center;
        width: 35%;
    }
    .product_actions {
        display: flex;
        width: 80%;
        justify-content: flex-end;
    }
    .product_actions_buttons {
        width: 25%;
        display: flex;
        justify-content: center;
    }
    .product_actions_price {
        width: 10%;
        display: flex;
        align-items: center;
    }
    .product_image_picture {
        max-height: 200px;
        max-width: 220px;
    }
</style>