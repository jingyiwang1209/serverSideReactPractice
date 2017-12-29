import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchUsers } from "../actions";

class UsersList extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUsers() {
        return this.props.users.map(user => {
            return <li key={user.id}>{user.name}</li>;
        });
    }
    render() {
        return (
            <div>
                list of users accessible to anyone:
                <ul>{this.renderUsers()}</ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('users', state.users)
    return {
        users: state.users
    };
}

export default connect(mapStateToProps, { fetchUsers })(UsersList);