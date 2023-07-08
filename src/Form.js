import React, { useState, useEffect } from "react"
import axios from "axios";
import * as yup from 'yup';
import formSchema from './formSchema';

export default function Form(props) {
    const initialFormValues = {
        name: '',
        size: '',
        specialText: '',

        pepperoni: false,
        jalapenos: false,
        pineapple: false,
        mushrooms: false
    }
    const initialFormErrors = {
        name: '',
        size: '',
        specialText: ''
    }
    const initialOrder = [];

    const [formValues, setFormValues] = useState(initialFormValues)
    const [order, setOrder] = useState(initialOrder)
    const [formErrors, setFormErrors] = useState(initialFormErrors)



    const validate = (name, value) => {
        yup.reach(formSchema, name).validate(value)
            .then(() => {
                setFormErrors({ ...formErrors, [name]: "" })
            }).catch(err => {
                setFormErrors({ ...formErrors, [name]: err.errors[0] })
            })
    }
    const change = (name, value) => {
        validate(name, value);
        setFormValues({
            ...formValues, [name]: value
        })
    }
    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const postNewOrder = testOrder => {
        axios.post("https://reqres.in/api/orders", testOrder)
            .then(res => {
                setOrder([res.data, ...order])
            }).catch(err => {
                console.log(err)
            }).finally(() => setFormValues(initialFormValues))
    }
    const submit = () => {
        const newOrder = {
            name: formValues.name.trim(),
            size: formValues.size,
            toppings: ['pepperoni', 'jalapenos', 'pineapple', 'mushrooms'].filter(topping => !!formValues[topping]),
            specialText: formValues.specialText.trim()
        }
        postNewOrder(newOrder);
    }
    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        change(name, valueToUse)
    }
    useEffect(() => {

    })



    return (
        <form id="pizza-form" onSubmit={onSubmit}>
            <div className="errors">
                <div>{formErrors.name}</div>

            </div>

            <label>Name&nbsp;
                <input
                    onChange={onChange}
                    value={formValues.name}
                    id="name-input"
                    name='name'
                    type='text'

                />
            </label>
            <label>Pizza Size
                <select id="size-dropdown"
                    onChange={onChange}
                    value={formValues.size}
                    name='size'
                >
                    <option value=''>- Select an option -</option>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='large'>Large</option>
                </select>
            </label>
            <label>Pepperoni
                <input
                    checked={formValues.pepperoni}
                    onChange={onChange}
                    type='checkbox'
                    name='pepperoni'
                />
            </label>
            <label>Jalapenos
                <input
                    checked={formValues.jalapenos}
                    onChange={onChange}
                    type='checkbox'
                    name='jalapenos'
                />
            </label>
            <label>Mushrooms
                <input
                    checked={formValues.mushrooms}

                    onChange={onChange}
                    type='checkbox'
                    name='mushrooms'
                />
            </label>
            <label>Pineapple
                <input
                    checked={formValues.pineapple}

                    onChange={onChange}
                    type='checkbox'
                    name='pineapple'
                />
            </label>

            <label>Special Instructions&nbsp;
                <input
                    value={formValues.specialText}
                    onChange={onChange}
                    id="special-text"
                    name='specialText'
                    type='text'
                />
            </label>
            <button id="order-button">Submit</button>

        </form>

    )
}