$(document).ready(function () {
    $('body').prepend("<div class='calculator'></div>");
    $('.calculator').append("<input disabled value='0'>");
    $.each(data, function (index, data) {
        $(".calculator").append($("<button>" + data.value + "</button>").attr("class", data.class).attr("type", data.type).attr("value", data.value).attr("disable", false)
        );
    });
});
/*
 * This function check type and do action by case*/
function handleClick(e) {
    var $b = $(e.currentTarget);
    if ($b.attr('type') === 'number') {
        updateNumber(ACTION_INC, $b.val());
    } else {
        switch ($b.val()) {
            case 'C':
                updateNumber(ACTION_DELETE);
                break;
            case 'CE':
                updateNumber(ACTION_DEL_LAST);
                break;
            case '&#177;':
                updateNumber(ACTION_REVERS);
                break;
            case '%':
                updateNumber(ACTION_PROC);
                break;

                //update action array and creating new number
            case '+':
            case '-':
            case '*':
            case '/':
                var n = numbers[actions.length];
                if (n[n.length - 1] === '.') {
                    n = n.substring(0, n.length - 1);
                }
                numbers[actions.length] = n;
                if (numbers[numbers.length - 1] !== '0') {
                    actions.push($b.val());
                    numbers[actions.length] = '0'
                } else {
                    actions.pop();
                    actions.push($b.val());
                }
                numbers[actions.length] = '0';
                break;
            case '=':
                updateNumber(ACTION_CALCUL);
                break;
        }
    }
    updateInput();
}

var numbers = ['0'];
var actions = [];

/*
 * That's all logic
 * */

function updateNumber(action, value) {
    switch (action) {
        case ACTION_INC:
            var n = numbers[actions.length];

            switch (value) {
                case '.':
                    n += value;
                    if (n.indexOf('.') === -1) {
                    }
                    break;

                case '0':
                    if (n.length === 1 && n === '0') {
                    } else {
                        n += value;
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
            if (numbers[actions.length] === '0') {
                if (numbers.length > 1) {
                    numbers.pop();
                    actions.pop();
                }
            } else {

                n = numbers[actions.length];
                n = n.substring(0, n.length - 1);

                if (n.length === 0)
                    n = '0';

                numbers[actions.length] = n;
            }
            break;

        case ACTION_DELETE:
            numbers = ['0'];
            actions = [];

            break;

        case ACTION_REVERS:
            n = numbers[actions.length];
            if (n[0] === '-') {
                n = n.substring(1, n.length);
            } else {
                if (n !== '0') {
                    n = '-' + n;
                }
            }
            numbers[actions.length] = n;
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

            numbers = [a.toString()];
            actions = [];
            break;

        case ACTION_PROC:

            var a;
            if (numbers[action.length] === '0')
                numbers = '0';
            else {
                for (var i = 0; i < numbers.length - 1; i++) {
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
                numbers[actions.length] = ((a / 100) * numbers[actions.length]).toString();

                if (numbers[actions.length] === "NaN") {
                    numbers[actions.length] = '0';
                }

            }
            break;

    }
}
/*
 * * Show numbers and action, result to input*/
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
