import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { IOSSwitch } from '../styles';
import { Fragment } from 'react';

const CloseBusiness = ( props ) => {

    const { input } = props;

    const type = typeof input.isOpenBusiness;

    return (
        <Fragment>
            <FormControlLabel
            control={
            <IOSSwitch
            checked={ type === 'boolean' ? input.isOpenBusiness : false } 
            name="isOpenBusiness" 
            />}
            label={ !input.isOpenBusiness ? 'Online' : 'Offline' }
            />
            <h1 className='font-light text-center px-5 text-gray-500'> 
                *To custom information, just touch or click over the text, modify it and finally save changes clicking the button save changes*
            </h1> 
        </Fragment>
    );
};

export default CloseBusiness;
