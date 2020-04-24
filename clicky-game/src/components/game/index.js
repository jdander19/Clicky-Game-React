import React, { Component } from "react";
import navbar from "../navbar";
import header from "../header";
import footer from "../footer";
import clickitem from "../clickitem";
import data from "../../data.json";


class Game extends Component {
    // Setting the component's initial state
    state = {
        data,
        score: 0,
        topscore: 0,
    };

    componentDidMount() {
        this.setState({
            data: this.shuffledata(this.state.data)
        })
    }

    shuffledata(data) {
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


    checkClicked(clickedElem) {
        // creates a copy of the wasClicked array to modify it by value, and not by reference. wasClicked stores all previous clicked images
        const prevState = this.state.wasClicked.slice();

        // shuffles the images
        const shuffled = this.shuffleArray();

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



        handleFormSubmit = event => {
            // Preventing the default behavior of the form submit (which is to refresh the page)
            event.preventDefault();
            // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
            alert(`Hello ${this.state.firstName} ${this.state.lastName}`);
            this.setState({
                firstName: "",
                lastName: ""
            });
        };
        if (this.state.wasClicked.includes(clickedElem)) {
            let score = 0;
            return this.setState({
                score: score,
                highScore: highScore,
                navMsgColor: 'incorrect',
                navMessage: 'Incorrect guess!',
                allCharacters: shuffled,
                wasClicked: [],
                shake: true
            });
        }

        // if this runs, then the same element has not been clicked twice and the score is increased
        this.setState({
            score: score,
            highScore: highScore,
            navMsgColor: 'correct',
            navMessage: 'You Guessed Correctly!',
            allCharacters: shuffled,
            wasClicked: prevState,
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
                <navbar
                    score={state.score}
                    highScore={state.highScore}
                    navMessage={state.navMessage}
                    navMsgColor={state.navMsgColor}
                />
                <header />
                <clickitem
                    shake={state.shake}
                    characters={state.allCharacters}
                    clickEvent={this.clickEvent}
                />
                <footer />
            </div>
        );
    }
}
export default Form;