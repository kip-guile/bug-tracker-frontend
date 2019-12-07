import React from 'react'

const SideFooter = () => {

    const footerStyle = {
        textAlign:'center',
        color:'#252627',
        marginTop: '19vh',
    }

    return <div style={footerStyle}>
        <h3 style={{color:'white', paddingBottom:'1.5em'}}>Alexander Oguejiofor</h3>
        <p style={{color:'white'}}>Copyright, 2019</p>
    </div>
}

export default SideFooter