//load
var table = 'Graph title : <input id="graph_title" class="bg_input"><br>';

table += 'X axis level : <select class="bg_input" id="axisX"><br>';

for (let i = 0; i < axisX.length; i++) {
    table += '<option value="' + axisX[i] + '">' + axisX[i] + '</option>';
}
table += '</select><br>';

table += 'Y axis level : <select class="bg_input" id="axisY"><br>';

for (let i = 0; i < axisZ.length; i++) {
    table += '<option value="' + axisY[i] + '">' + axisY[i] + '</option>';
}
table += '</select><br>';

table += 'Z axis level : <select class="bg_input" id="axisZ">';

for (let i = 0; i < axisZ.length; i++) {
    table += '<option value="' + axisZ[i] + '">' + axisZ[i] + '</option>';
}
table += '</select><br>';

table += 'Binary label : <select class="bg_input" id="binary">';

for (let i = 0; i < BINARY.length; i++) {
    table += '<option value="' + BINARY[i] + '">' + BINARY[i] + '</option>';
}
table += '</select><br>';

table += 'Size label : <select class="bg_input" id="point_size">';

for (let i = 0; i < point_Size.length; i++) {
    table += '<option value="' + point_Size[i] + '">' + point_Size[i] + '</option>';
}
table += '</select><br>';

table += '<button type="button" class="bg_button" id="insert">Insert</button>';

document.getElementById('sub_section_data_input').innerHTML = table;

var graph_title
var posX = [];
var posY = [];
var posZ = [];
var TEXT = [];
var binAry = [];
var PSize = [];

//insert data
document.getElementById('insert').addEventListener("click", function() {
    graph_title = document.getElementById('graph_title').value;
    var pos_x = document.getElementById('axisX').value;
    var pos_y = document.getElementById('axisY').value;
    var pos_z = document.getElementById('axisZ').value;
    var binary = document.getElementById('binary').value;
    var pSize = document.getElementById('point_size').value;
    if ( !pos_x || !pos_y || !pos_z || !pSize || !graph_title) {
        return;
    }
    posX.push(pos_x);
    posY.push(pos_y);
    posZ.push(pos_z);
    TEXT.push(graph_title);
    binAry.push(binary);
    PSize.push(pSize);

    //draw and insert
    drawInsert();
});


//when page load, draw graph
var trace2 = {
    x:axisX, y: axisY, z: axisZ,
    mode: 'markers',
    marker: {
        size: 0.1,
        opacity: 0},
    name: 'default',
    type: 'scatter3d',
};

var data = [trace2];
var layout = {
    title : Graph_title,
    scene: {
        title: {
            text:'Plot Title',
            font: {
                family: 'Courier New, monospace',
                size: 24
            },
            xref: 'paper',
            x: 0.05,
        },
        xaxis: {
            title: 'XXXXX',
            titlefont: {
                color: 'red',
                family: 'Arial, Open Sans',
                size: 12
            }
        },
        yaxis: {
            title: 'YYYYY',
            titlefont: {
                color: 'red',
                family: 'Arial, Open Sans',
                size: 12
            }
        },
        zaxis: {
            title: 'ZZZZZ',
            titlefont: {
                color: 'red',
                family: 'Arial, Open Sans',
                size: 12
            }
        }
    },
    autosize: false,
    width: 550,
    height: 500,
    margin: {
        l: 0,
        r: 0,
        b: 50,
        t: 50,
        pad: 4
    },
};
Plotly.newPlot('graph_3d', data, layout);
//delete data
function deleteData(del_id) {
    posX.splice(del_id, 1);
    posY.splice(del_id, 1);
    posZ.splice(del_id, 1);
    binAry.splice(del_id, 1);
    PSize.splice(del_id, 1);
    
    //draw and insert
    drawInsert();
}

function change_value(index, id, change_array) {
    c_v = document.getElementById(id).value;
    switch (change_array) {
        case 'posX':
            posX[index] = c_v;
            break;
    
        case 'posY':
            posY[index] = c_v;
            break;
    
        case 'posZ':
            posZ[index] = c_v;
            break;
    
        case 'binAry':
            binAry[index] = c_v;
            break;
    
        case 'PSize':
            PSize[index] = c_v;
            break;
    
    }
    console.log(posX);
    drawInsert();
}

