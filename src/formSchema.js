import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup.string()
        .trim()
        .required('name required')
        .min(2, 'name must be at least 2 characters'),
    size: yup.string()
        .required('size required'),
    pepperoni: yup.boolean(),
    jalapenos: yup.boolean(),
    pineapple: yup.boolean(),
    mushrooms: yup.boolean(),
    specialText: yup.string()

})
export default formSchema;