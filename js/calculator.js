$(document).ready(function () {
    $('body').prepend("<div class='calculator'></div>");
    $('.calculator').append("<input disabled value='0'>");

    $.each(data, function (index, data) {
        $(".calculator").append($("<button>" + data.value + "</button>").attr("class", data.class).attr("type", data.type).attr("value", data.value).attr("disable", false)
        );
    });
});


var a = '0';

function handleClick(e) {
    var $b = $(e.currentTarget);

    if ($b.attr('type') == 'number') {
        if ($b.val() === '.') {
            if (a.indexOf('.') === -1) {
                a += $b.val();
                $('input').val(a);
            }
        } else {
            a += $b.val();
            $('input').val(a);
        }
    }

    else if ($b.attr('type') == 'action') {


    }


}
$(document).ready(function () {
    $("button").click(handleClick);
});
