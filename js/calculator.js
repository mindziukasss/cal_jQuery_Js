$(document).ready(function () {
    $('body').prepend("<div class='calculator'></div>");
    $('.calculator').append("<input disabled value='0'>");

    $.each(data, function (index, data) {
        $(".calculator").append($("<button>" + data.value + "</button>").
            attr("class", data.class).
            attr("type", data.type).
            attr("value", data.value).
            attr("disable", false)
        );
    });
});