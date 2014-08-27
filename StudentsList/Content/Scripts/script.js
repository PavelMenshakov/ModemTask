$(Group.getAllData);

$('form').validate({
    rules: {
        lname: {
            required: true
        }
    }
});

$.validator.addMethod("newrequired", $.validator.methods.required, "new name is required");

jQuery.fn.visible = function () {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function () {
    return this.css('visibility', 'hidden');
};

function alertMesAndRel(text) {
    alert(text);
    location.reload();
}