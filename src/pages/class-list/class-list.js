import React, {Component} from 'react';
import StudentsList from '../../components/students-list/students-list';
import './class-list-style.css';

import {FaUserAlt as StudentIcon} from 'react-icons/fa';

class ClassList extends Component {
    constructor(props){
        super(props);

        this.state = {
            classes: this.props.classes,
            students: this.props.students,
            filteredStudents: [],
            chosenClass: "",
            showStudents: false,
            showClassFilter: false
        }
    }

    defineClases = () => {
        let classes = [];
        const students = this.props.students;

        students.forEach(std => 
            !classes.includes(std.Class) ?
                classes.push(std.Class) :
                null
        );

        this.setState({classes: classes}, 
            () => console.log(this.state.classes)); 
    };

    storeFilteredStudents = () => {
        var stdsInClickedClass = [];
        
        this.state.students.map(student => {            
            if (student.Class === this.state.chosenClass) {
                stdsInClickedClass.push(student);
            } return stdsInClickedClass;
        }); return stdsInClickedClass
        
        // this.setState({filteredStudents: stdsInClickedClass});

                       
    };

    handleClassClick = (e) => {
        this.setState({chosenClass: e.currentTarget.firstChild.innerHTML},
        () => {
            var stdsInClickedClass = this.state.students.filter(student => {            
                if (student.Class === this.state.chosenClass) {
                    return student;
                } return stdsInClickedClass
            });
            console.log(stdsInClickedClass[0].Class)
            this.setState({filteredStudents: stdsInClickedClass}, () => 
            console.log("settei filteredStudents"));
            this.forceUpdate();
            });
    };

    render(){                
        const classes = this.props.classes;
        console.log(classes);
        const students = this.props.students;

        return(
            <div className="container">
                <div className="class-list">
                    Teste
                {classes.map((num,i) => {
                    let currentClass = num;
                    let totalStudents = 0;                    
                   return(                    
                    <div className="class-card" 
                        key={i}
                        onClick={this.handleClassClick}                   
                    >
                        <div className="class-number">
                            {currentClass}                            
                        </div>
                        <hr/>                        
                        <div className="total-students">
                            {students.forEach((std) => {
                                if (std.Class === currentClass){
                                    totalStudents++;
                                }
                            })}<StudentIcon size={12}/> {totalStudents}
                        </div>                 
                    </div>
                   )
                })}
                </div>
                <div className="child-components-box">
                    
                    {console.log("Post-click state.filteredStudents: "
                     + this.state.filteredStudents)}

                    {
                        this.state.chosenClass !== "" ?
                    <StudentsList students={this.state.students}
                        showClassFilter={this.state.showClassFilter}
                        chosenClass={this.state.chosenClass}/> : null
                    }
                        
                </div>
            </div>
        );
    }
}

export default ClassList;