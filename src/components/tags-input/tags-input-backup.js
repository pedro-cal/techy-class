import React, { Component } from 'react';
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

    handleInputChange = (e) => {
        this.setState({tagsInputValue: e.currentTarget.value});
    }

    resetInput = () => {
        this.setState({tagsInputValue: ""});
    }

    sendUpdatedStudents = () => {
        this.props.updateStudents(this.state.students);
    }

    addTag = (e) => {
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
    }

    handleKeyPress = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            this.addTag();
        }
    }

    removeTag = (i) => {
        let students = this.state.students;
        let newTags = [...this.state.tagsArray];
        newTags.splice(i,1);
        this.setState({tagsArray: newTags},
            () => {
                students.map(std => {
                    if(std.id === this.state.studentId){
                        std.Labels = this.state.tagsArray;
                    } return students
                });
                this.sendUpdatedStudents();
            });        
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