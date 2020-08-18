import React, { Component } from 'react';
import ClassList from './components/class-list/class-list';
import StudentsList from './components/students-list/students-list';
import emcData2 from './sample-data/emcData2';
import './App.css';

//IMPORTING ICONS
import {FaGraduationCap as ClassesIcon} from 'react-icons/fa';
import {FaUserAlt as StudentsIcon} from 'react-icons/fa';
import {FaUsers as GroupsIcon} from 'react-icons/fa';

//STORING STUDENTS DATA INTO AN ARRAY ADDING IDs
var key = 0;
const studentsList = emcData2.map(student => {
  student.id = key;
  key++;
  student.Labels = [];  
  return student;
});

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

//DEFINING APP CLASS
class App extends Component {
  constructor(){
    super();

    this.state = {
      students: studentsList,
      classes: classes,
      showStudents: true,
      showClasses: false,
      showGroups: false
    };    
  }

  /* handleStudentsClick() {
    return (() => this.setState(state => {state.showStudents = !state.showStudents},
        console.log(this.state.showStudents)))        
  } */

  render() {
    return (
      <div className="App">
        <div className="header">
            <div className="main-menu">
                <div className="menu-box" 
                    onClick={() => 
                    this.setState(state => ({
                        showStudents: false,
                        showClasses: true,
                        showGroups: false}))
                    }>
                    <div className="icon-box"><ClassesIcon /></div>
                    <span className="menu-item">Classes</span>
                </div>
                
                <div className="menu-box" 
                    onClick={() => 
                    this.setState(state => ({
                        showStudents: true,
                        showClasses: false,
                        showGroups: false}))                        
                    }>
                <div className="icon-box"><StudentsIcon /></div>
                    <span className="menu-item">Students</span>
                </div>
                <div className="menu-box">
                <div className="icon-box"><GroupsIcon /></div>
                    <span className="menu-item">Groups</span>
                </div>                
            </div>
        </div>        
        <div className = "main-container">             
            {this.state.showClasses ? <ClassList classes={this.state.classes} 
            students={this.state.students}/> : null}
            
            {this.state.showStudents ? 
            <StudentsList students={this.state.students}
                showFilter={true}
                chosenClass={""}/> : null}
        </div>        
      </div>
      
    )
  }
}

export default App;
