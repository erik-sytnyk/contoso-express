import * as React from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Pagination} from 'react-bootstrap';
import StudentsList from './student/StudentsList';
import * as studentActions from '../actions/studentActions';
import StudentSave from './student/StudentSave';
import StudentDetails from './student/StudentDetails';
import StudentDelete from './student/StudentDelete';
import StudentSearch from './student/StudentSearch';

class StudentsPage extends React.Component<any, any> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            students: props.students,
            search: '',
            sortOrder: 'name',
            saveModalVisible: false,
            detailsModalVisible: false,
            confirmationVisible: false,
            activePage: 1,
            totalCount: props.totalCount,
            pageSize: 3
        };

        this.changeSearchState = this.changeSearchState.bind(this);
        this.searchStudents = this.searchStudents.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.showSaveModal = this.showSaveModal.bind(this);
        this.closeSaveModal = this.closeSaveModal.bind(this);
        this.showDetailsModal = this.showDetailsModal.bind(this);
        this.closeDetailsModal = this.closeDetailsModal.bind(this);
        this.showConfirmationModal = this.showConfirmationModal.bind(this);
        this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
        this.pageSelection = this.pageSelection.bind(this);
        this.changeSortOrder = this.changeSortOrder.bind(this);
    }

    componentWillMount() {
        this.props.actions.loadStudents(this.state.search, this.state.sortOrder, this.state.activePage, this.state.pageSize);
    }

    changeSearchState(event) {
        return this.setState({search: event.target.value});
    }

    searchStudents() {
        this.props.actions.loadStudents(this.state.search, this.state.sortOrder, this.state.activePage, this.state.pageSize);
    }

    handleKeyPress(target) {
        if (target.charCode === 13) {
            this.searchStudents();
        }
    }

    showSaveModal(studentId) {
        this.props.actions.loadStudent(studentId)
            .then(() => {
                this.setState({saveModalVisible: true});
            });
    }

    closeSaveModal() {
        this.setState({saveModalVisible: false});
    }

    showDetailsModal(studentId) {
        this.props.actions.loadStudent(studentId)
            .then(() => {
                this.setState({detailsModalVisible: true});
            });
    }

    closeDetailsModal() {
        this.setState({detailsModalVisible: false});
    }

    showConfirmationModal(studentId) {
        this.props.actions.loadStudent(studentId)
            .then(() => {
                this.setState({confirmationVisible: true});
            });
    }

    closeConfirmationModal() {
        this.setState({confirmationVisible: false});
    }

    pageSelection(eventKey) {
        this.setState({
            activePage: eventKey
        });

        this.props.actions.loadStudents(this.state.search, this.state.sortOrder, eventKey, this.state.pageSize);
    }

    changeSortOrder(event) {
        let sortOrder = event.target.value;
        let newSortOrder = '';

        switch (sortOrder) {
            case 'name':
                newSortOrder = this.state.sortOrder === 'name' ? 'name_desc' : 'name';
                break;
            case 'date':
                newSortOrder = this.state.sortOrder === 'date' ? 'date_desc' : 'date';
                break;
        }

        this.setState({sortOrder: newSortOrder});

        this.props.actions.loadStudents(this.state.search, newSortOrder, this.state.activePage, this.state.pageSize);
    }

    render() {
        let numberOfPages = Math.ceil(this.props.totalCount / this.state.pageSize);
        let showTable = _.isEmpty(this.props.students) ? {display: 'none'} : {};

        return (
            <div className="container">
                <h2>Students</h2>
                <a href="#" onClick={this.showSaveModal}>Create New</a>

                <StudentSearch search={this.state.search}
                               onChange={this.changeSearchState}
                               onKeyPress={this.handleKeyPress}
                               onClick={this.searchStudents}
                />

                <StudentsList students={this.props.students}
                              onSortClick={this.changeSortOrder}
                              onSaveClick={this.showSaveModal}
                              onDetailsClick={this.showDetailsModal}
                              onDeleteClick={this.showConfirmationModal}
                />

                <br/>
                <div style={showTable}>Page {this.state.activePage} of {numberOfPages}</div>

                <Pagination
                    bsSize="medium"
                    first
                    last
                    ellipsis
                    maxButtons={5}
                    items={numberOfPages}
                    activePage={this.state.activePage}
                    onSelect={this.pageSelection}
                    style={showTable}
                />

                <StudentSave visible={this.state.saveModalVisible}
                             close={this.closeSaveModal}
                />

                <StudentDetails visible={this.state.detailsModalVisible}
                                close={this.closeDetailsModal}
                />

                <StudentDelete visible={this.state.confirmationVisible}
                                  close={this.closeConfirmationModal}
                />
            </div>
        );
    }
}

(StudentsPage as any).propTypes = {
    students: React.PropTypes.array.isRequired,
    totalCount: React.PropTypes.number.isRequired,
    actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        students: state.student.list,
        totalCount: state.student.totalCount
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: (bindActionCreators as any)(studentActions, dispatch),
        loadStudents: () => studentActions.loadStudents('', '', 1, 3)(dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsPage);