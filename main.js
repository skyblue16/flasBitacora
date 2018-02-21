
$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $('#postear').click(function post() {
        var $titulo = $('.titulo').val();
        var $comentario = $('.comentario').val();
        $('.con').append('<div class="card-panel grey lighten-5 coment center-align">'+'<h2>'+$titulo+'</h2>'+'<p>'+$comentario+'</p>'+'</div>');
    })

    // $('.aja').click(function () {
    //     var $valor = $('.ja').val();
    //     $('.imagen').append('<img class="src">')
    //     $('.src').attr('src',$valor);
    // })


    $('.aja').click(function handleFiles(file) {
        window.URL = window.URL || window.webkitURL;

        var fileSelect = document.getElementById("fileSelect"),
            fileElem = document.getElementById("fileElem"),
            fileList = document.getElementById("fileList");

        fileSelect.addEventListener("click", function (e) {
            if (fileElem) {
                fileElem.click();
            }
            e.preventDefault(); // prevent navigation to "#"
        }, false);
        if (!files.length) {
            fileList.html('<p>No files selected!</p>');
        } else {
            fileList.html('');
            var list = document.createElement("ul");
            fileList.append(list);
            for (var i = 0; i < files.length; i++) {
                var li = document.createElement("li");
                list.append(li);

                var img = document.createElement("img");
                img.src = window.URL.createObjectURL(files[i]);
                img.height = 60;
                img.onload = function () {
                    window.URL.revokeObjectURL(this.src);
                }
                li.append(img);
                var info = document.createElement("span");
                info.html(files[i].name + ": " + files[i].size + " bytes");
                li.append(info);
            }
        }
    })

});

//api de camara para tomar foto y guardarlo en tu pc 


window.addEventListener('load', init);
function init() {
    var video = document.getElementById('video')
    navigator.getUserMedia = (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    );
    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true }, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
            var canvas = document.getElementById("canvas");
            var contexto = canvas.getContext('2d');
            var downloadBtn = document.getElementById('snap');
            setInterval(function () {
                contexto.drawImage(this.video, 0, 0)
            }, 1000 / 30)

            downloadBtn.addEventListener('click', function () {
                var imageUrl = canvas.toDataURL('image/png');
                var link = document.getElementById('download-link')
                link.href = imageUrl;
                link.download = "photo.png"; // con el atributo download puedes descargarlo con el nombre que le pongas

                link.click();
            })
        },
            function (e) {
                console.log(e);
            })
    } else {
        alert('no soporta')
    }
};