import React, { Component } from 'react'

class Logout extends Component {


    componentDidMount(){
        localStorage.removeItem('isLogin')
        window.location='/'
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default Logout