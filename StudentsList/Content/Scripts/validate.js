function validateFields() {
    var nameFlMes = new Array("valmf", "valml", "valms");
    var nameFl = new Array("fname", "lname", "sname");
    var flag = true;
    var dateFl = new Array("bday", "incomday");
    var dateFlmes = new Array("valmb", "valmi");
    for (var i = 0; i < nameFl.length; i++) {
        if ($("[name = '" + nameFl[i] + "']").val().length == 0) {
            $("#"+nameFlMes[i]).visible();
            flag = false;
        } else {
            $("#" + nameFlMes[i]).invisible();
        };
    }
    for (var i = 0; i < dateFl.length; i++) {
        if (!validateDate($("[name = " + dateFl[i] + "]"))) {
            $("#" + dateFlmes[i]).visible();
            flag = false;
        } else {
            $("#" + dateFlmes[i]).invisible();
        };
    }
    return flag;
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