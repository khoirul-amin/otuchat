import React, { Component } from 'react'
import '../assets/loadingStyle.css'
import animationData from '../images/loading.json'
import Lottie from 'react-lottie'

export default class loadingPage extends Component {
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true, 
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };
        return (
            <div>
                <div className='row m-0 justify-content-center' style={{height:'700px'}}> 
                    <div className='loading'>
                        <Lottie options={defaultOptions}
                            height={100}
                            width={100}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
