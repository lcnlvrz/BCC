import React from 'react';
import { Avatar, IconButton, InputBase } from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { useMediaQuery } from 'react-responsive';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { Fade } from '@material-ui/core';
import AvatarStatus from '../../../../reusableComponents/AvatarStatus.js';
import MessageChat from '../../../../reusableComponents/MessageChat';
import { messagesChatHomePage } from '../../../../../constants/content';
import { useDelayChat } from '../../../../../hooks/useDelayChat';

const LiveChat = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 750px )' });

    const { messages, contentMessageRef, refChat, refParentContainer, inViewParentContainer } = useDelayChat();

    return (
        <Fade in={ inViewParentContainer }>
            <div 
            ref={ refParentContainer }
            className='container__explain__section'>
                <div className={ `flex flex-row flex-wrap justify-evenly items-center p-5 ${ mobileResolution ? 'space-y-10' : '' }` }>
                    <div className={ `${ mobileResolution ? 'w-full' : 'w-2/4' } text-center space-y-5` }>
                        <AvatarStatus 
                        status={ true }
                        spacingBadge={ 5 }
                        spacingAvatar={ 25 }
                        vertical='bottom'
                        horizontal='right'
                        souceProfilePhoto='https://i.pinimg.com/originals/4d/96/2d/4d962dee72fa76f023d411e20d30690c.jpg'
                        />
                        <h1 className='font-semibold text-4xl text-green-400'> 
                            LIVE CHAT 
                        </h1>
                        <p className={ `${ !mobileResolution ? 'mx-10' : ''  } font-light text-2xl ` }>
                            With our platform you can chat with your clients and solve their questions in <span className='font-semibold text-green-400'>REAL TIME.</span> 
                            <span className='font-semibold'> Fast, at the moment and friendly interface.</span>
                        </p>
                    </div>
                    <div className={ `${ mobileResolution ? 'w-full' : 'w-2/4' }` }>
                        <div 
                        ref={ refChat }
                        className='bg-gray'>
                            <div className=''>
                                <div className='flex flex-row justify-between items-center'>
                                    <IconButton
                                    style={{ outline:'none', color:'black' }}
                                    >
                                        <ArrowBackRoundedIcon/>    
                                    </IconButton> 
                                    <div className='flex flex-row space-x-2 items-center justify-center py-1'>
                                        <Avatar
                                        src='https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg'
                                        /> 
                                        <div className='flex flex-col items-start justify-center text-left'>
                                            <div className='element'>
                                                <h3 className='font-semibold text-black text-lg truncate w-full text-left'> 
                                                    Richard Vaughan
                                                </h3>
                                            </div>
                                            <h1 className={ `${ mobileResolution && 'text-sm'} text-green-400 font-semibold` }> 
                                                is in your chat now! 🙇
                                            </h1>
                                        </div> 
                                    </div>
                                    <IconButton
                                    disabled
                                    style={{ opacity:0 }}
                                    className='ghost__fillter'
                                    >
                                        <ArrowBackRoundedIcon/>    
                                    </IconButton> 
                                </div>
                                <div 
                                ref={ contentMessageRef }
                                style={{ height: '400px' }}
                                className='all__messages bg-gray-200 flex-1 overflow-auto flex-col justify-between flex'>
                                    { messagesChatHomePage.map( ( message, index ) => (

                                        <MessageChat 
                                        key={ index }
                                        isOwnMessage={ message.isOwnMessage }
                                        isOtherMessage={ message.isOtherMessage } 
                                        content={ message.content }
                                        showIn={ messages[ `${ index }Message` ] }
                                        />

                                    ) ) }
                                </div>
                                <div className='w-full relative'>
                                    <form 
                                    className='flex flex-row items-center p-2 justify-center  bg-white absolute w-full space-x-2'>
                                            <IconButton
                                            component='span'
                                            style={{ outline:'none', color:'black' }}
                                            >
                                                <MenuRoundedIcon/>
                                            </IconButton>
                                        <InputBase
                                        maxLength={ 2000 }
                                        name='message'
                                        fullWidth={ true }
                                        placeholder='Type something to send...'
                                        />
                                        <IconButton
                                        style={{ outline:'none' }}
                                        >
                                            <SendRoundedIcon
                                            className='text-black'
                                            />
                                        </IconButton>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default LiveChat;
