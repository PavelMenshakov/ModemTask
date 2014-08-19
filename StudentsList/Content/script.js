﻿function focusStudent(e,id) {
    if ($("#stactive")) {
        $("#stactive").attr("id", "");
    }
    e.id = "stactive";
    showInfoWindow();
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
    getJDataByid(id);
}


function setVisibilityById(id,value) {
    $("#" + id).css("visibility", value);
}

function alertMesAndRel(text) {
    alert(text);
    location.reload();
}

function showInfoWindow() {
    $("#stlist").attr("class", "stlista");
    $("#studentinf").css("display", "block");
    setVisibilityById("backref", "visible");
    setVisibilityById("sb", "visible");
    $("#mainform").trigger('reset')
    drawPieChart(98, 52);
}

function addingStudent() {
    showInfoWindow();
    $("#text").html("Добавление студента")
    setVisibilityById("delete", "hidden");

    if ($("#stactive")) {
        $("#stactive").attr("id", "");
    }
    $("#sb button").attr('onclick', '').unbind('click');
    $("#sb button").click(function () {
        insertData();
    });
}
