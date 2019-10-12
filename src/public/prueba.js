const getButton = document.querySelector("#getButton");
const postButton = document.querySelector("#postButton");
const respuesta = document.querySelector('#output');



var openFile = function (event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var text = reader.result;
        var node = document.getElementById('output');
        node.innerText = text;
        //console.log(reader.result.substring(0, 1200));
    };
    reader.readAsText(input.files[0]);
};
function validarTextArea() {
    var text = document.getElementById("output").value;
    if (text === "") {
        alert("Deves agregar texto o importar un archivo para su analisis");
    } else {
        analisis();
    }
}

const getData = () => {
    axios.get(url).then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
};

const sendData = () => {
    axios.post('http://localhost:3000/postusers', {
            firstName: 'Oliver',
            lastName: 'sierra',
            text: output.value
        }, {
            'Content-Type': 'application/json'
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
};
postButton.addEventListener('click', sendData);
