import React from 'react';
import {connect} from 'react-redux';
import {follow,
 		 setCurrentPage, 
 		 unFollow, 
 		 toggleFollowingProgress,
 		 getUsers} from '../../redux/users-reducer.js';
import * as axios from 'axios';
import Users from './Users.jsx';
import Preloader from '../common/Preloader/Preloader.js';
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect.js';
import {compose} from 'redux';


class UsersContainer extends React.Component {

componentDidMount() {
	this.props.getUsers(this.props.currentPage, this.props.pageSize);
}

	onPageChanged = (pageNumber) => {
			this.props.getUsers(pageNumber, this.props.pageSize);
	}

	render() {
		return <>
		{this.props.isFetching ? <Preloader /> : null}
				<Users totalUsersCount={this.props.totalUsersCount} 
						  pageSize={this.props.pageSize} 
						  currentPage={this.props.currentPage}
						  onPageChanged={this.onPageChanged} 
						  users={this.props.users}
						  follow={this.props.follow}
						  unFollow={this.props.unFollow} 
						  toggleFollowingProgress={this.props.toggleFollowingProgress}
						  followingInProgress={this.props.followingInProgress} /></>
	}
}


let mapStateToProps = (state) => {
	return{
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
		followingInProgress: state.usersPage.followingInProgress
	}
}


// export default WithAuthRedirect(connect(mapStateToProps, {follow, unFollow, setCurrentPage, toggleFollowingProgress, getUsers})(UsersContainer))

export default compose(
		WithAuthRedirect,
		connect(mapStateToProps, {follow, unFollow, setCurrentPage, toggleFollowingProgress, getUsers})
	)(UsersContainer)