import React from 'react';
import StudentsList from '../../components/students-list/students-list';

export const StudentsPage = (props) => {
    return (
        <StudentsList students={props.students} />
    );
}