function getJData(data) {
    for (var i = 0; i < data.length; i++) {
        document.getElementById("stlist").getElementsByTagName('table')[0].innerHTML += "<tr><td><div onclick='focus_st(this," + data[i].id + ")'><a class='student'>" + data[i].LName + " " + data[i].FName + " " + data[i].SName + "</a></div></td></tr>";
    }
}

function focus_st(e,id) {
    var oldact = document.getElementById("stactive");
    if (oldact != null)
        oldact.id = "";
    e.id = "stactive";
    activ_list();
    document.getElementById("delete").style.visibility = "visible";
    document.getElementById('delete').onclick = function () {
        deleteData(id);
    };
    document.getElementById("text").innerHTML = e.getElementsByTagName('a')[0].innerHTML;
    document.getElementById('sb').getElementsByTagName('button')[0].onclick = function () {
        saveData(id);
    };
    $.getJSON("/api/default1/" + id, pastData);

}

function valDate(e) {
    re = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

    if (e.value != '') {
        if (regs = e.value.match(re)) {
            if (regs[3] < 1 ||regs[3] > 31) {
                return false;
            }
            if (regs[2] < 1 || regs[2] > 12) {
                return false;
            }

            if (regs[1] < 1900 || regs[1] > (new Date()).getFullYear()) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}


function saveData(id) {
    if (document.getElementsByName("fname")[0].value.length == 0) { document.getElementById("valmf").style.visibility = "visible"; return; };
    if (document.getElementsByName("lname")[0].value.length == 0) { document.getElementById("valml").style.visibility = "visible"; return; };
    if (document.getElementsByName("sname")[0].value.length == 0) { document.getElementById("valms").style.visibility = "visible"; return; };
    if (!valDate(document.getElementsByName("bday")[0])) { document.getElementById("valmd").style.visibility = "visible"; return; };
    if (!valDate(document.getElementsByName("incomday")[0])) { document.getElementById("valmi").style.visibility = "visible"; return; };
    if (document.getElementById("male").checked) var sex = true;
    else var sex = false;
    $.post("/api/default1", {
        "Id": id,
        "FName": document.getElementsByName("fname")[0].value,
        "LName": document.getElementsByName("lname")[0].value,
        "SName": document.getElementsByName("sname")[0].value,
        "Sex": sex,
        "BDate": document.getElementsByName("bday")[0].value,
        "IncomDate": document.getElementsByName("incomday")[0].value
    },
    setTimeout(function () { location.reload() }, 1000))
}

function insertData() {
    if (document.getElementsByName("fname")[0].value.length == 0) { document.getElementById("valmf").style.visibility = "visible"; return; };
    if (document.getElementsByName("lname")[0].value.length == 0) { document.getElementById("valml").style.visibility = "visible"; return; };
    if (document.getElementsByName("sname")[0].value.length == 0) { document.getElementById("valms").style.visibility = "visible"; return; };
    if (!valDate(document.getElementsByName("bday")[0])) { document.getElementById("valmd").style.visibility = "visible"; return; };
    if (!valDate(document.getElementsByName("incomday")[0])) { document.getElementById("valmi").style.visibility = "visible"; return; };
    if (document.getElementById("male").checked) var sex = true;
    else var sex = false;
    $.post("/api/default1", {
        "FName": document.getElementsByName("fname")[0].value,
        "LName": document.getElementsByName("lname")[0].value,
        "SName": document.getElementsByName("sname")[0].value,
        "Sex": sex,
        "BDate": document.getElementsByName("bday")[0].value,
        "IncomDate": document.getElementsByName("incomday")[0].value
    },
    setTimeout(function () { location.reload() }, 1000))
}

function deleteData(id) {
    $.ajax({
        type: 'DELETE',
        url: '/api/default1/' + id,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        seccsess: setTimeout(function () { location.reload() }, 1000)
    });
}

    function pastData(data) {
        document.getElementsByName("fname")[0].value = data.FName;
        document.getElementsByName("lname")[0].value = data.LName;
        document.getElementsByName("sname")[0].value = data.SName;
        document.getElementsByName("bday")[0].value = data.BDate.split("T")[0];
        document.getElementsByName("incomday")[0].value = data.IncomDate.split("T")[0];
        if (data.Sex) document.getElementById("male").checked = true;
        else document.getElementById("female").checked = true;

    }

    function activ_list() {
        document.getElementById("stlist").className = 'stlista';
        document.getElementById("studentinf").style.display = "block";
        document.getElementById("backref").style.visibility = "visible";
        document.getElementById("sb").style.visibility = "visible";
        document.getElementById("mainform").reset();
        draw_rchart(98, 52);

    }
    function add_st() {
        activ_list();
        document.getElementById("delete").style.visibility = "hidden";
        var oldact = document.getElementById("stactive");
        if (oldact != null)
            oldact.id = "";
        document.getElementById('sb').getElementsByTagName('button')[0].onclick = function () {
            insertData();
        };
    }


    function draw_chart() {

        var summ = 0;
        for (var i = 1; i < 10; i++) {
            if (document.getElementById("obj" + i).checked)
                summ += parseInt(document.getElementById("obj" + i).value);
        }

        var drawingCanvas = document.getElementById('metric');
        if (drawingCanvas && drawingCanvas.getContext) {
            var context = drawingCanvas.getContext('2d');
            context.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            context.strokeStyle = "#000000";
            context.beginPath();
            for (var i = 0; i < 11; i++) {
                context.moveTo(i * (70), 20);
                if (i == 0 || i == 5 || i == 10) {
                    context.lineTo(i * (70), 10);
                    if (i == 0) context.textAlign = "left";
                    if (i == 5) context.textAlign = "center";
                    if (i == 10) context.textAlign = "right";
                    context.fillText(summ * (i / 10), i * (70), 8);
                }
                else
                    context.lineTo(i * (70), 15);
            }
            context.closePath();
            context.stroke();

            var div = document.getElementById("chart");
            div.innerHTML = "";
            for (var i = 1; i < 10; i++) {
                var item = document.getElementById("obj" + i);
                if (item.checked)
                    div.innerHTML += "<div title='" + item.title + "' style='float:left; height:10px; width:" + parseInt(item.value) * (700 / summ) + "px;background:rgba(255, " + parseInt(item.value) * 14 + ", 0, 0.94);'></div>";
            }
        }
    }


    function draw_rchart(value1, value2) {
        var drawingCanvas = document.getElementById('diagram');
        if (drawingCanvas && drawingCanvas.getContext) {
            var context = drawingCanvas.getContext('2d');
            context.fillStyle = "#EEEEEE";
            context.strokeStyle = "#ddd";
            context.beginPath();
            context.arc(165, 165, 145, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();

            context.fillStyle = "#53616E";
            context.beginPath();
            context.moveTo(165, 165);
            var start = (Math.PI / 180) * 270;
            context.arc(165, 165, 145, start, start + (Math.PI / 180) * value1 * (360 / 100), false);
            context.closePath();
            context.fill();

            context.fillStyle = "#C44741";
            context.beginPath();
            context.moveTo(165, 165);
            context.arc(165, 165, 145, start, start + (Math.PI / 180) * value2 * (360 / 100), false);
            context.closePath();
            context.fill();

            context.fillStyle = "#FDFDFD";
            context.beginPath();
            context.arc(165, 165, 115, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();

            context.fillStyle = "#000000";
            context.font = "13pt Tahoma";
            context.textAlign = "center";
            context.textBaseline = "middle";
            var x = drawingCanvas.width / 2;
            var y = 9;
            context.fillText("0", x, y);

            x = 9;
            y = drawingCanvas.height / 2;
            context.fillText("75", x, y);

            x = drawingCanvas.width - 9;
            y = drawingCanvas.height / 2;
            context.fillText("25", x, y);

            x = drawingCanvas.height / 2;
            y = drawingCanvas.width - 9;
            context.fillText("50", x, y);
        }

        document.getElementById('diagramt').innerHTML = "Всего прогуляно<br />" + value1 + "<br />Из них по<br />уважительной причине<br />" + value2;
    }
