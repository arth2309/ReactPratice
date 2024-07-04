import React,{Fragment} from 'react';
import Carrerbanner from '../../../assests/img/CareerBanner.png'
import './Banner.css'

const  Banner = () => {

    
    return (
        <Fragment>
        <div>
        <img src = {Carrerbanner} alt='banner' className='banner' />
        <div className='banner-content'>
            <h1 className='text-banner'><strong><span className='text-orange'>Explore</span> <span className='text-white'>Courses.</span> </strong> </h1>
        </div>
        </div>
        </Fragment>
    )


}

export default Banner;