import React, { Component } from 'react';
import { Checkbox } from '@mui/material';

// import { firestore } from '../../firebase/firebase.utils';
import TagsInput from '../tags-input/tags-input';
import './students-list-style.css';

class StudentsList extends Component {
   constructor(props) {
      super(props);

      this.state = {
         students: [...this.props.students],
         selectedCards: [],
         showSearchField: this.props.showSearchField,
         searchField: "",
         chosenClass: this.props.chosenClass
      }
   }

   /* componentDidMount() {
    const studentRef = firestore.doc('students/0');
    studentRef.onSnapshot(doc => {
       let stdData = doc.data();
    })
   } */

   getUpdatedStudents = (updatedStudents) => {
      this.setState({ students: [...updatedStudents] });
   }

   handleSelectCard = (e, student) => {
      if (e.target.checked) {
         this.setState({ selectedCards: [...this.state.selectedCards, student] });
      } else {
         this.setState({
            selectedCards: this.state.selectedCards.filter((each) => each.id !== student.id)
         });
      }
   }

   render() {
      const { students } = this.state;
      students.sort((a, b) => a.id - b.id);

      let filteredStudents = [];
      if (this.props.chosenClass !== "") {
         filteredStudents = students.filter(student =>
            student.Class.includes(this.props.chosenClass));
      } else {
         filteredStudents = students.filter(student =>
            student.Class.includes(this.state.searchField));
      }

      return (
         <div className="students-list">

            <div className="menu-row-box">
               <div className="filter-box">
                  <label htmlFor="class-filter" className="basic-label">
                     Filtre os alunos pelo número da turma:
                  </label> <br />
                  <input
                     type="search"
                     id="class-filter"
                     placeholder="Digite o número da turma"
                     onChange={e => {
                        this.setState({ searchField: e.currentTarget.value });
                     }}
                  />
               </div>
            </div>

            <div className="cards-list">
               {filteredStudents.map(student => (
                  <div className="card-wrapper" key={`${student.Class}-${student.FullName}`}>
                     <div
                        key={student.id}
                        className="card-box"
                     >
                        <div className="card-row-main">
                           <div className="card-numbers">
                              <p className="card-class">{student.Class}</p>
                              <p className="card-student-number">#{student.Number}</p>
                           </div>
                           <div >
                              <img className="card-images"
                                 src={process.env.PUBLIC_URL + `/images/${student.Class}-${student.Number}.jpg`}
                                 alt="" />
                           </div>
                           <div className="card-names">
                              <h3>{student.FirstName}</h3>
                              <p className="card-last-name">{student.LastName}</p>
                           </div>
                        </div>
                        <div className="card-row-tags">
                           <TagsInput currentStudent={student}
                              students={this.state.students}
                              updateStudents={this.getUpdatedStudents} />
                        </div>
                     </div>
                     <div className="card-actions-box">
                        <span className="card-button-box">
                           <p>Select</p>
                           <Checkbox
                              size="small"
                              onClick={(e) => this.handleSelectCard(e, student)}
                           />
                        </span>
                     </div>
                  </ div>
               ))}
            </div>

         </div>
      )
   }
}

export default StudentsList;