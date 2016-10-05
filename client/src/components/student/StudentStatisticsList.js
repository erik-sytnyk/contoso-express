import React from 'react';
import _ from 'lodash';
import StudentStatisticsRow from './StudentStatisticsRow';

const StudentStatisticsList = ({statistics}) => {
    let id = 1; //for key
    
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Enrollment Date</th>
                    <th>Students</th>
                </tr>
            </thead>
            <tbody>
                {statistics.map(statistic =>
                    <StudentStatisticsRow key={id++} statistic={statistic} />
                )}
            </tbody>
        </table>
    );
};

StudentStatisticsList.propTypes = {
    statistics: React.PropTypes.array.isRequired
};

export default StudentStatisticsList;
