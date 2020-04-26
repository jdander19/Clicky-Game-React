import React, { Component } from "react";
import Navbar from "../navbar/navbar";
import Header from "../header/header";
import Footer from "../footer/footer";
import Clickitem from "../clickitem/clickitem";
import data from ".././data/data.json";


class Game extends Component {
    // Setting the component's initial state
    state = {
        data,
        score: 0,
        highScore: 0,
        navMessage: "You win!"
    };
    // the component is loaded -> set the state to have the data be shuffled data
    componentDidMount = () => {
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

    // method we call on when the guess is correct
    handleCorrect = newData => {
        const { highScore, score } = this.state
        const newScore = score + 1
        const newHighScore = Math.max(newScore, highScore)
        /* lets update the state to reflect the correct answer (+1 for correct)
        we also want to reshuffle the data and update the high score
        */ 
       
        this.setState({
            data: this.shuffledata(newData),
            score: newScore,
            highScore: newHighScore
        })
    }
    // method we call on if the guess is wrong
    // all we need to do here is reset data
    handleIncorrect = data => {
        this.setState({
            data: this.resetData(data),
            score: 0
        })
    }
    
    handleItemClick = id => {
        let correct = false
        const newData = this.state.data.map(item => {
            const newItem = { item }
            if (newItem === id) {
                if (!newItem.clicked) {
                    newItem.clicked = true
                    correct = true
                }
            }
            return newItem
        })
        correct ? this.handleCorrect(newData) : this.handleIncorrect(newData)
    }
    render() {
        return (
            <div>
                <Navbar
                    score={this.state.score}
                    highScore={this.state.highScore}
                    navMessage={this.state.navMessage}
                    navMsgColor={this.state.navMsgColor}
                />
                <Header />
                {this.state.data.map(item => (
                <Clickitem
                    key={item.id}
                    id={item.id}
                    shake={!this.state.score && this.state.highScore}
                    handleClick={this.handleItemClick}
                    image={item.image}
                />
                ))}
                <Footer />
            </div>
        );
    }
}
export default Game;