import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../socket/config';

export const useChatClient = () => {

    const [input, setInput] = useState( { completeName:'' } );

    const [isFormFillOut, setIsFormFillOut] = useState( false );

    const [isOnline, setIsOnline] = useState( false );

    const [isLoading, setIsLoading] = useState( true );

    const [image, setImage] = useState( null );

    const [businessToSendMSG, setBusinessToSendMSG] = useState( null );

    const [allMessages, setAllMessages] = useState( [] );

    const currentSearch = useSelector(state => state.currentSearch);

    window.onbeforeunload = (e) => {
    
        socket.emit( 'clientDisconnect' );

        socket.disconnect();

    };

    useEffect(() => {

        if ( !currentSearch.isLoading && currentSearch.business ) {

            socket.connect();

            socket.emit( 'clientConnect', { searchingForUsername:currentSearch.username, searchingForID:currentSearch._id, socketID:socket.id } );

            socket.on( 'businesStatus',  ( response ) => {

                const { isOnline:state, businessData } = response;

                setIsOnline( state );

                if ( businessData ) {

                    setBusinessToSendMSG( businessData );

                } else {

                    setBusinessToSendMSG( { socketID:false } );

                };

               


                setIsLoading( false );
        

            } );

            socket.on( 'receiveMessage', (data) => {

                const { fromSocketID } = data;

                console.log( data );

                setAllMessages( messages => ({ ...messages, [ fromSocketID ]:messages[fromSocketID] ? [ ...messages[ fromSocketID ], data ] : [data] }) );

            } )

        };

        return () => { 

            socket.emit( 'clientDisconnect' );

            socket.disconnect();

        };
    
    }, [ currentSearch ]);

    return { input, setInput, isFormFillOut, setIsFormFillOut, isOnline, currentSearch, businessToSendMSG, socket, setAllMessages, allMessages, isLoading, image, setImage };

};