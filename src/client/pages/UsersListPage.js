import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";
import { Helmet } from "react-helmet";

class UsersList extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUsers() {
        return this.props.users.map(user => {
            return <li key={user.id}>{user.name}</li>;
        });
    }

    applyReactHelmet() {
        return (
            <Helmet>
                <title>{`${this.props.users.length} users loaded`} </title>
                <meta name="og:title" content="Users App using react-helmet" />
            </Helmet>
        );
    }
    render() {
        return (
            <div>
                {this.applyReactHelmet()}
                list of users accessible to anyone:
                <ul>{this.renderUsers()}</ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // console.log('users', state.users)
    return {
        users: state.users
    };
}

function loadData(store) {
    return store.dispatch(fetchUsers());
}

export default {
    loadData,
    component: connect(mapStateToProps, { fetchUsers })(UsersList)
};