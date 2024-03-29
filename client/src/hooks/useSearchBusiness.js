import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useSearchBusiness = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [query, setQuery] = useState( '' );
    const [isLoading, setIsLoading] = useState( false );
    const [cancelToken, setCancelToken] = useState( null );
    const [isSearching, setIsSearching] = useState( false );
    const [business, setBusiness] = useState( [] );
    const [response, setResponse] = useState( [] );
    const [anotherEndPoint, setAnotherEndPoint] = useState( { route:'', userID:'' } );
    const [products, setProducts] = useState( [] );
    const [notFound, setNotFound] = useState( false );

    useEffect(() => {

        setNotFound( false );

        setBusiness( [] );

        if ( !query ) {

            setBusiness([]);
            setIsSearching( false );
            return false;

        };

        setIsSearching( true );

        const timer = setTimeout(() => {

        const cancelTokenFunction = axiosInstance.CancelToken.source();

        setCancelToken( cancelTokenFunction );

        let finalEndPoint = '';

        if ( anotherEndPoint.route ) {

            finalEndPoint = anotherEndPoint.route;

        } else {

            finalEndPoint = '/business';

        };

        axiosInstance.get( finalEndPoint, { headers:{ query, userID:anotherEndPoint.userID }, cancelToken:cancelTokenFunction.token } )
        .then( (response) => {

            console.log( response );

            setIsSearching( false );

            if ( finalEndPoint === '/business' ) setBusiness( response.data.business );
            
            if ( finalEndPoint === '/one-product' ) setResponse( response.data.products );

        } )
        .catch( (err) => {


            console.log( err );
            setIsSearching( false );
            setNotFound( { type:'search', message:err.response.data.message, severity:'error' } );


        } );   
            
    }, 3000);

        return () => clearTimeout( timer );
        
    }, [ query, dispatch, anotherEndPoint ]);

    useEffect(() => {

        if ( response.length > 0 ) setProducts( response );
        
    }, [ response ]);

    useEffect(() => {
        
        if ( !user.isLoading ) {

            setProducts( user.products );

        };
        
    }, [ user ]);

    useEffect(() => {

        return () => { if ( cancelToken ) cancelToken.cancel() }

    }, [ cancelToken ]);

    return { setQuery, isLoading, setIsLoading, cancelToken, query, business, notFound, setNotFound, isSearching, setAnotherEndPoint, response, products };

};