import React, { Component } from "react";
//import './AllTogetherExercise1Exercise.css';

/*
This exercise will help you put together and practice all of the concepts you've
learned thus far. It will also help you form a strong foundational knowledge of
React and prepare you for your first project.

The instructions for this project are located in the `README.md` file.

todo:
1. grey out button if form not filled +
2. change hide/show on the hide button +
3. success message box - green +
4. success message should disappear after few seconds +
5. players on the app should show no players if form not submitted +
6. display lower button only if form is submitted +
7. username is already in the system

*/
//TODO: manage styles in more "professional" way
let style;
class AllTogetherExercise1Exercise extends Component {
  state = {
    // variables for fname, lname, username,

    player: [],
    fname: "",
    lname: "",
    username: "",
    quantity: "",
    showGames: true,
    message: "",
    formSubmitted: false
  };

  onItemChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  userExists = username => {
    return this.state.player.some(function(el) {
      return el.username === username;
    });
  };

  showUserMessage = message => {
    this.setState(
      {
        message
      },
      () => {
        setTimeout(() => {
          this.setState({
            message: ""
          });
        }, 1000);
      }
    );
  };

  onHandleSubmit = event => {
    event.preventDefault();

    console.log("test", this.userExists(this.state.username));
    if (this.userExists(this.state.username)) {
      style = { backgroundColor: "red", color: "white" };
      this.showUserMessage("Username already exists!");
      //const callback = () => {}
      //this.setState(newState, callback)
    } else {
      style = { backgroundColor: "green", color: "white" };
      console.log(style);
      this.showUserMessage("Your form is submitted!");
      this.setState({
        player: [
          ...this.state.player,
          {
            firstname: this.state.fname,
            lastname: this.state.lname,
            username: this.state.username,
            quantity: this.state.quantity
          }
        ],
        fname: "",
        lname: "",
        username: "",
        quantity: "",
        formSubmitted: true
      });
    }
  };

  hideGames = event => {
    this.setState(prevState => {
      return {
        showGames: !prevState.showGames
      };
    });
  };

  render() {
    // console.log(this.state.fname);
    // console.log(this.state.quantity);

    // console.log(this.state.showGames);

    // want to show the message this way, but didn't work
    let displayMessage = this.state.showGames
      ? "Hide the Number of Games Played"
      : "Show the Number of Games Played";

    let displayMessage2 = this.state.formSubmitted
      ? "Players on the App"
      : "No Players Added to Our App";
    let buttonDisabled = true;
    if (
      this.state.fname &&
      this.state.lname &&
      this.state.username &&
      this.state.quantity
    ) {
      buttonDisabled = false;
    }

    return (
      <div>
        <h1>AllTogetherExercise1Exercise</h1>
        <h2>Add and List some players</h2>
        <div style={style}>{this.state.message}</div>
        <form onSubmit={this.onHandleSubmit}>
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Enter First Name"
            value={this.state.fname}
            onChange={this.onItemChange}
          />
          <br />
          <label for="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Enter Last Name"
            value={this.state.lname}
            onChange={this.onItemChange}
          />
          <br />
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter Username"
            value={this.state.username}
            onChange={this.onItemChange}
          />
          <br />
          <label for="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="100"
            onChange={this.onItemChange}
            value={this.state.quantity}
          />
          <br />
          <button type="submit" disabled={buttonDisabled}>
            Add Player
          </button>
        </form>

        <h2>{displayMessage2}</h2>

        {this.state.formSubmitted && (
          <button onClick={this.hideGames}>{displayMessage}</button>
        )}
        <ul>
          {this.state.player.map((user, id) => {
            const { firstname, quantity } = user;
            if (this.state.showGames) {
              return (
                <li key={id}>{`${firstname} played ${quantity} games`}</li>
              );
            } else {
              return <li key={id}>{`${firstname} played * games`}</li>;
            }
          })}
        </ul>
      </div>
    );
  }
}

export default AllTogetherExercise1Exercise;
