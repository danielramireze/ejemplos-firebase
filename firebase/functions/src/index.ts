import * as firebaseAdmin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { EventContext } from 'firebase-functions';
import { DataSnapshot } from 'firebase-functions/lib/providers/database';
import { ObjectMetadata } from 'firebase-functions/lib/providers/storage';

const credentials = {
    apiKey: "AIzaSyCrzqsRW4KW7j4kMljpBwj-CYLFL9wY3gI",
    authDomain: "curso-82ee6.firebaseapp.com",
    databaseURL: "https://curso-82ee6.firebaseio.com",
    projectId: "curso-82ee6",
    storageBucket: "curso-82ee6.appspot.com",
    messagingSenderId: "342709788902",
    appId: "1:342709788902:web:7dfa7af8bc7c38fe139b27",
    measurementId: "G-NBVPGH8HVK"
};

const admin = firebaseAdmin.initializeApp(credentials);


//FUNCION ONCALL SENCILLA
const helloFn = function (data: any, context: CallableContext) {
    console.log("Hola " + data);
    return "Hola " + data;
}
export const hello = functions.https.onCall(helloFn);


//EVENTO NEW USER AUTH
const onNewUserFn = async function (user: UserRecord, context: EventContext) {
    let { uid, email } = user;
    let userData = {
        uid,
        email,
        name: "maximiliano",
    };

    await admin.database().ref(`users/${uid}`).set(userData);
    return;
}
export const onNewUser = functions.auth.user().onCreate(onNewUserFn);


//EVENTO ONCREATE DATABASE
const onCreateUserFn = async function (snapshot: DataSnapshot, context: EventContext) {
    let user: { uid: string, email: string, name: string } = snapshot.val();

    user.name = user.name.toUpperCase();
    await snapshot.ref.update(user);
    return;
}
export const onCreateUser = functions.database.ref("users/{idUsuario}").onCreate(onCreateUserFn);

//EVENTO ONCHANGE DATABASE
const onUpdateNameFn = async function (change: functions.Change<DataSnapshot>, context: EventContext) {
    console.log("onUpdateName executed");

    let name: string = change.after.val();

    if (name.indexOf('1') > -1) {
        console.log("onUpdateName if");
        return;
    } else {
        console.log("onUpdateName else");
        await change.after.ref.set(`${name}1`);
    }
};
export const onUpdateName = functions.database.ref("users/{uid}/name").onUpdate(onUpdateNameFn);

//EVENTO ONDELETE DATABASE
const onDeleteUserFn = async function (snapshot: DataSnapshot, context: EventContext) {
    //Otra forma de hacer lo mismo
    // let uid = context.params.uid;

    let { uid } = snapshot.val();
    await admin.auth().deleteUser(uid);
}
export const onDeleteUser = functions.database.ref("users/{uid}").onDelete(onDeleteUserFn);

//EVENTO ONWRITE DATABASE 
const onWriteUserFn = function (change: functions.Change<DataSnapshot>, context: EventContext) {
    //Cuando no existe el valor anterior, y existe el nuevo, es un OnCreate
    if (!change.before.exists() && change.after.exists()) {
        console.log("OnCreate");
    }
    //Cuando existe el valor anterior y existe el nuevo valor, es un OnUpdate
    if (change.before.exists() && change.after.exists()) {
        console.log("OnUpdate");
    }
    //Cuando existe el valor anterior y no existe el nuevo val, es un OnDelete
    if (change.before.exists() && !change.after.exists()) {
        console.log("OnDelete");
    }
}
export const onWriteUser = functions.database.ref("users/{uid}").onWrite(onWriteUserFn);

//EVENTOS STORAGE
const onUpdateBucketFn = async function (object: ObjectMetadata, context: EventContext) {
    let objectRef = admin.database().ref("uploads").push();
    let objectInfo = { name: object.name };
    await objectRef.set(objectInfo);
}

export const onUpdateBucket = functions.storage.object().onFinalize(onUpdateBucketFn);