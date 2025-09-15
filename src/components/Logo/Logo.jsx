import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png'

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt 
                className="Tilt dib tc pa3 "
                tiltMaxAngleX={55}
                tiltMaxAngleY={55}
            >
                <div style={{ width: '100px', height: '100px'}}>
                    <img src={brain} style={{paddingTop: '5px'}} alt="logo" />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;