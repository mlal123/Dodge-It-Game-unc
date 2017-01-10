/*jslint browser: true*/
/*global $, jQuery*/
/*global alert */

$(document).ready(function () {
    'use strict';
    //variables

    var pos, score = 0,
        i, collision = false,
        durationOfFall = 3000,
        rock = $('#circle'),
        person = $('#person'),
        gameOverSound = document.getElementById("gameoverAudio"),
        rightBeep = new Howl({
            urls: ["https:www.cs.unc.edu/~gb/uploaded-files/mlal123@CS.UNC.EDU/7622__ls__beep-001.wav"],
            volume: 0.4,
            loop: false,
            autoplay: false,
            sprite: {
                ring: [0, 1000]
            }

        }),
        leftBeep = new Howl({
            urls: ["https://www.cs.unc.edu/~gb/uploaded-files/mlal123@CS.UNC.EDU/131660__bertrof__game-sound-correct.wav"],
            volume: 0.2,
            loop: false,
            autoplay: false,
            sprite: {
                ding: [0, 1000]
            }
        });

    $("button").click(function () {


        rightBeep.pos3d(1, 0, 0, 'id1');
        rightBeep.play('ring');
        $("button").fadeOut();
        // reset method
        function levels() { //levels increases the rate at which the rock falls
            durationOfFall -= 100;
            if (durationOfFall <= 2000) {
                durationOfFall += 100;
                durationOfFall -= 20;
            }
            if (durationOfFall <= 1000) {
                durationOfFall += 20;
                durationOfFall -= 10;

            }
            if (durationOfFall <= 600) {
                durationOfFall = 600;

            }

        } // levels


        function checkForCollision() { // checks for collision
            //gameOverSound.volume = 1.0;
            if (rock.position().left === person.position().left && rock.position().top + 100 >= person.position().top) {
                rock.stop();
                person.stop();
                rightBeep.pause();
                leftBeep.pause();
                gameOverSound.play();
                person.fadeOut();
                rock.fadeOut();
            }
        } // collision

        var resetPosition = function () { //resets the position of the falling object
            pos = Math.floor((Math.random() * (10 - 0) + 0));
            if (pos % 2 === 0) {
                // set it right

                $("#circle").css({
                    width: 100,
                    height: 100,
                    top: 0,
                    left: 100,
                    position: 'absolute'
                });
                rightBeep.pos3d(1, 0, 0, 'id1');
                rightBeep.play('ring');
                score += 4;
            } else {
                // set it left

                $("#circle").css({
                    width: 100,
                    height: 100,
                    top: 0,
                    left: 0,
                    position: 'absolute'
                });
                leftBeep.pos3d(-1, 0, 0, 'id2');
                leftBeep.play('ding');
                score += 4;
            } //else

            levels();
            $("#circle").animate({
                top: "+=500px"
            }, {
                duration: durationOfFall,
                easing: 'linear',
                progress: checkForCollision,
                complete: resetPosition

            });
            console.log("score is " + score);
        }; // reset function


        //ANIMATION

        $("#circle").animate({
            top: "+=500px"
        }, {

            duration: durationOfFall,
            easing: 'linear',
            progress: checkForCollision,
            complete: resetPosition
        });

        var animating = false,
            animatingOn = function () {
                animating = true;
            },
            animatingOff = function () {
                animating = false;
            };

        $(document).keydown(function (key) {
            if (animating) {
                return;
            }
            switch (parseInt(key.which, 10)) {

                // Left arrow key pressed
            case 37:

                if ($("#person").position().left <= 0) {
                    $("person").css({
                        left: 0
                    });

                } else {

                    animatingOn();
                    $("#person").animate({
                        left: "-=100px"
                    }, {
                        duration: 100,
                        easing: 'linear',
                        progress: checkForCollision,
                        complete: animatingOff
                    });
                }
                break;


                // Right Arrow Pressed
            case 39:

                if ($("#person").position().left >= 100) {
                    $("#person").css({
                        left: 100
                    });

                } else {

                    animatingOn();
                    $("#person").animate({
                        left: "+=100px"
                    }, {
                        duration: 100,
                        easing: 'linear',
                        progress: checkForCollision,
                        complete: animatingOff
                    });
                }
                break;

            } // parseint

        }); //keydown

    }); //button

}); //ready