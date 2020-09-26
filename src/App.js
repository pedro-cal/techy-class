import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import {auth, firestore, getUserRefFromDB} from './firebase/firebase.utils';
import './App.css';

//*IMPORTING COMPONENTS 
import Home from './pages/home/home';
import ClassList from './components/class-list/class-list';
import StudentsList from './components/students-list/students-list';
import Header from './components/header/header';
import ProjectsList from './components/projects-list/projects-list';
import LogIn from './pages/login/login';

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
      currentUser: null      
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
      console.log("Auth current user changed to: ");
      console.log(signedUser);

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
          })
        })
                
      } else {
        this.setState({currentUser: signedUser});
      }
    });
  }

  componentWillUnmount() {
    this.toggleAuthMonitor();
  }

  /* pushToDB = () => {
    let stds = this.state.students;
    
    try {
      stds.forEach(std => {
        firestore.doc(`students/${std.id}`).set({
          ...std
        })
      })      
    } catch (error) {
      console.error(error);
    }
  } */

  render() {
    var state = this.state;
    return (
      <div className="App">
        {state.currentUser !== null?
          <Header currentUser={this.state.currentUser}/>
          :null
        }                          
        <div className = "main-container">
          {/* <div className="push-to-db" onClick={this.pushToDB}>
            <button type='button'>Push Students to DB</button>
          </div> */}
          { state.currentUser ? 
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route 
                exact path="/classes"
                render={(props) => (
                  <ClassList {...state}/>
                )}
              />
              <Route path="/students" 
                render={(props) => (
                  <StudentsList {...state} chosenClass={""}/>
                )}
              />
              <Route path="/projects" 
                render={(props) => (
                  <ProjectsList {...state}/>
                )}
              />                      
            </Switch> : <LogIn />
          }                      
        </div>         
      </div>      
    )
  }
}

export default App;
