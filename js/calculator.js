$(document).ready(function () {
    $('body').prepend("<div class='calculator'></div>");
    $('.calculator').append("<input disabled value='0'>");
    $.each(data, function (index, data) {
        $(".calculator").append($("<button>" + data.value + "</button>").attr("class", data.class).attr("type", data.type).attr("value", data.value).attr("disable", false)
        );
    });
});


var ACTION_DELETE = 'clear';
var ACTION_INC = 'number';
var ACTION_REPLACE = 'replace';
var ACTION_REVERS = 'revers';
var ACTION_DEL_LAST = 'last_del';
var ACTION_CALCUL = 'calcul';


function handleClick(e) {
    var $b = $(e.currentTarget);
    if ($b.attr('type') === 'number') {
        updatNumber(ACTION_INC, $b.val());

    } else {
        switch ($b.val()) {
            case 'C':
                updatNumber(ACTION_DELETE);
                break;

            case 'CE':

                updatNumber(ACTION_DEL_LAST);
                // a = a.substring(0, a.length - 1);
                // if (a.length < 1) {
                //     a = '0';
                // }
                // $('input').val(a);
                break;
            case '&#177;':
                updatNumber(ACTION_REVERS);

                // if (a[0] === '-') {
                //     // a = a.substring(1, a.length);
                //     // $('input').val(a);
                // } else {
                //     if (a !== '0') {
                //         // a = '-' + a;
                //         // $('input').val(a);
                //     }
                // }
                break;
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':


                if (numbers[numbers.length - 1] !== '0') {
                    actions.push($b.val());
                    numbers[actions.length] = '0'

                } else {
                    actions.pop();
                    actions.push($b.val());

                }

                numbers[actions.length] = '0';
                // $('.disable').attr('disabled', true);
                // a += '' + action + '';
                // $('input').val(a);

                break;

            case '=':
                updatNumber(ACTION_CALCUL);

                break;
        }
    }

    updateInput();
    console.log(numbers, actions);
    // console.log(actions);

}

var numbers = ['0'];
var actions = [];

function updatNumber(action, value) {
    switch (action) {
        case ACTION_INC:
            var n = numbers[actions.length];

            switch (value) {
                case '.':
                    // $('input').val(n);
                    n += value;
                    if (n.indexOf('.') === -1) {
                    }
                    break;

                case '0':
                    if (n.length === 1 && n === '0') {
                    } else {
                        n += value;
                        // $('input').val(n);
                    }
                    break;


                    break;
                default:
                    if (n.length === 1 && n === '0') {
                        n = value;
                    } else {
                        n += value;
                    }
            }

            numbers[actions.length] = n;


            break;
        case ACTION_DEL_LAST:
            if (numbers[actions.length] === '0')
            {
                if (numbers.length > 1)
                {
                    numbers.pop();
                    actions.pop();
                }
            } else
                {
                    
                n = numbers[actions.length];
                n = n.substring(0, n.length - 1);

                if (n.length === 0)
                    n = '0';

                numbers[actions.length] = n;
            }

            break;
        case ACTION_DELETE:
            $('input').val('0');
            numbers = ['0'];
            actions = [];

            break;
        case ACTION_REPLACE:

            break;
        case ACTION_REVERS:

            break;

        case ACTION_CALCUL:

            var a;

            for (var i = 0; i < numbers.length; i++) {
                if (a) {
                    var b = parseFloat(numbers[i]);
                    switch (actions[i - 1]) {
                        case '+':
                            a += b;
                            break;
                        case '-':
                            a -= b;
                            break;
                        case '*':
                            a *= b;
                            break;
                        case '/':
                            a /= b;
                            break;
                    }
                } else {
                    a = parseFloat(numbers[i]);
                }
            }

            numbers = [a];
            actions = [];

    }
}

function updateInput() {

    var upIntp = '';
    if (numbers.length === 1) {
        upIntp = numbers['0'];
    } else {
        for (var i = 0; i < numbers.length; i++) {
            if (numbers[i] !== '0')
                upIntp += numbers[i];
            if (actions[i]) {
                upIntp += '' + actions[i] + '';
            }
        }
    }

    $('input').val(upIntp);
}

$(document).ready(function () {
    $("button").click(handleClick);
});
