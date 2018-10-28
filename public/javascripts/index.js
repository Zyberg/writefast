var isWriting = false;
var SETTINGS = {
    delay: 10
}

function submitFinishedText() {
    var theme = document.getElementById('theme').innerHTML;
    var author = document.getElementById('author').value;

    var http = new XMLHttpRequest();
	var url = 'http://localhost:3000/finished/';
	var params = 'text=' + document.getElementById('submition').value + '&duration=' + SETTINGS.delay * 1000 + '&author=' + author + '&theme=' + theme;
	http.open('POST', url, true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			console.log(http.responseText);
            setTimeout(() => location.href = 'http://localhost:3000/finished/' + theme, 200);
		}
	}
	http.send(params);
}

function setTimerLabel() {
    var delay = SETTINGS.delay * 1000 * 60;
    var minutes = Math.floor((delay % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((delay % (1000 * 60)) / 1000);

    var timeLabel = '';
        timeLabel += minutes < 10 ? '0' + minutes : minutes;
        timeLabel += ':';
        timeLabel += seconds < 10 ? '0' + seconds : seconds;

    document.getElementById('time').innerHTML = timeLabel;
}

function setTimerInitial() {
    setTimerLabel();

    document.getElementById('timer').addEventListener('mousedown', function(e) {
        var popup = document.createElement("div");

        var para = document.createElement("p");
        var node = document.createTextNode("Įvesk, kiek minučių norėtum rašyti: ");
        para.appendChild(node);
        popup.appendChild(para);

        var input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("max", "59");
        input.setAttribute("min", "1");
        input.setAttribute("value", SETTINGS.delay);
        input.addEventListener('keyup', function(e) { if(input.value > 59) input.value = 59; else if(input.value < 1) input.value = 1;});
        
        popup.appendChild(input);

        var submitBtn = document.createElement("div");
        submitBtn.appendChild(document.createTextNode("Išsaugoti"))
        submitBtn.addEventListener('mousedown', function(e) {
            SETTINGS.delay = input.value;
            setTimerLabel();

            popup.classList = "invisible";
        });
        submitBtn.classList = "btn";
        popup.appendChild(submitBtn);


        popup.className = "popup";
        document.getElementsByTagName('body')[0].appendChild(popup);
    })
}

function startTimerOnTimer(delay) {
    //Get the timer area
    var timeDisplay = document.getElementById('time');

    //Normalize delay to minutes
    delay *= 1000 * 60;
    
    // Set the date to now
    var countDownDate = new Date().getTime() + delay;

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        var timeLabel = '';
            timeLabel += minutes < 10 ? '0' + minutes : minutes;
            timeLabel += ':';
            timeLabel += seconds < 10 ? '0' + seconds : seconds; 
        
        timeDisplay.innerHTML = timeLabel;

        // If the count down is finished, write some text 
        if (distance <= 0) {
            clearInterval(x);
            submitFinishedText();
        }
    }, 1000);
}

window.onload = () => {
    var textArea = document.getElementById('submition');

    setTimerInitial();

    var startTimer = e => {
        isWriting = true;

        startTimerOnTimer(SETTINGS.delay);

        textArea.removeEventListener('keydown', startTimer, false);
    }

    textArea.addEventListener('keydown', startTimer, false);
}