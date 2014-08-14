function getJData() {
    $.getJSON("/api/default1", pastJData);
}
function pastJData(data) {
    for (var i = 0; i < data.length; i++) {
        $("#stlist table").append("<tr><td><div onclick='focus_st(this," + data[i].id + ")'><a class='student'>" + data[i].LName + " " + data[i].FName + " " + data[i].SName + "</a></div></td></tr>");
    }
}

function focus_st(e,id) {
    if ($("#stactive")) {
        $("#stactive").attr("id", "");
    }
    e.id = "stactive";
    activ_list();
    $("#delete").css("visibility", "visible");
    $("#delete").attr('onclick', '').unbind('click');
    $("#delete").click(function () {
        deleteData(id);
    });
    $("#text").html($("#" + e.id + " a").html());
    $("#sb button").attr('click', '').unbind('click');
    $("#sb button").click( function () {
        saveData(id);
    });
    $.getJSON("/api/default1/" + id, pastData);
}

function validateDate(e) {
    re = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    if (e.val() != '') {
        if (regs = e.val().match(re)) {
            if (regs[3] < 1 || regs[3] > 31) {
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
    } else {
        return false;
    }
    return true;
}

function setVisibilityById(id,value) {
    $("#" + id).css("visibility", value);
}

function validateFields() {
    var nameFlMes = new Array("valmf", "valml", "valms");
    var nameFl = new Array("fname", "lname", "sname");
    var flag = true;
    var dateFl = new Array("bday", "incomday");
    var dateFlmes = new Array("valmb", "valmi");
    for (var i = 0; i < nameFl.length; i++) {
        if ($("[name = '" + nameFl[i] + "']").val().length == 0) {
            setVisibilityById(nameFlMes[i], "visible");
            flag = false;
        } else {
            setVisibilityById(nameFlMes[i], "hidden");
        };
    }
    for (var i = 0; i < dateFl.length; i++) {
        if (!validateDate($("[name = " + dateFl[i] + "]"))) {
            setVisibilityById(dateFlmes[i], "visible");
            flag = false;
        } else {
            setVisibilityById(dateFlmes[i], "hidden");
        };
    }
    return flag;
}

function saveData(id) {
    if (!validateFields()) {
        return;
    }
    $.post("/api/default1", getSendingData(id));
    alertMesAndRel("Данные обновлены");
}

function alertMesAndRel(text) {
    alert(text);
    location.reload();
}

function insertData() {
    if (!validateFields()) {
        return;
    }
    $.post("/api/default1", getSendingData("-1"));
    alertMesAndRel("Студент добавлен");
}

function getSendingData(id) {
    if ($("#male").is(":checked")) {
        var sex = true;
    } else {
        var sex = false;
    }
    return {
        "Id": id,
        "FName": $("[name = 'fname']").val(),
        "LName": $("[name = 'lname']").val(),
        "SName": $("[name = 'sname']").val(),
        "Sex": sex,
        "BDate": $("[name = 'bday']").val(),
        "IncomDate": $("[name = 'incomday']").val()
    };
}

function deleteData(id) {
    $.ajax({
        type: 'DELETE',
        url: '/api/default1/' + id,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    });
    alertMesAndRel("Студент удален");
}

    function pastData(data) {
        $("[name = 'fname']").val(data.FName);
        $("[name = 'lname']").val(data.LName);
        $("[name = 'sname']").val(data.SName);
        $("[name = 'bday']").val(data.BDate.split("T")[0]);
        $("[name = 'incomday']").val(data.IncomDate.split("T")[0]);
        if (data.Sex) {
            $("#male").prop('checked', true);
        } else {
            $("#female").prop('checked', true);
        }
    }

    function activ_list() {
        $("#stlist").attr("class", "stlista");
        $("#studentinf").css("display", "block");
        setVisibilityById("backref", "visible");
        setVisibilityById("sb", "visible");
        $("#mainform").trigger('reset')
        drawPieChart(98, 52);
    }

    function add_st() {
        activ_list();
        setVisibilityById("delete", "hidden");
        
        if ($("#stactive")) {
            $("#stactive").attr("id", "");
        }
        $("#sb button").attr('onclick', '').unbind('click');
        $("#sb button").click( function () {
            insertData();
        });
    }


    function drawChart() {

        var summ = 0;
        for (var i = 1; i < 10; i++) {
            if ($("#obj" + i).is( ":checked" )) {
                summ += parseInt($("#obj" + i).val());
            }
        }

        var drawingCanvas = document.getElementById("metric");
        if (drawingCanvas && drawingCanvas.getContext) {
            var context = drawingCanvas.getContext('2d');
            context.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            context.strokeStyle = "#000000";
            context.beginPath();
            for (var i = 0; i < 11; i++) {
                context.moveTo(i * (70), 20);
                if (i == 0 || i == 5 || i == 10) {
                    context.lineTo(i * (70), 10);
                    if (i == 0) {
                        context.textAlign = "left";
                    }
                    if (i == 5) {
                        context.textAlign = "center";
                    }
                    if (i == 10) {
                        context.textAlign = "right";
                    }
                    context.fillText(summ * (i / 10), i * (70), 8);
                } else {
                    context.lineTo(i * (70), 15);
                }
            }
            context.closePath();
            context.stroke();

            $("#chart").html("");
            for (var i = 1; i < 10; i++) {
                if ($("#obj" + i).is(":checked")) {
                    $("#chart").append("<div title='" + $("#obj" + i).attr("title") + "' style='float:left; height:10px; width:" + parseInt($("#obj" + i).val()) * (700 / summ) + "px;background:rgba(255, " + parseInt($("#obj" + i).val()) * 14 + ", 0, 0.94);'></div>");
                }
            }
        }
    }


    function drawPieChart(value1, value2) {
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

        $("#diagramt").html("Всего прогуляно<br />" + value1 + "<br />Из них по<br />уважительной причине<br />" + value2);
    }
