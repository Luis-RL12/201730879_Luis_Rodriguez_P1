

    var tokenIdentificador="";
    var estado=0; //este estado es dinamico segun el caracter que sea leido
    var operadores = ['+', '-', '*', '/', '%', '=', '<', '>'];//alfabeto operadores
    var signos = ['"',';'];//alfabeto signos
    var agrupacion = ['(', ')', '{', '}'];//alfabeto agrpacion
    var cadena=0;//valor de posicion de la lectura
    var punto=false;
    var valorToken="";
    var position=1;
    var line=1;
    module.exports.analizar = function analisis(texto) {
        var text = texto+" ";//texto leido
        console.log(text.length);
        while(cadena<text.length){// recorre todo el texto hasta que pa cadena sea mayor al texto leido
            var c = text.charAt(cadena);
            token(estado,cadena,text);//llama al metodo token para verificar que tipo es
            cadena++;
            position++;
        }
        console.log("fin de lectura");
    }
    function token(estadoToken,posicion,elTexto){// meotodo de verficicacion de token
        var identificador = /^[a-zA-Z\s]+$/.test(elTexto[posicion]);//expresion regular para identificador
                    var numero = /^[0-9\s]+$/.test(elTexto[posicion]);//expresion regular para numero
                    var c = elTexto[posicion];//obtiene el caracter en la posicion indicada
        switch(estadoToken){
            case 0:
                    //console.log("entro al case 0");
                    if(c===' '){
                        console.log("es un espacio");
                        estado=0;
                    }else if(c==='\n'){
                        position=0;
                        line++;
                        //console.log("es un salto de linea");
                        estado=0;
                    }else if(identificador){
                        //console.log("el caracter: "+c+" va al estado 1");
                        valorToken=valorToken+c;
                        estado=1;
                    }else if(numero){
                        //console.log("el caracter: "+c+" va al estado 2");
                        valorToken=valorToken+c;
                        estado=2;
                    }else if(c===signos[0] || c===signos[1]){
                        //console.log("el caracter: "+c+" va al estado 5");
                        valorToken=valorToken+c;
                        estado=5;
                    }else if(c===agrupacion[0] || c===agrupacion[1]  || c===agrupacion[2] || c===agrupacion[3]){
                        //console.log("el caracter: "+c+" va al estado 4");
                        valorToken=valorToken+c;
                        estado=4;
                    }else if(c===operadores[0]||c===operadores[1]||c===operadores[2]||c===operadores[3]||c===operadores[4]||c===operadores[5]||c===operadores[6]||c===operadores[7]){
                        //console.log("el caracter: "+c+" va al estado 3");
                        valorToken=valorToken+c;
                        estado=3;
                    }else{
                        console.log("es un error");
                        valorToken="";
                        estado=0;
                    }
            break;
            
            case 1:
                    //console.log("entro a case 1");
                    if(c===" " || c==='\n' || c==='\t'){
                        //console.log("desde el case 1: es un espacio");
                        estado=0;
                        //si el identificador leido coincide con alguna palabra reservada
                        if(valorToken=='booleano' || valorToken=='variable' || valorToken=='entero' || valorToken=='decimal' || valorToken=='cadena' || valorToken=='si' || valorToken=='sino' || valorToken=='mientras' || valorToken=='hacer'){
                            console.log("Palabra reservada: ['"+valorToken+"'] en linea: "+line+" columna: "+(position-valorToken.length));
                        }else{
                            console.log("Identificador : ['"+valorToken+"'] en linea: "+line+" columna: "+(position-valorToken.length));
                        }
                        valorToken="";
                    }
                    else if(identificador){
                        //console.log("el caracter: "+c+" va al estado 1");
                        valorToken=valorToken+c;
                        estado=1;
                    }else if(numero){
                        //console.log("el caracter: "+c+" va al estado 1");
                        valorToken=valorToken+c;
                        estado=1;
                    }else{
                        //console.log("el caracter: "+c+" va al estado 0");
                        cadena--;
                        estado=0;
                        //si el identificador leido conicide con alguna palabra reservada
                        if(valorToken=='booleano' || valorToken=='variable' || valorToken=='entero' || valorToken=='decimal' || valorToken=='cadena' || valorToken=='si' || valorToken=='sino' || valorToken=='mientras' || valorToken=='hacer'){
                            console.log("Identificador : ['"+valorToken+"'] en linea: "+line+" columna: "+(position-valorToken.length));
                        }else{
                            console.log("Identificador : ['"+valorToken+"'] en linea: "+line+" columna: "+(position-valorToken.length));
                        }
                        
                        valorToken="";
                    }
                break;
                case 2:
                    //entra al metodo de numero
                    //console.log("entro a case 2");
                    if(c===" " || c==='\n' || c==='\t'){
                        //si el numero leido tiene punto y le sigue un espacio
                        if(punto==true){
                            estado=0;
                            console.log("Error: ['"+valorToken+"'] en linea: "+line+" columna: "+(position-valorToken.length));
                            valorToken="";
                            punto=false;
                        }else{
                            //console.log("desde el case 1: es un espacio");
                            estado=0;
                            console.log("Numero: ['"+valorToken+"'] en linea: "+line+" columna: "+(position-valorToken.length));
                            valorToken="";
                        }
                    }else if(numero){//si lee un numero
                        valorToken=valorToken+c;
                        estado=2;
                        punto=false;
                    }else if(c==='.'){//si lee un punto en el metodo de numero entonces cambiara el estado de punto
                        estado=2;
                        valorToken=valorToken+c;
                        punto=true;
                    }else{
                        if(punto==true){
                            estado=0;
                            cadena--;
                            punto=false;
                            console.log("Error : ['"+valorToken+"'] en linea: "+line+" columna: "+(position-valorToken.length));
                            valorToken="";
                        }else{
                        cadena--;
                        estado=0;
                        console.log("Numero : ['"+valorToken+"'] en linea: "+line+" columna: "+(position-valorToken.length));
                        valorToken="";
                        }
                    }
                break;
                case 3://meotod de Operadoes
                    //console.log("entro a case 3");
                    console.log("Operador : ['"+valorToken+"'] en linea: "+line+" columna: "+(position-valorToken.length));
                    cadena--;
                    valorToken="";
                    estado=0;
                break;
                case 4://metodo de Agrupaciones
                    //console.log("entro a case 4");
                    console.log("Agrupacion : ['"+valorToken+"'] en linea: "+line+" columna: "+(position-valorToken.length));
                    cadena--;
                    valorToken="";
                    estado=0;
                break;
                case 5://metodo de Signos
                    //console.log("entro a case 5");
                    console.log("Signo : ['"+valorToken+"'] en linea: "+line+" columna: "+(position-valorToken.length));
                    cadena--;
                    valorToken="";
                    estado=0;
                break;
        }
    }
    
    
    

