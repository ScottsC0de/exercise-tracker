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









// Rest API ------------------------------------------
// {
//     "day":"https://wger.de/api/v2/day/?format=json",
//     "set":"https://wger.de/api/v2/set/?format=json",
//     "setting":"https://wger.de/api/v2/setting/?format=json",
//     "workout":"https://wger.de/api/v2/workout/?format=json",
//     "templates":"https://wger.de/api/v2/templates/?format=json",
//     "public-templates":"https://wger.de/api/v2/public-templates/?format=json",
//     "workoutsession":"https://wger.de/api/v2/workoutsession/?format=json",
//     "workoutlog":"https://wger.de/api/v2/workoutlog/?format=json",
//     "schedulestep":"https://wger.de/api/v2/schedulestep/?format=json",
//     "schedule":"https://wger.de/api/v2/schedule/?format=json",
//     "daysofweek":"https://wger.de/api/v2/daysofweek/?format=json",
//     "language":"https://wger.de/api/v2/language/?format=json",
//     "license":"https://wger.de/api/v2/license/?format=json",
//     "userprofile":"https://wger.de/api/v2/userprofile/?format=json",
//     "setting-repetitionunit":"https://wger.de/api/v2/setting-repetitionunit/?format=json",
//     "setting-weightunit":"https://wger.de/api/v2/setting-weightunit/?format=json",
//     "exerciseinfo":"https://wger.de/api/v2/exerciseinfo/?format=json",
//     "exercisebaseinfo":"https://wger.de/api/v2/exercisebaseinfo/?format=json",
//     "exercise":"https://wger.de/api/v2/exercise/?format=json",
//     "exercise-translation":"https://wger.de/api/v2/exercise-translation/?format=json",
//     "exercise-base":"https://wger.de/api/v2/exercise-base/?format=json",
//     "equipment":"https://wger.de/api/v2/equipment/?format=json",
//     "exercisecategory":"https://wger.de/api/v2/exercisecategory/?format=json",
//     "video":"https://wger.de/api/v2/video/?format=json",
//     "exerciseimage":"https://wger.de/api/v2/exerciseimage/?format=json",
//     "exercisecomment":"https://wger.de/api/v2/exercisecomment/?format=json",
//     "exercisealias":"https://wger.de/api/v2/exercisealias/?format=json",
//     "muscle":"https://wger.de/api/v2/muscle/?format=json",
//     "variation":"https://wger.de/api/v2/variation/?format=json",
//     "ingredient":"https://wger.de/api/v2/ingredient/?format=json",
//     "ingredientinfo":"https://wger.de/api/v2/ingredientinfo/?format=json",
//     "weightunit":"https://wger.de/api/v2/weightunit/?format=json",
//     "ingredientweightunit":"https://wger.de/api/v2/ingredientweightunit/?format=json",
//     "nutritionplan":"https://wger.de/api/v2/nutritionplan/?format=json",
//     "nutritionplaninfo":"https://wger.de/api/v2/nutritionplaninfo/?format=json",
//     "nutritiondiary":"https://wger.de/api/v2/nutritiondiary/?format=json",
//     "meal":"https://wger.de/api/v2/meal/?format=json",
//     "mealitem":"https://wger.de/api/v2/mealitem/?format=json",
//     "weightentry":"https://wger.de/api/v2/weightentry/?format=json",
//     "gallery":"https://wger.de/api/v2/gallery/?format=json",
//     "measurement":"https://wger.de/api/v2/measurement/?format=json",
//     "measurement-category":"https://wger.de/api/v2/measurement-category/?format=json"
// }
// ------------------------------------------------------------------------------------