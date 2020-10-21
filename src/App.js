import React, { Component } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {auth, firestore, getUserRefFromDB} from './firebase/firebase.utils';
import './App.css';

//*IMPORTING COMPONENTS 
import Home from './pages/home/home';
import ClassList from './components/class-list/class-list';
import {StudentsPage} from './pages/students/students-page';
import {Header} from './components/header/header';
import ProjectsList from './components/projects-list/projects-list';
import {LogIn} from './pages/login/login';
import Enrollment from './pages/enrollment/enrollment';
import { Dashboard } from './components/dashboard/dashboard';

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
          }, () => {
            this.setState({userRole: this.state.currentUser.userRole});            
          })
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
    let {currentUser,userRole} = this.state;
    let state = this.state;
    return (
      <div className="App">
        {currentUser !== null ?        
          <Header currentUser={currentUser}/>
          : null
        }

        <div className = "main-container">          
          {userRole === '' && userRole !== null ? 
            <Enrollment currentUser={currentUser}/> : null
          }
          
          <Switch>            
            <Route 
              exact path="/login"              
              component={LogIn}
              render={props => currentUser ? <Redirect to="/home"/> : null}
            />
            <Route 
              exact path="/home"
              render={(props) => (
                <Dashboard {...state}/>
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
                <StudentsPage {...state} chosenClass={""}/>
              )}
            />
            <Route path="/projects" 
              render={(props) => (
                <ProjectsList {...state}/>
              )}
            />                      
          </Switch>
                                
        </div>         
      </div>      
    )
  }
}

export default App;
