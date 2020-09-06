import React from 'react';
import ShoppingList from '../shoppingList/ShoppingList'
import HeroTitile from '../hero_title/HeroTitle'
import {font_style} from '../theme/font';
import TextBox from '../form/TextBox'
import {infoSetInfo, infoGetState, cartGetState, cartClearCart} from  '../redux/action'
import {name,
        phone_number,
        email,
        county,
        township,
        village,
        road,
        zip,
        name_input_error,
        phone_number_input_error,
        email_input_error,
        county_input_error,
        township_input_error,
        village_input_error,
        road_input_error,
        zip_input_error,
        agree_privacy_term1,
        agree_privacy_term2,
        agree_receive_notice,
        privacy_term_link,
        agree_privacy_term_error,
        submit_order,
        cart_is_empty
    } from '../theme/text';
import Color from '../theme/color'
import Shape from '../theme/Shape'
import {fetchInsertOrder} from '../fetch/fetchOrder'
import {makeAlert} from '../popUps/Alert'

class CartPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form_ref: React.createRef(),
            first_name: "",
            last_name: "",
            phone_number: "",
            county: "",
            township: "",
            road: "",
            agree_receive_notice: true,
            agree_privacy_term: false,
            is_validated: "needs-validation"
        }

        this.handle_input_change = this.handle_input_change.bind(this);
        this.handle_submit_click = this.handle_submit_click.bind(this);
    }

    handle_input_change(event){
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox'? target.checked : target.value;
        this.setState({
            [name]: value
        })
        infoSetInfo(name, value)
        console.log(name + value)
    }

    handle_submit_click(event){
        // var form = event.target;
        var form = this.state.form_ref.current
        var cart = cartGetState().cart
        console.log(form)
        console.log(form.checkValidity())
        if(form.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();
        }else if(Array.isArray(cart)){
            if(cart.length > 0){
                // let cart = cartGetState().cart
                let total_price = cartGetState().total_price
                let unit = cartGetState().unit
                let total_number = cartGetState().total_number
                let info = infoGetState().info
                fetchInsertOrder(
                    info.name, 
                    info.phone_number,
                    info.email,
                    undefined, // info.bank_code
                    undefined, // info.bank_account
                    "臺灣",
                    info.zip,
                    "臺灣省",
                    info.county,
                    info.township,
                    info.village,
                    info.road,
                    cart,
                    total_price,
                    unit,
                    total_number,
                    info.agree_privacy_term,
                    info.agree_receive_notice,
                    info.comment
                )
                cartClearCart()
            }else{
                event.preventDefault();
                event.stopPropagation();
                makeAlert(cart_is_empty, "", 5000)
            }
        }else{
            event.preventDefault();
            event.stopPropagation();
            makeAlert(cart_is_empty, "", 5000)
        }
        this.setState({
            is_validated: "needs-validation was-validated"
        })
        
    }

    render(){
        return (
            <div>
                <div style={{height: "3rem"}}></div>
                <HeroTitile title={"購物車"}/>
                <div class="container">
                    <ShoppingList/>
                </div>

                <HeroTitile title={"購買人資訊"}/>
                <div class="container mb-3" style={font_style}>
                    
                    <form class={this.state.is_validated} ref={this.state.form_ref} novalidate>
                        <div class="form-row">
                            <div class="col-md-4 mb-3">
                                {/* <label for="validation_name" style={{fontFamily: font_style.fontFamily, color: Color.greyDark, fontWeight: "bold"}}>{name}</label>
                                <input type="text" name="name" class="form-control" id="validation_name" onChange={this.handle_input_change} style={{border: `1px solid ${Color.greenDark}`}} required/>
                                <div class="invalid-feedback">{name_input_error}</div> */}
                                <TextBox input_name={"name"} label={name} value={infoGetState().info.name} handle_on_change={this.handle_input_change} invalid_feedback={name_input_error} is_required={true}/>
                            </div>
                            <div class="col-md-4 mb-3">
                                {/* <label for="validation_phone_number" style={{fontFamily: font_style.fontFamily, color: Color.greyDark, fontWeight: "bold"}}>{phone_number}</label>
                                <input type="text" name="phone_number" pattern="[0-9]{9,}" class="form-control" id="validation_phone_number" onChange={this.handle_input_change} style={{border: `1px solid ${Color.greenDark}`}} required/>
                                <div class="invalid-feedback">{phone_number_input_error}</div> */}
                                <TextBox input_name={"phone_number"} label={phone_number} value={infoGetState().info.phone_number} handle_on_change={this.handle_input_change} pattern={"[0-9]{9,}"} invalid_feedback={phone_number_input_error} is_required={true}/>
                            </div>
                            <div class="col-md-4 mb-3">
                                {/* <label for="validation_email" style={{fontFamily: font_style.fontFamily, color: Color.greyDark, fontWeight: "bold"}}>{email}</label>
                                <input type="text" name="email" pattern="[^@\s]+@[^@\s]+" class="form-control" id="validation_email" onChange={this.handle_input_change} style={{border: `1px solid ${Color.greenDark}`}} required/>
                                <div class="invalid-feedback">{email_input_error}</div> */}
                                <TextBox input_name={"email"} label={email} value={infoGetState().info.email} handle_on_change={this.handle_input_change} pattern={"[^@]+@[^@]+"} invalid_feedback={email_input_error} is_required={true}/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-4 mb-3">
                                {/* <label for="validation_zip">{zip}</label>
                                <input type="text" name="zip" pattern="[0-9]{5}" class="form-control" id="validation_zip" onChange={this.handle_input_change} style={{border: `1px solid ${Color.greenDark}`}} required/>
                                <div class="invalid-feedback">{zip_input_error}</div> */}
                                <TextBox input_name={"zip"} label={zip} value={infoGetState().info.zip} handle_on_change={this.handle_input_change} pattern={"[0-9]{5}"} invalid_feedback={zip_input_error} is_required={true}/>
                            </div>
                            <div class="col-md-4 mb-3">
                                {/* <label for="validation_county">{county}</label>
                                <input type="text" name="county" class="form-control" id="validation_county" onChange={this.handle_input_change} required/>
                                <div class="invalid-feedback">{county_input_error}</div> */}
                                <TextBox input_name={"county"} label={county} value={infoGetState().info.county} handle_on_change={this.handle_input_change} invalid_feedback={county_input_error} is_required={true}/>
                            </div>
                            <div class="col-md-4 mb-3">
                                {/* <label for="validation_township">{township}</label>
                                <input type="text" name="township" class="form-control" id="validation_township" onChange={this.handle_input_change} required/>
                                <div class="invalid-feedback">{township_input_error}</div> */}
                                <TextBox input_name={"township"} label={township} value={infoGetState().info.township} handle_on_change={this.handle_input_change} invalid_feedback={township_input_error} is_required={true}/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-6 mb-3">
                                <TextBox input_name={"village"} label={village} value={infoGetState().info.village} handle_on_change={this.handle_input_change} invalid_feedback={village_input_error} is_required={true}/>
                            </div>
                            <div class="col-md-6 mb-3">
                                <TextBox input_name={"road"} label={road} value={infoGetState().info.road} handle_on_change={this.handle_input_change} invalid_feedback={road_input_error} is_required={true}/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="custom-control custom-checkbox  mb-3" style={{marginLeft: "1.5rem"}}>
                                <input class="custom-control-input" type="checkbox" name="agree_receive_notice" value="" id="agree_receive_notice" onChange={this.handle_input_change} checked={this.state.agree_receive_notice}/>
                                <label class="custom-control-label" for="agree_receive_notice" style={{fontFamily: font_style.fontFamily, color: Color.greyDark, fontWeight: "bold"}}>
                                    {agree_receive_notice}
                                </label>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="custom-control custom-checkbox mb-3" style={{marginLeft: "1.5rem"}}>
                                <input class="custom-control-input" type="checkbox" name="agree_privacy_term" value="" id="agree_privacy_term"  onChange={this.handle_input_change} required/>
                                <label class="custom-control-label" for="agree_privacy_term" style={{fontFamily: font_style.fontFamily, color: Color.greyDark, fontWeight: "bold"}}>
                                    {agree_privacy_term1}
                                    <a href={privacy_term_link}>{agree_privacy_term2}</a>
                                </label>
                                <div class="invalid-feedback">{agree_privacy_term_error}</div>
                            </div>
                        </div>
                        {/* <div style={{textAlign: "center", width: "100%"}}> */}
                        <button class="btn btn-dark btn-pill" type="submit" onClick={this.handle_submit_click} style={{width: "100%"}}>{submit_order}</button>
                        {/* </div> */}
                        
                    </form>
                </div>
            </div>
        );
    }
}


export default CartPage;