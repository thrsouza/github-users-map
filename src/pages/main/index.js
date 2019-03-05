import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import SideBar from '../../components/SideBar';
import UserModal from '../../components/UserModal';
import Map from '../../components/Map';

const Main = ({ result }) => {
  if (result && result.error) {
    toast.error(result.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  } else if (result) {
    toast.success(result.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  return (
    <Fragment>
      <Map />
      <SideBar />
      <UserModal />
    </Fragment>
  );
};

Main.propTypes = {
  result: PropTypes.shape({}),
};

Main.defaultProps = { result: null };

const mapStateToProps = state => ({
  result: state.users.result,
});

export default connect(mapStateToProps)(Main);
