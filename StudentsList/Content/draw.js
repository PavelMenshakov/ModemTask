function drawChart() {

    var summ = 0;
    for (var i = 1; i < 10; i++) {
        if ($("#obj" + i).is(":checked")) {
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