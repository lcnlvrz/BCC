const { userObject, usernameAndPasswordObject } = require('../helpers/joiObjects');
const User = require( '../models/users' );

const validateSignUpData = ( req, res, next ) => {

    const user = req.body;

    const { businessName, username, password, repeatPassword } = req.body;

    if ( !businessName || !username || !password || !repeatPassword ) return res.status( 404 ).send( { message:'The user data are empty' } );

    const validation = userObject.validate( user );

    if ( validation.error ) return res.status( 404 ).send( { message:validation.error } );

    if ( password !== repeatPassword ) return res.status( 403 ).send( { message:'The passwords need be equal' } );

    
    next();  

};

const validateSignInData = ( req, res, next ) => {

    const user = req.body;

    const validation = usernameAndPasswordObject.validate( user );

    if ( validation.error ) return res.status( 400 ).send( { message:'The data provided are invalid' } );

    next();


};

const validateIfUsernameAlreadyExist = ( req, res, next ) => {

    const { username } = req.body;

    const filter = { username };

    User.findOne( filter, ( err, userStored ) => {

        if ( err ) throw err;

        if ( userStored ) return res.status( 409 ).send( { message:'The username already exist', errorCode:'username' } );

        next();

    } );

};


module.exports = { validateSignUpData, validateIfUsernameAlreadyExist, validateSignInData };