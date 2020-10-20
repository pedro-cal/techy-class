import React, {Component} from 'react';
import TagsInput from '../tags-input/tags-input';
import './students-list-style.css';

class StudentsList extends Component {
  constructor(props){
    super(props);
        
    this.state = {
      students: this.props.students,
      showSearchField: this.props.showSearchField,
      searchField: "",
      chosenClass: this.props.chosenClass      
    }    
  }

  getUpdatedStudents = (updatedStudents) => {
    this.setState({students: updatedStudents});
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
  }  */
  
  /* //* Temporary function that allows me to download changes to Students array as a JSON file 
  handleDownload = () => {
    const jsonData = this.state.students;
    const fileData = JSON.stringify(jsonData, null, 3);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'JSONDownloadTest.json';
    link.href = url;
    link.click();
  } */
  
  render(){
    const students = this.props.students;
    students.sort((a,b) => a.id - b.id);
    console.log(students);

    let filteredStudents = [];
    if (this.props.chosenClass !== "") {
      filteredStudents = students.filter(student => 
        student.Class.includes(this.props.chosenClass));
    } else {
      filteredStudents = students.filter(student => 
        student.Class.includes(this.state.searchField));
    }
    
    return(
      <div className="students-list">
        {/* INPUT BOX TO FILTER STUDENTS */}        
        <div className="class-filter-box">
          <label htmlFor="class-filter" className="basic-label">
            Filtre os alunos pelo número da turma:
          </label> <br/>
          <input 
            type="search" 
            id="class-filter"
            placeholder="Digite o número da turma"
            onChange={e => {
              this.setState({searchField: e.currentTarget.value});
            }}
          />
        </div>

       {/*  <div className="push-to-db" onClick={this.pushToDB}>
            <button type='button'>Push Students to DB</button>
          </div> */}
      
       {/*  <button type="button" 
        id="download-json"
        onClick={this.handleDownload}>Download JSON</button> */}

        {/* LIST OF STUDENTS CARDS */}
        <div className = "cards-list">          
          {students.map(student => (                     
            <div key={student.id} className = "card-box">
              <div className="card-row-main">
                <div className = "card-numbers">
                  <p className = "card-class">{student.Class}</p>
                  <p className = "card-student-number">#{student.Number}</p>
                </div>
                <div >
                  <img className="card-images" 
                  src={process.env.PUBLIC_URL + `/images/${student.Class}-${student.Number}.jpg`} 
                  alt=""/>
                </div>
                <div className = "card-names">
                  <h3>{student.FirstName}</h3>
                  <p className = "card-last-name">{student.LastName}</p>
                </div>         
              </div>
              <div className="card-row-tags">
                <TagsInput currentStudent={student} 
                students={this.state.students}
                updateStudents = {this.getUpdatedStudents}/>
              </div>                 
            </div>        
          ))}
        </div>
      </div>
    )
  }
}

export default StudentsList;