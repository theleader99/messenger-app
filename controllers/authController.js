import {authedUser} from '../models/user.js';
import newValidator from '../untils/validator.js';
import {isEmptyObject} from '../untils/object.js';
import {newSuccessResponse,newFailureResponse,responseCode} from './response.js';

function newAuthController(){
    const controller = {};
    controller.register = {}
    controller.register= async function(registerPayload){
    // TODO: Validate data
        const rules ={
            email: [
                {
                    rule:"isEmail",
                    value: true
                }
            ],
            firstName:[
                {
                    rule: "notEmpty",
                    value: true
                }
            ],
            lastName:[
                {
                    rule: "notEmpty",
                    value: true
                }
            ],
            password: [
                {
                    rule:"minLength",
                    value: 6
                }
            ],
            retypePassword: [
                {
                    rule:"isMatching",
                    value: registerPayload.password           
                },
                {
                    rule:"notEmpty",
                    value: true
                }
            ]
        };
        const validator = newValidator();
        const errors = validator.validate(registerPayload, rules);
        if(!isEmptyObject(errors)){
            //Something went wrong
            return newFailureResponse(responseCode.auth.register.invalid_input, errors);
        }

        //Register with firebase
        await firebase.auth().createUserWithEmailAndPassword(registerPayload.email, registerPayload.password);
        firebase.auth().currentUser.updateProfile({
            displayName: `${registerPayload.firstName} ${registerPayload.lastName}`
        })
        firebase.auth().currentUser.sendEmailVerification();
        return newSuccessResponse(responseCode.auth.register.success, firebase.auth().currentUser)

    };
    controller.login=async function(loginPayload){
        const loginResult= await firebase
        .auth()
        .signInWithEmailAndPassword(loginPayload.email, loginPayload.password);
        authedUser.id = loginResult.user.email;
        authedUser.name = loginResult.user.email;
        return newSuccessResponse(responseCode.auth.login.success,authedUser);
       
    };
    return controller;
}

export default newAuthController;