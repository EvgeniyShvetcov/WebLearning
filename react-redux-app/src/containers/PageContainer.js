import React from 'react';
import { Page } from '../components/Page';
import { getPhotos } from '../actions/PageActions';
import { connect } from 'react-redux';

const PageContainer = ({ page, getPhotosAction }) => {
	return <Page {...page} getPhotos={getPhotosAction} />;
};

//Mapping reducers state to React component props
const mapStateToProps = store => {
	return {
		page: store.page,
	};
};

//Mapping actions to React component props
const mapDispatchToProps = dispatch => {
	return {
		getPhotosAction: year => dispatch(getPhotos(year)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PageContainer);
