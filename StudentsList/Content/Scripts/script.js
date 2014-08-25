


function setVisibilityById(id, value) {
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
    Subject.getAllData();
    drawPieChart(75, 52);
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
        Student.insertNew();
    });
}