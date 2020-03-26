declare let hacer_consulta_a_db: any;


const consulta = new Promise(
    function (resolver, rechazar) {
        hacer_consulta_a_db(function (datos) {
            if (!datos) {
                rechazar("no existen datos");
            } else {
                resolver("datos 1");
            }
        });
    }
);

const consulta2 = new Promise(
    function (resolver, rechazar) {
        // resolver("datos 2");
        rechazar("error 2");
    }
)

function correrPromesas() {

    return consulta
        .then(function (info) {
            // ...PROCESAR RESPUESTA
            console.log("info es :", info); // info es : datos 1
            return consulta2;
        })
        .then(function (info2) {
            console.log("info 2 = ", info2); // info 2 = datos 2
        })
        .catch(function (error) {
            console.log("Ocurrio un error", error);
        });

}

async function correrPromesasAsync() {

    try {
        let info = await consulta;
        let info2 = await consulta2;
    } catch (err) {

    }

}





