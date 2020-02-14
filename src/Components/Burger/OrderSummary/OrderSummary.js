import React, { Component } from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    componentDidUpdate(){
        console.log('[orderSummary] willUpdate');       
    }
    
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igkey => {
                return (
                    <li key={igkey}>
                        <span style={{ textTransform: 'capitalize' }}>{igkey}</span> : {this.props.ingredients[igkey]}
                    </li>
                )
            })
        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the flowing ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price : <strong>{this.props.price.toFixed(2)}</strong> </p>
                <p>Continue to checkout ?</p>
                <Button btnType="Danger" clicked={this.props.Canceled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.continued}>Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummary;
