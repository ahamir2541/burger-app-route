import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button'
import './ContactData.css'
import axios from '../../../order-axios'
import Spinner from '../../../Components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault()
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'max',
                address: {
                    street: 'Dhaka',
                    zip: '3433',
                    country: 'Bangladesh'
                },
                email: 'hello@gmail.com'
            },
            delivary: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                
                })
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({
                    loading: false,

                })
            })
    }
    render() {
        let form = (
            <form>
                <input className="Input" type="text" name="name" placeholder="your name" />
                <input className="Input" type="email" name="email" placeholder="your email" />
                <input className="Input" type="text" name="street" placeholder="street" />
                <input className="Input" type="text" name="postal" placeholder="postal" />
                <Button
                    clicked={this.orderHandler}
                    btnType="Success">ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className="ContactData">
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;