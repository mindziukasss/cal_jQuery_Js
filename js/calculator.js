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
    if ($b.attr('type') === 'number') {

        switch ($b.val()) {
            case '.':
                if (a.indexOf('.') === -1) {
                    a += $b.val();
                    $('input').val(a);
                }
                break;

            case '0':
                if (a.length === 1 && a === '0') {
                } else {
                    a += $b.val();
                    $('input').val(a);
                }
                break;

            default:
                if (a.length === 1 && a === '0') {
                    a = $b.val();
                    $('input').val(a);
                } else {
                    a += $b.val();
                    $('input').val(a);
                }
        }
    } else {
        switch ($b.val()) {
            case 'C':
                a = '0';
                $('input').val(a);
                $('.disable').attr("disabled", false);
                break;

            case 'CE':
                a = a.substring(0, a.length - 1);
                if (a.length < 1) {
                    a = '0';
                }
                $('input').val(a);
                break;
        }

    }
}

$(document).ready(function () {
    $("button").click(handleClick);
});
