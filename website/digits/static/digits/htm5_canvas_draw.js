var mousePressed = false;
var lastX, lastY;
var ctx;

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });

    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });

    clearArea();
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
}

function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function DrawPic() {
     
    // Get the canvas element and its 2d context
    var Cnv = document.getElementById('myCanvas');
    var Cntx = Cnv.getContext('2d');
         
    // Create gradient
    var Grd = Cntx.createRadialGradient(100, 100, 20, 140, 100, 230);
    Grd.addColorStop(0, "red");
    Grd.addColorStop(1, "black");
     
    // Fill with gradient
    Cntx.fillStyle = Grd;
    Cntx.fillRect(0, 0, 300, 300);
     
    // Write some text
    for (i=1; i<10 ; i++)
    {
        Cntx.fillStyle = "white";
        Cntx.font = "36px Verdana";
        Cntx.globalAlpha = (i-1) / 9;
        Cntx.fillText("哲 yish.fun 楚", i * 3 , i * 30);
    }
}

function IdentifyPic() {
     
    // Generate the image data
    var Pic = document.getElementById("myCanvas").toDataURL("image/png");
    Pic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");
 
    // Sending the image data to Server
    $.ajax({
        type: 'POST',
        url: 'identify/',
        data: '{ "imageData" : "' + Pic + '" }',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {
            alert("识别结果为：" + msg.result);
            clearArea();
        }
    });
}

$(function(){
    InitThis();
});