import React, { useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import HeaderForBusiness from '../HeaderForBusiness';
import HeaderMobile from '../HeaderForBusiness/HeaderMobile/HeaderMobile';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import { defaultTransiton } from '../../../constants/styles';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { IconButton } from '@material-ui/core';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

const RealTimeData = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 500px )' });

    const personalWorkingRef = useRef( null );
    const clientsInTheShopRef = useRef( null );

    const [isEditing, setIsEditing] = useState( { personalWorking:false, clientsInTheShop:false } );

    const items = [ { title:'Personal Working Now', value:55, icon:WorkRoundedIcon, ref:personalWorkingRef, id:'personalWorking' }, { title:'Clients in the shop Now:', value:15, icon:PeopleAltRoundedIcon, ref:clientsInTheShopRef, id:'clientInTheShop' } ];

    const [input, setInput] = useState( { personalWorking:items[ 0 ].value, clientInTheShop:items[1].value } );

    const DataRealTime = () => {

        return (

            <div className='p-5 space-y-5'>
                <div 
                style={ defaultTransiton }
                className='flex flex-row justify-center items-center space-x-5 bg-black text-white rounded-2xl cursor-pointer p-5 hover:bg-white hover:text-black'>
                    <TimelineRoundedIcon
                    style={{ fontSize:'80px' }}
                    />
                    <h1 className='text-4xl text-center'> 
                        Real-Time Data 
                    </h1>
                </div>

                <div 
                className={ `all__items ${ mobileResolution && 'space-y-5' } flex flex-row flex-wrap items-center justify-evenly` }>
                    { items.map( ( item, index ) => (
                        <div 
                        key={ index }
                        className='flex flex-col items-center justify-center w-72'>
                            <item.icon
                            style={{ fontSize:'100px' }}
                            />
                            <div className='flex flex-col items-center justify-center'>
                                <h2 className='font-semibold'> 
                                    { item.title } 
                                </h2>
                                <div className='flex flex-row items-center justify-center space-x-5'>
                                    <IconButton
                                    disabled
                                    className='opacity-0'
                                    >
                                        <EditRoundedIcon
                                        style={ defaultTransiton }
                                        className='text-black hover:text-green-400'
                                        />
                                    </IconButton>
                                    <form
                                    onChange={ async (e) => {

                                        await setInput( { ...input, [ e.target.name ]:e.target.value } );

                                        item.ref.current.focus();

                                    } }
                                    className='flex flex-row items-center justify-center space-x-5'
                                    onSubmit={ async (e) => {

                                        e.preventDefault();
                                        console.log( input );

                                        await setIsEditing( { ...isEditing, [ item.id ]:false } );

                                        item.ref.current.blur();

                                    } }
                                    >
                                        <input
                                        name={ item.id }
                                        onClick={ () => {

                                            console.log( 'xd' );
                                            item.ref.current.blur();

                                        } }
                                        ref={ item.ref }
                                        className='text-center outline-none text-5xl text-green-400 w-2/4'
                                        defaultValue={ input[ [ item.id ] ] }
                                        />
                                        { isEditing[ item.id ] 
                                        ? 
                                        <IconButton
                                        type='submit'
                                        style={{ outline:'none' }}
                                        className='hover:text-red-500'>
                                            <CheckRoundedIcon
                                            
                                            style={ defaultTransiton }
                                            className='text-black hover:text-green-400'
                                            />
                                        </IconButton>
                                        :
                                        <IconButton
                                        style={{ outline:'none' }}
                                        onClick={ async () => {

                                            await setIsEditing( { ...isEditing, [ item.id ]:true } );

                                            item.ref.current.focus();

                                        } }
                                        className='hover:text-red-500'>
                                            <EditRoundedIcon
                                            style={ defaultTransiton }
                                            className='text-black hover:text-green-400'
                                            />
                                        </IconButton>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>  
                    ) ) }
                </div>

            </div>

        )

    };

    return <DataRealTime/>;

};

export default RealTimeData;