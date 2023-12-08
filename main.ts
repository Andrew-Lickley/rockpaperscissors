enum RadioMessage {
    message1 = 49434
}
/**
 * Version 5 (b)
 * 
 * Expanded the winning hand logic from one mixed Boolean expression to individual statements. as you will see a lot of duplication in each statement..
 * 
 * renamed some of the variables to be more descriptive
 */
/**
 * start a new game on power up
 */
/**
 * Paper
 */
/**
 * wait for the other microbits selection then test...
 */
/**
 * this while checks when it receives thireitem,  from the other player, this player has chosen myitem, if not will flash the led  until this player has chosen
 */
/**
 * Alternative If statement form ver 5
 */
/**
 * my item win
 */
/**
 * my item win
 */
/**
 * my item win
 */
/**
 * my item win
 */
/**
 * show screen ready for next hand
 */
/**
 * My hand wins
 */
/**
 * My hand Wins
 */
/**
 * My hand wins
 */
/**
 * Both the same - draw
 */
/**
 * any other result is a lose
 */
/**
 * displays the score
 */
/**
 * Have we a winner yet ?
 */
/**
 * I win, smile and happy tune
 */
/**
 * I lose sad face and music
 */
/**
 * wait then start again
 */
radio.onReceivedNumber(function (receivedNumber) {
    their_hand = receivedNumber
    while (my_hand == 9) {
        basic.pause(50)
        led.toggle(2, 0)
        basic.pause(50)
        led.toggle(2, 0)
    }
    basic.pause(2000)
    if (my_hand == 0 && their_hand == 2) {
        basic.showIcon(IconNames.Yes)
        My_score += 1
        music.play(music.tonePlayable(988, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    } else if (my_hand == 1 && their_hand == 0) {
        basic.showIcon(IconNames.Yes)
        My_score += 1
        music.play(music.tonePlayable(988, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    } else if (my_hand == 2 && their_hand == 1) {
        basic.showIcon(IconNames.Yes)
        My_score += 1
        music.play(music.tonePlayable(988, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    } else if (my_hand == their_hand) {
        basic.showIcon(IconNames.No)
        music.play(music.tonePlayable(131, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    } else {
        basic.showLeds(`
            # . . . #
            . . # . .
            . . . . .
            . # # # .
            # . . . #
            `)
        their_score += 1
    }
    basic.showNumber(My_score)
    basic.pause(2000)
    if (My_score == 10 || their_score == 10) {
        if (My_score == 10) {
            basic.showLeds(`
                # . . . #
                . . . . .
                . . # . .
                # . . . #
                . # # # .
                `)
            for (let index = 0; index < 4; index++) {
                music.play(music.stringPlayable("C5 B C5 A C5 G C5 F ", 120), music.PlaybackMode.UntilDone)
            }
        } else {
            basic.showLeds(`
                # . . . #
                . . # . .
                . . . . .
                . # # # .
                # . . . #
                `)
            music.play(music.stringPlayable("C C C C C C C C ", 120), music.PlaybackMode.UntilDone)
        }
        basic.pause(5000)
        Start_up_screen()
    } else {
        basic.showLeds(`
            . . . . .
            . # . # .
            # # # # #
            . # . # .
            . . . . .
            `)
        my_hand = 9
    }
})
/**
 * send selection to other microbit
 */
input.onButtonPressed(Button.A, function () {
    if (my_hand == 9) {
        basic.showIcon(IconNames.Square)
        my_hand = 1
        radio.sendNumber(my_hand)
    } else {
        music.play(music.stringPlayable("C C5 - - - - - - ", 400), music.PlaybackMode.UntilDone)
    }
})
/**
 * button B  flagged as pressed (my hand will be 0,1 or 2)
 */
/**
 * scissors
 */
input.onButtonPressed(Button.AB, function () {
    if (my_hand == 9) {
        basic.showIcon(IconNames.Scissors)
        my_hand = 2
        radio.sendNumber(my_hand)
    } else {
        music.play(music.stringPlayable("C C5 - - - - - - ", 400), music.PlaybackMode.UntilDone)
    }
})
/**
 * Shake to start a new game
 */
/**
 * Rock selected
 */
/**
 * if my hand= 9 flags button B hasn't been pressed so i can select an item.
 * 
 * if my hand not = 9 will just play the bleeps (error)
 * 
 * this stops a player changing their hand after a button press
 */
input.onButtonPressed(Button.B, function () {
    if (my_hand == 9) {
        basic.showIcon(IconNames.Chessboard)
        my_hand = 0
        radio.sendNumber(my_hand)
    } else {
        music.play(music.stringPlayable("C C5 - - - - - - ", 400), music.PlaybackMode.UntilDone)
    }
})
/**
 * This function is what to do when starting a new game. Creating it as a function means I don't have to write the code twice ie for when I switch on or shake
 * 
 * reset the score to 0 and show start up screens.
 * 
 * working in pairs, each pair need to select their own radio group between 0 and 255
 * 
 * set myitem to 9 (flags button B not pressed yet)
 */
function Start_up_screen () {
    My_score = 0
    their_score = 0
    my_hand = 9
    radio.setGroup(1)
    for (let index = 0; index < 2; index++) {
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . # . .
            . . # . .
            `)
        basic.showLeds(`
            . # . # .
            . # . # .
            . # . # .
            . # . # .
            . # . # .
            `)
        basic.showLeds(`
            # . . . #
            # . . . #
            # . . . #
            # . . . #
            # . . . #
            `)
    }
    basic.pause(5)
    basic.showLeds(`
        . . . . .
        . # . # .
        # # # # #
        . # . # .
        . . . . .
        `)
}
input.onGesture(Gesture.Shake, function () {
    Start_up_screen()
})
let their_score = 0
let My_score = 0
let my_hand = 0
let their_hand = 0
Start_up_screen()
