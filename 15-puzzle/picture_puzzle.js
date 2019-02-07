window.onload = function() {
    canv = document.getElementById("canvas");
    context = canv.getContext("2d");
    init();
    draw();
    setInterval(draw, 1000/30);
    addEventListener("keydown", keyPush);
}

start = false;
begin = false;
finish = false;

squares = [];
zero_index = 15;

initialTime = 0;

function init() {

    squares = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

    for (let i = 0; i < 1000; i++) {
        keyPush({ keyCode: Math.floor(Math.random() * 4) + 37 });
    }
    zero_index = squares.indexOf(0);

    date = new Date();
    initialTime = date.getTime();
    start = true;
}

function checkDone() {
    if (!start) {
        finish = false;
        return;
    }
    f = true;
    for (let i = 0; i < 14; i++) {
        if (squares[i] != i + 1) f = false;
    }
    if (squares[15] != 0) f = false;
    finish = f;
}

function draw() {
    if (finish) return;

    context.fillStyle = "black";
    context.fillRect(0, 0, canv.width, canv.height);
    context.fillStyle = "white";

    date = new Date();
    time = date.getTime() - initialTime;
    context.fillText((time/1000-3).toFixed(3), 10, 450);

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            context.font = "40px Arial";
            if (squares[i * 4 + j] != 0) {
                context.fillText(squares[i*4+j], j * 100 + 35, i * 100 + 70);
            }
        }
    }
}

function keyPush(evt) {
    if (finish) return;
    if ((start && !begin)) {
        date = new Date();
        if (date.getTime() - initialTime - 3000 >= 0) {
            begin = true;
            console.log(date.getTime() - initialTime - 3000);
        } else {
            console.log('not begin');
            return;
        }
    }
    switch (evt.keyCode) {
        case 37:
            if (zero_index % 4 < 3) {
                squares[zero_index] = squares[zero_index + 1];
                squares[zero_index + 1] = 0;
                zero_index = zero_index + 1;
                draw();
                checkDone();
            } break;
        case 38:
            if (Math.floor(zero_index / 4) < 3) {
                squares[zero_index] = squares[zero_index + 4];
                squares[zero_index + 4] = 0;
                zero_index = zero_index + 4;
                draw();
                checkDone();
            } break;
        case 39:
            if (zero_index % 4 > 0) {
                squares[zero_index] = squares[zero_index - 1];
                squares[zero_index - 1] = 0;
                zero_index = zero_index - 1;
                draw();
                checkDone();
            } break;
        case 40:
            if (Math.floor(zero_index / 4) > 0) {
                squares[zero_index] = squares[zero_index - 4];
                squares[zero_index - 4] = 0;
                zero_index = zero_index - 4;
                draw();
                checkDone();
            } break;
    }
}