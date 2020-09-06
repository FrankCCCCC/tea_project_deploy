import React from 'react';
import HeroTitle from '../hero_title/HeroTitle'

class SubmittedPage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps){

    }

    render(){
        return (
            <div style={{paddingTop: "3rem"}}>
                <HeroTitle title={"我們已收到您的訂單"} paragraph={"您的貨品將在幾天內送達"}/>
            </div>
        )
    }
}

export default SubmittedPage