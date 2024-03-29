import React from 'react';
import DefaultBanner from '../../../images/bannerDefault.png';

const SeparatorBanner = ( props ) => {

    const { title, bannerPhoto } = props;

    return (
        <div className='border-solid border-b-8 border-green-400 border-t-8 my-10'>
            <div className='h-32 w-full absolute flex text-white items-center justify-center z-10'>
                <div className='element text-center'>
                    <h1 className='font-semibold text-3xl truncate'> { title } </h1>
                </div>
            </div>
            <img 
            style={{ filter:'brightness(0.6)' }}
            className='h-32 w-full object-cover object-center'
            alt=''
            src={ bannerPhoto ? bannerPhoto : DefaultBanner }/>
        </div>
    );
};

export default SeparatorBanner;
