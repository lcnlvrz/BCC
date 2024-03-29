import React, { useEffect, useState } from 'react'
import BCClogo from '../../../../images/bccLogo.png';
import Input from '../../../reusableComponents/Input';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import { defaultTransiton } from '../../../../constants/styles';
import { Link } from 'react-router-dom';
import PropagateLoader from "react-spinners/PropagateLoader";
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import { useMediaQuery } from 'react-responsive';
import { signInLink } from '../../../../constants/pathsRouter';
import { useSendOTP } from '../../../../hooks/useSendOTP';

const FirstStep = ( props ) => {

    const { setSteps, setUserData } = props;

    const { alertFetch, initialColorInput, isLoading, isSuccess, inputEmailRef, validateAndSendCode } = useSendOTP();

    const [input, setInput] = useState( { email:'' } );

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    useEffect(() => {

        if ( isSuccess.fetched && isSuccess.success ) {

            setSteps( { firstStep:false, secondStep:true, thirdStep:false } );
            setUserData( { email:input.email, otp:'' } );

        };
        
    }, [ isSuccess, setSteps, input.email, setUserData ]);

    const inputProps = {

        alert,
        StartIcon:EmailRoundedIcon,
        refInput:inputEmailRef,
        type:'text',
        required:true,
        label:'Email',
        value:input.email,
        name:'email',
        color:initialColorInput,
        isFullWidth:true,
        variant:'outlined'

    };

    return (
        <div 
        style={{ overflow:'hidden' }}
        className='text-center flex flex-col items-center justify-center w-3/4 bg-white rounded p-5 space-y-10 absolute'>
            <Link to='/'>
                <img className='w-28' alt='' src={BCClogo}/>
            </Link>
            <p className={ `font-semibold text-center ${ mobileResolution ? 'text-sm' : 'text-lg' }` }> 
                By having a BCC account, you can create a perfil business and change everything.
            </p>
            <form 
            onChange={ (e) => setInput({ email:e.target.value }) }
            onSubmit={ (e) => { 

                e.preventDefault();
                validateAndSendCode( input );

            } }
            className='space-y-4 w-full flex flex-col'>
                <Input { ...inputProps }/>
                { alertFetch.type && 
                <div className='flex flex-row text-left space-x-2'>
                    <ErrorRoundedIcon className='text-red-500'/>
                    <h1 className='text-red-500 font-semibold'> 
                        { alertFetch.message }
                    </h1> 
                </div> }
                { isLoading ?
                <div className='py-5'>
                    <PropagateLoader/> 
                </div> 
                : 
                <button 
                style={ defaultTransiton }
                type='submit'
                className='text-gray-500 bg-transparent border border-solid border-gray-400 hover:bg-black hover:text-white active:bg-gray-600 font-bold uppercase px-8 py-2 rounded outline-none focus:outline-none w-full'>
                    NEXT
                </button> }
            </form>
            <h3 className='text-md font-light flex flex-row flex-wrap items-center justify-center'> 
                Already have an account?
                <Link className='break-words' to={ signInLink }>
                    <span 
                    style={ defaultTransiton }
                    className='text-red-400 font-semibold hover:text-red-600 cursor-pointer ml-1'> 
                        SIGN IN 
                    </span>
                </Link>  
            </h3>
        </div>
    );
};

export default FirstStep;
