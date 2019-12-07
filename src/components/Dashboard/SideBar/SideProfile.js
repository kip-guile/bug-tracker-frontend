import React from 'react'
import { Button } from 'antd';

const SideProfile = () => {

    const imageStyle = {
        paddingTop: '20%',
        borderRadius: '50%',
        paddingBottom: '1em',
        width: '100px',
        height: '100%'
      }

    return (
        <div style={{ textAlign: 'center' }}>
            <img
            src="https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Ladybug-512.png"
            alt="icon"
            style={imageStyle}
            />
            <br/>
            <Button
            style={{
                background: '#BB0A21',
                border: 'none',
                color: 'white',
                marginTop: '10%'
                }}>
                Create Project +
            </Button>
        </div>
    )
}

export default SideProfile