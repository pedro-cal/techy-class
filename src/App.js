import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

//*IMPORTING COMPONENTS AND CSS 
import ClassList from './components/class-list/class-list';
import StudentsList from './components/students-list/students-list';
import Header from './components/header/header';
import SignIn from './components/sign-in/sign-in';
import './App.css';

//*IMPORTING JSON DATA 
import emcData2 from './sample-data/emcData2';

//*STORING STUDENTS DATA INTO AN ARRAY ADDING IDs 
var key = 0;
const studentsList = emcData2.map(student => {
  student.id = key;
  key++;
  student.Labels = [];  
  return student;
});

//*READING AND STORING THE AMOUNT OF CLASSES IN STUDENTS DATA INTO classes 
var classes = [];
function loadClasses(){
    emcData2.map(student => {
        if (!classes.includes(student.Class)) {
            classes.push(student.Class);
        }
        return classes;
    })
}
loadClasses();

//* DEFINING APP CLASS 
class App extends Component {
  constructor(){
    super();

    this.state = {
      students: studentsList,
      classes: classes,
      currentUser: null      
    };    
  }

  render() {
    var state = this.state;
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser}/>
        <div className = "main-container">
          <Switch>
            <Route 
              exact path="/"
              render={(props) => (
                <ClassList {...state}/>
              )}
            />
            <Route path="/students" 
              render={(props) => (
                <StudentsList {...state}/>
              )}
            />
            <Route path="/sign-in" component={SignIn} />
          </Switch>            
        </div>        
      </div>      
    )
  }
}

export default App;
