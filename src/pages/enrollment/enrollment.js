import React from 'react';
import './enrollment.css';

import {firestore} from '../../firebase/firebase.utils';

class Enrollment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            enrollmentCode: "",
            currentUser: this.props.currentUser
        }        
    }
   
    handleChange = (e) => {
        this.setState({enrollmentCode: e.target.value},
            ()=>console.log(this.state.enrollmentCode));
    }

    handleSubmit = () => {
        const {enrollmentCode,currentUser} = this.state;
        const userRef = firestore.doc(`users/${currentUser.id}`);
        switch(enrollmentCode) {
            case 'emc2020901':
                //case 1
                userRef.update({                    
                    userRole: 'student',
                    school: 'EMC',
                    class: {year: '2020', classCode: '901'}
                })
                .then(() => console.log('User Successfully Enrolled!'))
                .catch(error => console.error(error));
                break;
            case 'emc2020902':
                //case 2
                userRef.update({                    
                    userRole: 'student',
                    school: 'EMC',
                    class: {year: '2020', classCode: '902'}
                })
                .then(() => console.log('User Successfully Enrolled!'))
                .catch(error => console.error(error));
                break;
            default: alert('Code is invalid!');
        }
    }

    render() {        
        return(
            <div className="enrollment-box">
                <h2 className="subtitle">Type your Enrollment Code:</h2>
                <div className="input-container">                                
                    <input 
                        type="text" 
                        name="enrollmentCode"
                        value={this.state.enrollmentCode}
                        onChange={this.handleChange}
                        className="enrollment-input"
                        placeholder="bla"
                    />
                    <label className="enrollment-label" htmlFor="email">your code</label>
                </div>
                <button 
                    type="button" 
                    className="submit-btn"
                    onClick={this.handleSubmit}
                > Submit Code</button>
            </div>
        )
    }
}

export default Enrollment;