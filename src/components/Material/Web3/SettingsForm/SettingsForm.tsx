import * as React from 'react';

import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
// import { RadioButton } from 'material-ui/RadioButton'
import MenuItem from 'material-ui/MenuItem'
// import { AutoComplete as MUIAutoComplete } from 'material-ui'
import {
    //   AutoComplete,
    //   Checkbox,
    //   DatePicker,
    //   TimePicker,
    //   RadioButtonGroup,
    SelectField,
    //   Slider,
    // TextField,
    //   Toggle
} from 'redux-form-material-ui'


export class FormComponent extends React.Component<any, any> {
    //   componentDidMount() {
    //     this.refs.name // the Field
    //       .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    //       .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    //       .focus() // on TextField
    //   }

    render() {
        const f: any = this.props

        const { handleSubmit } = f
        return (
            <form >
                <Field style={{ width: '100%' }} name='provider' component={SelectField} hintText='Select a provider'
                    onChange={(event: any) => {
                        setTimeout(() => {
                            console.log
                            handleSubmit()
                        }, .25 * 1000)
                    }}>
                    <MenuItem value='testrpc' primaryText='Test RPC' />
                    <MenuItem value='metamask' primaryText='MetaMask' />
                    <MenuItem value='infura' primaryText='Infura' />
                    <MenuItem value='parity' primaryText='Parity' />
                </Field>
                {/* <code>
                    {JSON.stringify(this.props.transmute)}
                </code> */}
            </form>
        )
    }
}


let FC: any = FormComponent;
let Form: any = connect((state: any) => ({
    transmute: state.transmute
}))(FC)


export default reduxForm({
    form: 'example',
    initialValues: {
        provider: 'testrpc'
    }
})(Form)