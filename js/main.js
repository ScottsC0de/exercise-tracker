//API Fetch Options
const bmiOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '9f55da74bcmshb7d12ef53f0f861p1f085ajsn57c0c7ea6fae',
        'X-RapidAPI-Host': 'body-mass-index-bmi-calculator.p.rapidapi.com'
    }
};
const muscleOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9f55da74bcmshb7d12ef53f0f861p1f085ajsn57c0c7ea6fae',
		'X-RapidAPI-Host': 'exerciseapi3.p.rapidapi.com'
	}
};


//Page Elements
var exerciseData = $("#exercise-data-form");
var exerciseElement = $('.exercise-inputs')
var bmiCalc = $("#bmi-calc");
var workoutCalendar = $("#workout-calendar");
var exerciseLink = $("#exercise-link");
var bmiLink = $("#bmi-link");
var scheduleLink = $("#schedule-link");
var homeScreenText = $("#home-screen-text");
var handEmoji = $("#pointer");
var bmiSubmit = $("#bmi-button");
var bmiTotalElement = $('#bmi-total');
var bmiContainer = $('#bmi-output-container');

var muscleSubmitButton = $('#exercise-form-button');
var muscleInputField = $('#muscle-input');

var exerciseNameHolder = $('#exercise-name-holder');
var secondaryMuscleHolder = $('#secondary-muscle-holder');
var exampleLinkHolder = $('#link-holder');

// onload
$(function () {
    exerciseData.css('display', 'none');
    bmiCalc.css('display', 'none');
    workoutCalendar.css('display', 'none');
});

bmiLink.on("click", function () {
    bmiCalc.css('display', 'block');
    exerciseData.css('display', 'none');
    workoutCalendar.css('display', 'none');
    homeScreenText.css('display', 'none');
    handEmoji.css('display', 'none');
});

exerciseLink.on("click", function () {
    exerciseData.css('display', 'block');
    bmiCalc.css('display', 'none');
    workoutCalendar.css('display', 'none');
    homeScreenText.css('display', 'none');
    handEmoji.css('display', 'none');
});

scheduleLink.on("click", function () {
    workoutCalendar.css('display', 'block');
    bmiCalc.css('display', 'none');
    exerciseData.css('display', 'none');
    homeScreenText.css('display', 'none');
    handEmoji.css('display', 'none');
});

//Event listener for BMI Submit
bmiSubmit.on('click', function (event) {
    event.preventDefault();

    var userHeight = $('#bmi-height').val();
    var userWeight = $('#bmi-weight').val();

    userHeight = parseInt(userHeight);
    userWeight = parseInt(userWeight);

    if (ValidateData(userHeight, userWeight)) {
        GetBmiApi(userHeight, userWeight);
    }
    else {
        alert('something is wrong with the data');
    }

    bmiContainer.css('display', 'block');

});

//muscle/exercise lookup event listener
muscleSubmitButton.on('click', function(event){
    event.preventDefault();

    var userMuscleInput = muscleInputField.val();
    userMuscleInput = userMuscleInput.replace(/ /g,"%20")
    userMuscleInput = userMuscleInput.toLowerCase();
    //console.log(userMuscleInput);
    GetMuscleApi(userMuscleInput)
})


function ValidateData(height, weight) {

    console.log('height: ' + height);
    console.log('weight: ' + weight);

    if (isNaN(height) || isNaN(weight)) {
        console.log('height or weight is NaN');
        return false;
    }
    else {
        console.log('height and weight are a number');
        return true;
    }
}

// BMI API
function GetBmiApi(bmiHeight, bmiWeight) {
    fetch('https://body-mass-index-bmi-calculator.p.rapidapi.com/imperial?weight=' + bmiWeight + '&height=' + bmiHeight, bmiOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            bmiTotalElement.text(Math.round(data.bmi));
        })
}

// Muscle API
function GetMuscleApi(targetMuscle) {
    fetch('https://exerciseapi3.p.rapidapi.com/search/?primaryMuscle='+targetMuscle, muscleOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            for(var i = 0; i < data.length; i++){

                //gets the values from the API
                var exerciseName = data[i].Name;
                var secondaryMuscleArray = data[i].SecondaryMuscles;
                var exerciseExampleLink = data[i]["Youtube link"];
                
                //creates the elements
                var exerciseNameElement = $('<li>');
                var secondaryMuscleElement = $('<li>');
                var exerciseLinkElement = $('<li>');
                var exerciseLink = document.createElement('a');

                //Sets the text values of the elements
                exerciseNameElement.text(exerciseName);
                var secondaryMuscleString = secondaryMuscleArray.toString();
                secondaryMuscleElement.text(secondaryMuscleString);
                
                //Puts together youtube links
                exerciseLink.setAttribute('href', exerciseExampleLink);
                exerciseLink.setAttribute('target', "blank");
                exerciseLink.textContent = "Exercise Example";

                //appends the elelents to the holders
                exerciseNameHolder.append(exerciseNameElement);
                secondaryMuscleHolder.append(secondaryMuscleElement);
                exerciseLinkElement.append(exerciseLink);
                exampleLinkHolder.append(exerciseLinkElement);
            }
        })
}