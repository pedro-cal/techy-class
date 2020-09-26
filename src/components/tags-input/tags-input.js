import React, { Component } from 'react';
import {firestore} from '../../firebase/firebase.utils';
import {MdCancel as DeleteIcon} from 'react-icons/md';
import "./tags-input-style.css";

class TagsInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tagsInputValue: "test results",
            tagsArray: this.props.currentStudent.Labels,
            students: this.props.students,
            studentId: this.props.currentStudent.id,
        }
    }
    
    componentDidMount() {
        let {studentId} = this.state;
        let studentRef = firestore.doc(`students/${studentId}`);
        studentRef.onSnapshot(doc => {
            let std = doc.data();
            this.setState({tagsArray: std.Labels});
        })
    }

    handleInputChange = (e) => {
        this.setState({tagsInputValue: e.currentTarget.value});
   }

/* 
    sendUpdatedStudents = () => {
        this.props.updateStudents(this.state.students);
    } */

  /*   addTag = (e) => {
        let students = this.state.students;
        let currentStdId = this.state.studentId;
        let currentTags = this.state.tagsArray;
        let inputTag = this.state.tagsInputValue;
        
        this.setState({tagsArray: [...currentTags, inputTag]},
            () => {
                students.map(std => {
                    if (std.id === currentStdId) {
                        std.Labels = this.state.tagsArray;
                    } return students
                });
                this.sendUpdatedStudents();                
            });
        this.tagsInput.value = null;
    } */

    pushTagToDB = (e) => {
        let {studentId, tagsInputValue, tagsArray} = this.state;
        let studentRef = firestore.doc(`students/${studentId}`);
        studentRef.update({
            Labels: [...tagsArray ,tagsInputValue]
        })
        .then()
        .catch(error => console.error(error));
    }

    handleKeyPress = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            this.pushTagToDB();
            this.tagsInput.value = null;
        }
    }

    removeTag = (i) => {
        let {studentId} = this.state;
        let newTags = [...this.state.tagsArray];
        newTags.splice(i,1);

        let studentRef = firestore.doc(`students/${studentId}`);        
        studentRef.update({Labels: newTags});         
    }

    render(){
        let tagsArray = this.state.tagsArray;        
        return(
            <div className="tags-input-box">                
                <input type="search"
                className="tags-input"
                placeholder="Press 'Enter' to add tags"
                ref={c => { this.tagsInput = c}}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyPress}/>
                <div className="tags-box">
                    {tagsArray.map((tag,i) => (
                        <div className="tag" key={i}>{tag}
                        <span className="tag-delete"
                        onClick={() => this.removeTag(i)}> 
                            <DeleteIcon className="tag-delete-icon"/>
                        </span>
                    </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default TagsInput;