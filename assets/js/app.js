$(document).ready(function() {

    //audio / soundeffects
    var correct = new Audio("assets/sounds/correct.mp3");
    var wrong = new Audio("assets/sounds/wrong.mp3");
    var tick = new Audio("assets/sounds/tick.mp3");
    var gameOver = new Audio("assets/sounds/over.mp3");
    var rollOver = new Audio("assets/sounds/rollover.mp3")


    //triva objects
    var triva = [{
            question: "This popular TV Show featured a Dodge Charger as a main character?",
            choice: [
                "Fall Guy",
                "Dukes of Hazzard",
                "CHiPs",
                "Miami Vice"
            ],
            answer: 1,
            image: "assets/images/popup/doh.jpg",
        },
        {
            question: "The Producer of this 80's cult classic, was also responsible for the 90s blockbuster movie, Heat?",
            choice: [
                "Hardcastle and McCormick",
                "Knight Rider",
                "Miami Vice",
                "The Love Boat"
            ],
            answer: 2,
            image: "assets/images/popup/mv.jpg",
        },
        {
            question: "In this show, a Six Million Dollar Man fell on hard times and had to take a second job chasing bounties in his GMC 4X4?",
            choice: [
                "The Fall Guy",
                "Magnum P.I.",
                "MacGyver",
                "Charles in Charge"
            ],
            answer: 0,
            image: "assets/images/popup/fg.jpg",
        },
        {
            question: "This suave character solved all the cases, after which he wined all the ladies on his yacht in Marina Del Rey?",
            choice: [
                "Benson",
                "The Equalizer",
                "The Greatest American Hero",
                "Quincy ME"
            ],
            answer: 3,
            image: "assets/images/popup/q.jpg",
        },
        {
            question: "This 80s show possibly launched the idea for Apple Watches&reg;?",
            choice: [
                "Fantasy Island",
                "Matlock",
                "Knight Rider",
                "T.J. Hooker"
            ],
            answer: 2,
            image: "assets/images/popup/kr.jpg",
        },
        {
            question: "Before Nakatomi, this 80's show gave this witty character his start?",
            choice: [
                "Taxi",
                "L.A. Law",
                "Newhart",
                "Moonlighting"
            ],
            answer: 3,
            image: "assets/images/popup/ml.jpg",
        },
        {
            question: "The 'baddest' of characters was afraid to fly in this 80's hit?",
            choice: [
                "The Facts of Life",
                "The A-Team",
                "Who's The Boss",
                "Charlie's Angels"
            ],
            answer: 1,
            image: "assets/images/popup/at.jpg",
        },
        {
            question: "This Navy Seal sped around chasing bad guys in paradise, as everyone's favorite detective?",
            choice: [
                "MacGyver",
                "The Incredible Hulk",
                "Magnum P.I.",
                "Coach"
            ],
            answer: 2,
            image: "assets/images/popup/mpi.jpg",
        },
        {
            question: "With some chewing gum, duct tape, and bailing wire, this character of this show can take down any enemy force?",
            choice: [
                "The Equalizer",
                "MacGyver",
                "Barney Miller",
                "Remington Steele"
            ],
            answer: 1,
            image: "assets/images/popup/mac.jpg",
        },
        {
            question: "The thrash band Anthrax dropped in on this family show to taste test the Mung?",
            choice: [
                "Married With Children",
                "Murphy Brown",
                "Mama's Family",
                "Alf",
            ],
            answer: 0,
            image: "assets/images/popup/mwc.jpg",
        }
    ];

    //global variables
    var correctCount = 0;
    var wrongCount = 0;
    var unansweredCount = 0;
    var timer = 10;
    var intervalId;
    var userGuess = "";
    var running = false;
    var tCount = triva.length;
    var pick;
    var index;
    var newArray = [];
    var trivaXfer = [];

    //game start (button hide)

    $("#reset").hide();
    $("#start").on('click', function() {
        $("#start").hide();
        $("#reset").hide();
        $("#answer").empty();
        showQst();
        runTimer();
        for (var i = 0; i < triva.length; i++) {
            trivaXfer.push(triva[i])
        }
    })

    //start timer
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000)
            running = true;
        }
    }

    //countdown
    function decrement() {
        $("#countdown").html("<h3>" + timer + "</h3>");
        tick.play();
        timer--;

        //stop the timer if reaches zero
        if (timer === -1) {
            tick.pause();
            wrong.play();
            unansweredCount++;
            stop();
            $("#answer").html("<h3 style='color: white; text-shadow: 2px 2px black; margin: -3% 0 0 0;'>TIME IS UP!!! <br> The correct answer is: " + pick.choice[pick.answer] + "</h3>");
            hidePicture();
        }
    }
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    //question layout (html) and random question pick
    function showQst() {
        //random generator
        index = Math.floor(Math.random() * triva.length);
        pick = triva[index];

        $("#question").html("<h3>" + pick.question + "</h3>");

        //answer layout / choice
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerCh");
            userChoice.html(pick.choice[i]);

            userChoice.attr("data-guessValue", i);
            $("#answer").append(userChoice);

            $(".answerCh").hover(function(event) {
                rollOver.play() = event;
            });

            //console logs
        }

        //answer choice if/else 
        $(".answerCh").on('click', function() {

            userGuess = parseInt($(this).attr("data-guessValue"));

            if (userGuess === pick.answer) {
                //play correct sound (claps)
                correct.play();
                stop();
                correctCount++;
                $("#answer").html("<h3 style='text-shadow: 2px 2px black; margin: -3% 0 0 0;'>You Are Correct!!!</h3>");
                hidePicture();
            } else {
                //play wrong sound (boo)
                wrong.play();
                stop();
                wrongCount++;
                userGuess = "";
                $("#answer").html("<h3 style='color: red; text-shadow: 2px 2px black; margin: -3% 0 0 0;'>You Are Wrong! <br> The Answer is: " + pick.choice[pick.answer] + "</h3>");
                hidePicture();
            }
        })
    }

    //show image related to question asked
    function hidePicture() {
        $("#answer").append("<img src=" + pick.image + " style='box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.74), 0 40px 60px 0 rgba(175, 2, 255, 0.856); margin-top: 1%;'>");
        newArray.push(pick);
        triva.splice(index, 1);

        var hidePic = setTimeout(function() {
            $("#answer").empty();
            timer = 10;

            //scoresheet after complition of all 10 questions
            if ((wrongCount + correctCount + unansweredCount) === tCount) {
                //pause and play needed sounds
                tick.pause();
                gameOver.play();
                //reset timer and empty question field
                $("#countdown").text("00");
                $("#question").empty();
                //Scoresheet Print Out
                $("#answer").html("<h3 style='color: white; text-shadow: 2px 2px black;'> Game Over, Please Play Again. <br> You Scored: </h3>");
                $("#answer").append("<h4 style='color: white; text-shadow: 2px 2px black;'> Correct: " + correctCount + "</h4>");
                $("#answer").append("<h4 style='color: white; text-shadow: 2px 2px black;'> Incorrect: " + wrongCount + "</h4>");
                $("#answer").append("<h4 style='color: white; text-shadow: 2px 2px black;'> Unanswered: " + unansweredCount + "</h4>");
                $("#answer").append("<h4 style='color: white; text-shadow: 2px 2px black;'> Please Click Play Again Below </h4>");
                //Show Play Again Button
                $("#reset").show();
                //reset variables
                correctCount = 0;
                wrongCount = 0;
                unansweredCount = 0;


            } else {
                runTimer();
                showQst();

            }
        }, 3000);
    }

    //reset to play again
    $("#reset").on('click', function() {
        $("#reset").hide();
        $("#answer").empty();
        $("#question").empty();
        for (var i = 0; i < trivaXfer.length; i++) {
            triva.push(trivaXfer[i]);
        }
        runTimer();
        showQst();

    })
})