import React from 'react'
import Color from '../theme/color'
import Shape from '../theme/Shape'
import ShoppingCart from '../img/shopping_cart.svg'

function Fab(props) {

    return (
        <div style={{display: "table", position: "fixed", bottom: "3rem", right: "3rem", background: Color.greenLight, boxShadow: `5px 5px 20px ${Color.greenLight}`, borderRadius: Shape.half_circle, width: "3rem", height: "3rem", zIndex: 100}}>
            <div style={{display: "table-cell", verticalAlign: "middle", textAlign: "center"}}>
                <img src={ShoppingCart} style={{width: "1.6rem", height: "1.6rem"}}/>
            </div>
            
            {/* <button style={{background: Color.greenDark, borderRadius: Shape.half_circle}}>ABC</button> */}
            {/* <a style={{background: Color.greenDark, borderRadius: Shape.half_circle, width: "5rem", height: "5rem"}}> */}
            {/* </a> */}
        </div>
            
    )
}

export default Fab