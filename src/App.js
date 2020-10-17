import React, { Component } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {auth, firestore, getUserRefFromDB} from './firebase/firebase.utils';
import './App.css';

//*IMPORTING COMPONENTS 
import Home from './pages/home/home';
import ClassList from './components/class-list/class-list';
import StudentsList from './components/students-list/students-list';
import Header from './components/header/header';
import ProjectsList from './components/projects-list/projects-list';
import LogIn from './pages/login/login';
import Enrollment from './pages/enrollment/enrollment';

/* //*IMPORTING JSON DATA 
import emcData2 from './sample-data/emcData2';

//*STORING STUDENTS DATA INTO AN ARRAY ADDING IDs 
var key = 0;
const studentsList = emcData2.map(student => {
  student.id = key;
  key++;
  student.Labels = [];  
  return student;
}); */

/* //*READING AND STORING THE AMOUNT OF CLASSES IN STUDENTS DATA INTO classes 
var classes = [];
function loadClasses(){
    emcData2.map(student => {
        if (!classes.includes(student.Class)) {
            classes.push(student.Class);
        }
        return classes;
    })
}
loadClasses(); */

//* DEFINING APP CLASS 
class App extends Component {
  constructor(){
    super();

    this.state = {
      students: [],
      classes: [],
      currentUser: null,
      userRole: null,
      showEnrollment: false    
    };    
  }

  toggleAuthMonitor = null;

  componentDidMount() {
        
    //* GETTING STUDENTS COLLECTION FROM FIRESTORE 
    firestore.collection('students')
      .get()
      .then(stdsSnapshot => {
        const dbStudents = [];
        stdsSnapshot.forEach(doc => {
          dbStudents.push(doc.data());          
        })
        this.setState({students: dbStudents})
      });

    //* listen to Auth changes 
    this.toggleAuthMonitor = auth.onAuthStateChanged(async signedUser => {      

      if (signedUser) {        
        //* 1) send signed user to DB (if it's not there) and get its ref 
        const userRef = await getUserRefFromDB(signedUser);

        //* 2) setState at currentUser as DB data on signedUser 
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => {this.setState({userRole: this.state.currentUser.userRole})})
        });
                
      } else {
        this.setState({currentUser: signedUser});
      }
    });
  }

  componentWillUnmount() {
    this.toggleAuthMonitor();
  } 

  render() {
    var state = this.state;   
    return (
      <div className="App">
        {state.currentUser !== null ?
          <Header currentUser={state.currentUser}/>
          :null
        }                          
        <div className = "main-container">
          { state.currentUser === null ? <LogIn /> : null}
          { state.userRole === '' && state.userRole !== null ? 
            <Enrollment currentUser={state.currentUser}/> : null
          }
          { state.userRole !== '' && state.userRole !== null ? 
            <Switch>
              <Route 
                exact path={process.env.PUBLIC_URL}
                render={() => (
                  this.state.currentUser !== null ?
                  <Redirect to="/home"/> :
                  <Redirect to ="/login" />
                )}
              />
              <Route 
                exact path="/login"
                component={LogIn}
              />
              <Route 
                exact path="/home"
                render={(props) => (
                  <Home {...state}/>
                )}
              />
              <Route 
                exact path="/classes"
                render={(props) => (
                  <ClassList {...state}/>
                )}
              />
              <Route 
                exact path="/students" 
                render={(props) => (
                  <StudentsList {...state} chosenClass={""}/>
                )}
              />
              <Route path="/projects" 
                render={(props) => (
                  <ProjectsList {...state}/>
                )}
              />                      
            </Switch> : null
          }                      
        </div>         
      </div>      
    )
  }
}

export default App;
