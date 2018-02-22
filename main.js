
$(document).ready(function () {
    $('.modal').modal();
    $('#postear').click(function post() {
        let $titulo = $('.titulo').val();
        let $comentario = $('.comentario').val();
        $('.con').append('<div class="card-panel grey lighten-5 coment center-align">'+'<h2>'+$titulo+'</h2>'+'<p>'+$comentario+'</p>'+'</div>');
    })
    //subir imagen
    $("#file-to-upload").on('change', function () {
        let titulo_img = $('.titulo-img').val();
        let reader = new FileReader();
        reader.onload = function () {
            $("#image").attr('src', reader.result).show();
        };
        reader.readAsDataURL($("#file-to-upload").get(0).files[0]);
        $('#img').prepend('<h2>'+ titulo_img + '</h2>');
    });
    //inicializa datepicker
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
    });

});

//api de camara para tomar foto y guardarlo en tu pc

function tomafoto() {
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

//api geolocalizacion
function findMe() {
    var output = document.getElementById("out");

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var value =  document.getElementById('titulo-geo').value;
        var datos = document.getElementById('data-geo').value;
        output.innerHTML = '<h3>'+ value +'</h3>'+'<h4>'+ datos + '</h4>' + '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

        var img = new Image();
        img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=true&marker";

        output.appendChild(img);
    };

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    };

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
}
