let ws = new WebSocket("ws://localhost:8080/insert")
let table_name;

ws.onopen = function () {
    console.log("connection установлено");
}

ws.onmessage = function(json) {
    console.log("сообщение пришло");
    parse_inp_json(json);

    console.log("момент перед закрытием!");
    document.getElementById("saveChangesBtn").onclick(function () {
        //ws.close();
    });
}
function parse_inp_json(fields_array_string) {
    let fields_array = fields_array_string.data.split(", ");

    ///let fields_array = fields_array_string.data.split(", ");
    //console.log('fields length: ' + fields_array.data.length);

    let fields_form = document.getElementById("fields-form");
    let field_container;
    let label_field;
    let input_text;


    for (let i = 0; i < fields_array.length; i++) {
        console.log(fields_array[i]);

        field_container = document.createElement("div")
        label_field = document.createElement("label");
        input_text = document.createElement("input")

        field_container.className = "form-outline p-3";
        label_field.className = "form-label ml-3 mr-3"
        input_text.className = "form-control";

        label_field.appendChild(document.createTextNode(fields_array[i]));
        input_text.id = fields_array[i];

        field_container.appendChild(label_field);
        field_container.appendChild(input_text);

        fields_form.appendChild(field_container);

    }


}

function handle_current_table(btn) {
    table_name = btn.value;
    console.log("btn_value: " + table_name);

    ws.send(table_name);
}

