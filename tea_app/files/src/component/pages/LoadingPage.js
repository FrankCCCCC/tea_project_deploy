import React from 'react';
import logo from '../img/leafhopper_logo.png'
import {title_style, subtitle_style, paragraph_style} from '../theme/font'


class LoadingPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            is_fadein: false
        }
        this.duration = 1.0;
        this.delay = 0.1;
        this.fadein = `opacity ${this.duration - this.delay}s ${this.delay}s`
        this.fadeout = `opacity ${this.duration - this.delay}s ${this.delay}s`;
    }

    componentDidMount(){
        this.intervalId = setInterval(() => {
            let last = this.state.is_fadein;
            // console.log(last)
            this.setState({
                is_fadein: !last
            })
        }, this.duration * 1000)
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    render(){
        return(
            <div style={{textAlign: 'center', verticalAlign: "middle",  marginTop: "30vh",  marginBottom: "30vh"}}>
                {this.state.is_fadein? 
                    <img src={logo} style={{marginBottom: "1rem", opacity:0.1, width:"auto", height:"40vmin", transition: this.fadein}}/> : 
                    <img src={logo} style={{height: "40vmin", width: "auto", marginBottom: "1rem", opacity:1, transition: this.fadeout}}/>
                }
                {this.state.is_fadein? 
                    <h4 style={{opacity:0.1, transition: this.fadein}}>Loading...</h4> :
                    <h4 style={{opacity:1, transition: this.fadeout}}>Loading...</h4>
                }
            </div>
        );
    }
}

export default LoadingPage;