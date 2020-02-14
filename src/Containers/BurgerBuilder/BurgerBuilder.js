import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import axios from '../../order-axios'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const ingredientPrices = {
    salad : 0.4,
    bacon : 0.6,
    cheese : 0.9,
    meat : 1,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading : false,
        error : false
    }
    componentDidMount(){
        console.log(this.props)
        axios.get('https://route-burger-f38c4.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({
                    ingredients : res.data
                })
            })
            .catch(error => {
                this.setState({
                    error : true
                })
            })
    }
    purchaseCancelHandler = () => {
        this.setState({
            purchasing : false
        })
    }
    purchaseContinueHandler = () => {
       
        const queryParams = []
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname : '/checkout',
            search : '?' + queryString
        })
    }
    purchaseHandler = () => {
        this.setState({
            purchasing : true
        })
    }
    updatePurchaseState (ingredients) {
        
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            })
            .reduce((sum,el) => {
                return sum + el
            }, 0)
            this.setState({
                purchasable : sum > 0
            })
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1 
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = ingredientPrices[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({
            ingredients : updatedIngredients,
            totalPrice : newPrice
        })
        this.updatePurchaseState(updatedIngredients)
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if(oldCount <= 0){
            return alert('please add ingredients')
        }
        const updatedCount = oldCount - 1 
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = ingredientPrices[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceAddition
        this.setState({
            ingredients : updatedIngredients,
            totalPrice : newPrice
        })
        this.updatePurchaseState(updatedIngredients)
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
       
        let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner/>
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                    addedIngredients={this.addIngredientHandler}
                    removedIngredients={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler} />
                </Aux>
            )
            orderSummary = <OrderSummary 
            price={this.state.totalPrice}
            continued={this.purchaseContinueHandler}
            Canceled={this.purchaseCancelHandler}
            ingredients={this.state.ingredients} />
        }
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal 
                modalClosed={this.purchaseCancelHandler}
                show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);