function drawInsert() {
    //insert table
    var table_cell = '';
    var insertTable = '<tr><th>No</th><th>Position X</th><th>Position Y</th><th>Position Z</th><th>Binary</th><th>Point Size</th><th>Delete</th></tr>';
    for (let i = 0; i < PSize.length; i++) {
        insertTable += '<tr>';
        insertTable += '<th>' + (i+1) + '</th>';

        //position X
        table_cell = '<select class="table_cell" id="table_cell_' + i + '_posX" onchange="change_value(' + i + ", 'table_cell_" + i + "_posX', 'posX')\"><br>" ;
        for (let j = 0; j < axisX.length; j++) {
            if (posX[i] == axisX[j]) {
                table_cell += '<option value="' + axisX[j] + '" selected>' + axisX[j] + '</option>';
            }else {
                table_cell += '<option value="' + axisX[j] + '">' + axisX[j] + '</option>';
            }
        }
        table_cell += '</select><br>';

        insertTable += '<th>' + table_cell + '</th>';

        //position Y
        table_cell = '<select class="table_cell" id="table_cell_' + i + '_posY" onchange="change_value(' + i + ", 'table_cell_" + i + "_posY', 'posY')\"><br>";
        for (let j = 0; j < axisY.length; j++) {
            if (posY[i] == axisY[j]) {
                table_cell += '<option value="' + axisY[j] + '" selected>' + axisY[j] + '</option>';
            }else {
                table_cell += '<option value="' + axisY[j] + '">' + axisY[j] + '</option>';
            }
            
        }
        table_cell += '</select><br>';

        insertTable += '<th>' + table_cell + '</th>';

        //position Z
        table_cell = '<select class="table_cell" id="table_cell_' + i + '_posZ" onchange="change_value(' + i + ", 'table_cell_" + i + "_posZ', 'posZ')\"><br>";
        for (let j = 0; j < axisZ.length; j++) {
            if (posZ[i] == axisZ[j]) {
                table_cell += '<option value="' + axisZ[j] + '" selected>' + axisZ[j] + '</option>';
            }else {
                table_cell += '<option value="' + axisZ[j] + '">' + axisZ[j] + '</option>';
            }
        }
        table_cell += '</select><br>';

        insertTable += '<th>' + table_cell + '</th>';

        //binary
        table_cell = '<select class="table_cell" id="table_cell_' + i + '_binAry" onchange="change_value(' + i + ", 'table_cell_" + i + "_binAry', 'binAry')\"><br>";
        for (let j = 0; j < BINARY.length; j++) {
            if (binAry[i] == BINARY[j]) {
                table_cell += '<option value="' + BINARY[j] + '" selected>' + BINARY[j] + '</option>';
            }else {
                table_cell += '<option value="' + BINARY[j] + '">' + BINARY[j] + '</option>';
            }
        }
        table_cell += '</select><br>';

        insertTable += '<th>' + table_cell + '</th>';

        //point size
        table_cell = '<select class="table_cell" id="table_cell_' + i + '_PSize" onchange="change_value(' + i + ", 'table_cell_" + i + "_PSize', 'PSize')\"><br>";
        for (let j = 0; j < point_Size.length; j++) {
            if (PSize[i] == point_Size[j]) {
                table_cell += '<option value="' + point_Size[j] + '" selected>' + point_Size[j] + '</option>';
            }else {
                table_cell += '<option value="' + point_Size[j] + '">' + point_Size[j] + '</option>';
            }
        }
        table_cell += '</select><br>';

        insertTable += '<th>' + table_cell + '</th>';
        insertTable += '<th><button class="table_button" onclick="deleteData(' + i + ')">Delete</button></th>';
        insertTable += '</tr>';
    }
    document.getElementById('dataTable').innerHTML=insertTable;
    
    var color = [];
    for (let i = 0; i < binAry.length; i++) {
        if (binAry[i]=='True') {
            color.push('rgb(255, 0, 0)')
        }else {
            color.push('rgb(13, 13, 13)')
        }
    }
    var trace1 = {
        x:posX, y: posY, z: posZ,
        mode: 'markers+text',
        marker: {
            size: PSize,
            color: color,
            line: {
            width: 0.5},
            opacity: 0.5},
        name: 'Markers and Text',
        textposition: 'top',
        text:TEXT,
        type: 'scatter3d'
    };
    

    var data = [trace1, trace2];
    Plotly.newPlot('graph_3d', data, layout);
}
