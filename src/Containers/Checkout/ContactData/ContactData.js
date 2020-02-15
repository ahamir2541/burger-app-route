import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button'
import './ContactData.css'
import axios from '../../../order-axios'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Input from '../../../Components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name',
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'street',
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code',
                },
                value: '',
                validation : {
                    required : true,
                    minLength : 5,
                    maxLength : 5,
                },
                valid : false,
                touched : false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'country',
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'your email',
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            delivaryMethod: {
                elementType: 'select',
                elementConfig: {
                    options : [
                        { 
                        value : 'fastest',
                        displayValue : 'Fastest'
                    },
                    {
                        value : 'cheapest',
                        displayValue : 'Cheapest'
                    },
                ]
                },
                value: '',
                validation : {},
                valid : true
            },
        },
        formIsValid : false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({
            loading: true
        })
        const formData = {}
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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
    checkValidity = (value, rules) => {
        let isValid = true
        if(!rules){
            return true
        }
        if (rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedOrderForm[inputIdentifier] = updatedFormElement
        updatedOrderForm.touched = true
        
        let formIsValid = true
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        console.log(formIsValid)
        this.setState({
            orderForm : updatedOrderForm,
            formIsValid : formIsValid
        })
    }
    render() {
        const formElementArray = []
        for(let key in this.state.orderForm){
            formElementArray.push({
                id : key,
                config : this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>             
                {formElementArray.map(formElement => (
                    <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button
                    disabled={!this.state.formIsValid}
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