import React, { Component } from "react";
import Navbar from "../navbar/navbar";
import Header from "../header/header";
import Footer from "../footer/footer";
import Clickitem from "../clickitem/clickitem";
import data from "../../data.json";


class Game extends Component {
    // Setting the component's initial state
    state = {
        data,
        score: 0,
        highScore: 0,
        navMsgColor: 'correct',
        navMessage: 'You Guessed Correctly!',
        shuffled: this.shuffledata(),
        wasClicked:"",
        shake: false
    };

    componentDidMount=() =>{
      
        this.shuffledata(data)
        // this.setState({
        //     data: this.shuffledata(data)
        // })
    }

    shuffledata(data) {
        console.log("++++++++++")
        console.log(data)
        let i = data.length - 1
        while (i > 0) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = data[i]
            data[i] = data[j]
            data[j] = temp
            i--
        }
        return data
    }

checkClicked = (clickedElem) => {
    // creates a copy of the wasClicked array to modify it by value, and not by reference. wasClicked stores all previous clicked images
    const prevState = this.state.wasClicked.slice();

    // shuffles the images
    const shuffled = this.shuffledata();

    // tracks score
    let score = this.state.score;
    let highScore = this.state.highScore;

    // if the clicked item is not in wasClicked, then it hasn't been clicked and the score is increased
    if (!this.state.wasClicked.includes(clickedElem)) {
        // if score and highScore are the same, then there is a new highScore value
        if (score === highScore) {
            score++;
            highScore++;

            // if they are not equal, then only increase the score value
        } else {
            score++;
        }

        // adds the clicked item to wasClicked to track that it has been clicked
        prevState.push(clickedElem);
    }
    // handle item click
}


shuffled = event => {

    if (this.state.wasClicked.includes(clickedElem)) {
        let score = 0;
        return this.setState({
            data,
            score: 0,
            highScore: 0,
            navMsgColor: 'correct',
            navMessage: 'You Guessed Correctly!',
            shuffled: this.shuffledata(),
            wasClicked:"",
            shake: true
        });
    }

    // if this runs, then the same element has not been clicked twice and the score is increased
    this.setState({
        data,
        score: 0,
        highScore: 0,
        navMsgColor: 'correct',
        navMessage: 'You Guessed Correctly!',
        shuffled: this.shuffledata(),
        wasClicked:"",
        shake: false
    });

    // removes the green correct indicator on a successful click after .5s to re-render the class on each success
    return setTimeout(() => this.setState({ navMsgColor: '' }), 500);
}
// renders score to the navbar.
// passes the randomized state.allCharacters array to Container to create a Character component for each image.
// passes the this.checkClicked down to container to pass to each Character component to be used for the click event.
render() {
    const state = this.state;
    return (
        <div>
            <Navbar
                score={state.score}
                highScore={state.highScore}
                navMessage={state.navMessage}
                navMsgColor={state.navMsgColor}
            />
            <Header />
            <Clickitem
                shake={state.shake}
                characters={state.allCharacters}
                clickEvent={this.clickEvent}
            />
            <Footer />
        </div>
    );
}
}
export default Game;