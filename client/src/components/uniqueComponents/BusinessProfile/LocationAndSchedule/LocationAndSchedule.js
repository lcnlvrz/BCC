import React, { useEffect, useRef } from 'react'
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';
import { InputBase } from '@material-ui/core';
import places from 'places.js';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider, } from '@material-ui/core/styles';

const LocationAndSchedule = ( props ) => {

    const { since, until, location, setInput } = props;

    const addressInputRef = useRef( null );

    useEffect(() => {

        if ( addressInputRef.current ) {

            const placeDataAPI = {
                appId: 'plQCLUO3GKWW',
                apiKey: '737149791d34315467c38f9766293947',
                container: document.getElementById( 'address_input' )
            };
        
            const options = {
                language: 'es',
                countries: ['AR', 'US'], 
                type: 'address', 
                aroundLatLngViaIP: false
            };
        
            places( placeDataAPI ).configure( options ).on( 'change', e => {

                setInput( v => ({ ...v, location:e.suggestion.value  }) );

            }); 
            
        };

            
    }, [ addressInputRef, setInput ]);


    const clockTheme = createMuiTheme({
        palette: {
          primary: {
            main: '#000000',
          },
          secondary: {
            main: '#000000',
          },
        },
    });

    const propsDefault = {

        id:"time",
        required:true,
        className:'outline-none',
        type:"time",
        InputLabelProps:{
        shrink: true,
        },
        inputProps:{
        step: 300
        }
    };

    const sinceAndUntil = [ { name:'since', label:'Since', value:since }, { name:'until', label:'Until', value:until } ];
      

    return (
        <div
        className='space-y-5 w-full p-5'
        style={{ margin:'20px 0px' }}
        >
            <div className='flex flex-col space-y-2 items-center'>
                <LocationOnRoundedIcon 
                style={{ fontSize:'50px' }}
                className='text-red-500'/>
                <InputBase
                required
                fullWidth
                id='address_input'
                ref={ addressInputRef }
                inputProps={{ maxLength:100, className:'text-center', fontWeight:'800' }}
                className='p-0'
                name='location'
                value={ location ? location : '' }
                placeholder="The business's location"
                />
            </div>
            <div className='flex flex-col justify-center space-y-4 items-center'>
                <WatchLaterRoundedIcon 
                style={{ fontSize:'50px' }}
                className='text-black'/>
                <div className='flex flex-row space-x-10'>
                <ThemeProvider 
                theme={ clockTheme }>
                    { sinceAndUntil.map( ( input, index ) => {

                        const props = { ...input, ...propsDefault, key:index };

                        return <TextField {...props}/>

                    } ) }
                </ThemeProvider>
                </div>
            </div>
        </div>
    );
};

export default LocationAndSchedule;
