import React from 'react';
import './projects-list.css';

import {FaPlus as AddIcon} from 'react-icons/fa';

class ProjectsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className="container">
                <div className="card-list">
                    <div className="card">
                        <span className="icon"><AddIcon /></span>
                        <p className="card-title">Add Project</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectsList;