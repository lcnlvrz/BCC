import React, { useEffect, useRef, useState } from 'react'
import BCClogo from '../../../../images/bccLogo.png';
import Input from '../../../reusableComponents/Input';
import emailValidator from 'email-validator';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import { defaultTransiton } from '../../../../constants/styles';
import { Link } from 'react-router-dom';
import PropagateLoader from "react-spinners/PropagateLoader";
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import { useMediaQuery } from 'react-responsive';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import { validateCode } from '../../../../helpers/validations';
import ImageContainer from '../../../reusableComponents/ImageContainer';

const SecondStep = () => {

    const [input, setInput] = useState( { code:'' } );

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const inputEmailRef = useRef( null );

    const [initialColorInput, setInitialColorInput] = useState( '#000000' );
    
    const [loading, setLoading] = useState( false );


    return (
        <div 
        style={{ overflow:'hidden' }}
        className='text-center flex flex-col items-center justify-center w-3/4 bg-white rounded p-5 space-y-10 absolute'>
            <p className={ `font-semibold text-center ${ mobileResolution ? 'text-sm' : 'text-lg' }` }> 
                We send an email to <span className='text-green-500'> lucianoalvarez1212@gmail.com </span> 
                with the code for confirm your account
            </p>
            <form 
            onChange={ (e) => setInput({ code:e.target.value }) }
            onSubmit={ (e) => { 

                e.preventDefault();

                setInitialColorInput( '#000000' );
                setAlert( { type:'', message:'' } );

                console.log( input.code );

                const isValid = validateCode( Number(input.code) );

                console.log( isValid );

                if ( !isValid ){

                    inputEmailRef.current.focus();
                    setInitialColorInput( '#FF0000' );

                    setAlert( { type:'code', message:"The code are numbers" } );

                    return false;
                };


                
            } }
            className='space-y-4 w-full flex flex-col'>
                <Input
                alert={ alert }
                maxLength={ 4 }
                StartIcon={ VpnKeyRoundedIcon }
                refInput={ inputEmailRef }
                type='text'
                required={ true }
                label='Code'
                value={ input.code }
                name='code'
                color={ initialColorInput }
                isFullWidth={ true }
                variant='outlined'
                />
                { alert.type && 
                <div className='flex flex-row text-left space-x-2 items-center'>
                    <ErrorRoundedIcon className='text-red-500'/>
                    <h1 className='text-red-500 font-semibold text-sm'> 
                        { alert.message }
                    </h1> 
                </div> }
                { loading ?
                <div className='py-5'>
                    <PropagateLoader/> 
                </div> 
                : 
                <button 
                style={ defaultTransiton }
                type='submit'
                className='text-gray-500 bg-transparent border border-solid border-gray-400 hover:bg-black hover:text-white active:bg-gray-600 font-bold uppercase px-8 py-2 rounded outline-none focus:outline-none w-full'>
                    VERIFY
                </button> }
            </form>
        </div>
    );
};

export default SecondStep;
