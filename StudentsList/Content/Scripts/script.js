$(document).ready(Group.getAllData());

function setVisibilityById(id, value) {
    $("#" + id).css("visibility", value);
}

function alertMesAndRel(text) {
    alert(text);
    location.reload();
}