var canvas = document.querySelector('canvas');
console.log(canvas);
c = canvas.getContext('2d');

var wave = {
    amplitude: 50,
    length: 2200,
    frequency: 0.16
};
var time = 0;

// function static_sine_wave() {

//     var omega = 2 * Math.PI * wave.frequency;
//     var k = (2 * Math.PI) / wave.length;
//     console.log('sine wave');
//     c.beginPath();
//     c.moveTo(0, canvas.height);

//     for (let x = 0; x < canvas.width; x++) {
//         var sine = Math.sin((k * x) - (omega * time));
//         // var sine = Math.sin((x * wave.length) + wave.frequency);
//         let y = (canvas.height - x) + (wave.amplitude * sine);
//         c.lineTo(x, y);
//         // c.rotate(70);
//         c.strokeStyle = 'rgb(255, 0, 255)';
//         c.stroke();
//         time += 0.05;
//     }
// }

// static_sine_wave();

function fill_line(x, y) {
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x, canvas.height);
    c.strokeStyle = 'rgb(95, 14, 5)';
    c.stroke();
    // document.body.style.background = 'url(' + c.toDataURL() + ')';
}

function dynamic_sine_wave() {

    canvas.width = innerWidth;
    canvas.height = innerHeight;
    var hw_ratio = canvas.height / canvas.width;
    // console.log('height: ', innerHeight);
    // console.log('width: ', innerWidth);
    // console.log('height / width: ', hw_ratio);
    // console.log('resultant wavelength: ', Math.abs(wave.length - hw_ratio * 1000));
    var omega = 2 * Math.PI * wave.frequency;
    var k = (2 * Math.PI) / Math.abs(wave.length - hw_ratio * 1000);

    c.beginPath();
    c.moveTo(0, canvas.height);

    for (let x = 0; x < canvas.width; x++) {
        var sine = Math.sin((k * x) - (omega * time));
        // let y = + (wave.amplitude * sine);
        let y = (canvas.height - x * hw_ratio) + (wave.amplitude * sine);
        // let y = wave.y + (wave.amplitude * sine);
        c.lineTo(x, y);
        fill_line(x, y);
    }

    // c.strokeStyle = 'rgb(0, 0, 255)';
    // c.stroke();

    time += 0.05;
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    dynamic_sine_wave();
    // static_sine_wave();
}

animate();
