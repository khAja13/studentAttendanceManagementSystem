var video = document.getElementById("video");
var video1 = document.getElementById("video1");

var media = navigator.mediaDevices.getUserMedia({ video: true });
var media1 = navigator.mediaDevices.getUserMedia({ video: true });

media.then((stream) => {
	video.srcObject = stream;
});
media1.then((stream) => {
	video1.srcObject = stream;
});

var canvas = document.getElementById("canvas");
var canvas1 = document.getElementById("canvas1");

canvas.setAttribute("width", video.width);
canvas.setAttribute("height", video.height);

canvas1.setAttribute("width", video1.width);
canvas1.setAttribute("height", video1.height);

video.addEventListener(
	"timeupdate",
	function () {
		var context = canvas.getContext("2d");
		context.drawImage(video, 0, 0, video.width, video.height);
	},
	true
);

video1.addEventListener(
	"timeupdate",
	function () {
		var context1 = canvas1.getContext("2d");
		context1.drawImage(video1, 0, 0, video1.width, video1.height);
	},
	true
);

var context, context1
var img_base64, img_base64_1

document.getElementById("btn").addEventListener("click", () => {
	context = canvas.getContext("2d")

	img_base64_1 = canvas.toDataURL("image/jpeg").replace(/^.*,/, "");
	asdf = canvas.toDataURL("image/png");
	document.getElementById('snap').setAttribute('src', asdf)
	document.getElementById('snap').style.width = '38rem'
	document.getElementById('snap').style.height = '28.2rem'
	document.getElementById('snap').style.marginTop = '24px'
	document.getElementById('snap').style.marginBottom = '24px'
	video.remove()
});

document.getElementById("btn1").addEventListener("click", () => {
	context1 = canvas1.getContext("2d")

	img_base64 = canvas1.toDataURL("image/jpeg").replace(/^.*,/, "");
	fdsa = canvas1.toDataURL('image/jpg')
	document.getElementById('snap1').setAttribute('src', fdsa)
	document.getElementById('snap1').style.width = '38rem'
	document.getElementById('snap1').style.height = '28.2rem'
	document.getElementById('snap1').style.marginTop = '24px'
	document.getElementById('snap1').style.marginBottom = '24px'
	video1.remove()
});

function go(){

	var tableis = document.getElementById("tableis"); 
	var course = document.getElementById("course"); 
	var section = document.getElementById("section"); 

	captureImg(img_base64, img_base64_1, tableis.innerText, course.innerText, section.innerText);
}

function captureImg(img_base64, img_base64_1, tableis, course, section) {
	var xhr = new XMLHttpRequest();
	const body = new FormData();
	body.append("img", img_base64);
	body.append("img1", img_base64_1);
	body.append('tableis', tableis);
	body.append('course', course);
	body.append('section', section);

	console.log("All submitted")
	
	xhr.open("POST", "http://localhost:5000/capture_img", true);
	xhr.onload = () => {
		const hour = new Date().getHours();
		const welcomeTypes = ['Good morning', 'Good afternoon', 'Good evening'];
		let welcomeText = '';
		if (hour < 12) welcomeText = welcomeTypes[0];
		else if (hour < 18) welcomeText = welcomeTypes[1];
		else welcomeText = welcomeTypes[2];

		if (xhr.responseText === "bar") {
			alert("Some error while detecting the barcode");
		} 
		else if(xhr.responseText.length == 16){
			alert(`${welcomeText}, ${xhr.responseText.split('.')[0]}`);
		}
		else {
			alert(xhr.responseText)
		}
		location.reload();
	};
	xhr.send(body);
}
