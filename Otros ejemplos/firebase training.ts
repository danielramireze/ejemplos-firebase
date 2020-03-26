
async function correr() {

    //Leer informacion
    let info = await firebase.database().ref("usuarios/daniel").once("value");
    let infoDeDB = info.val();

    //Crear informacion
    let infoAGuardar = { nombre: "Daniel R.", direccion: "av. diamante", id: null };
    await firebase.database().ref("usuarios/daniel").set(infoAGuardar);

    let ref = firebase.database().ref("usuarios").push();
    infoAGuardar.id = ref.key;
    await ref.set(infoAGuardar);

    //Crear informacion 2
    let ref1 = await firebase.database().ref("usuarios").push(infoAGuardar);

    //Actualizar informacion
    await firebase.database().ref("usuarios/" + ref.key).update({ direccion: "av. independencia" });

    //Eliminar datos
    await firebase.database().ref("usuarios/" + ref.key).remove();
    console.log("Se elimino");

    //Transacciones
    let referenciaArticulo = firebase.database().ref("articulo/plantas");

    //No actualiza correctamente cuando ejecutamos muchas veces al mismo tiempo
    let snapshotArticulo = await referenciaArticulo.once("value");
    let articulo: { contadorVisitas: number } = snapshotArticulo.val();
    await referenciaArticulo.update({ contadorVisitas: articulo.contadorVisitas + 1 });

    //
    //https://firebase.google.com/docs/reference/js/firebase.database.Reference?hl=es#transaction
    referenciaArticulo.transaction(function (articuloVal) {
        if (!articuloVal) {
            return articuloVal;
        }

        articuloVal.contadorVisitas += 1;
        return articuloVal;
    }).then(function () {
        console.log("TERMINE LA TRANSACCION");
    }).catch(error => {

    })


    let refUsuarios = firebase.database().ref("users");
    let query = refUsuarios.orderByChild("name").startAt("and").endAt("and" + '\uf8ff');

    let snapshotResultados = await query.once("value");
    let resultados;


    if (snapshotResultados.exists()) {
        //Me devuelve un arreglo con todos los usuarios con nombre daniel
        resultados = snapshotResultados.val();

        let usuario = resultados[0];
        usuario.id;
    } else {
    }

}