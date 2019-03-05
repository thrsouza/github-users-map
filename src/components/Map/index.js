import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Creators as ModalActions } from '../../store/ducks/modal';

import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.scss';

class Map extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -23.319775,
      longitude: -51.166009,
      zoom: 16.3,
    },
  };

  static propTypes = {
    users: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          login: PropTypes.string,
          avatar: PropTypes.string,
          coordinates: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
          }),
        }),
      ),
    }).isRequired,
    showModal: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    window.addEventListener('resize', this.resize);
    this.resize();
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleMapClick = async (e) => {
    const [longitude, latitude] = e.lngLat;
    const { showModal } = this.props;

    showModal({ latitude, longitude });
  };

  render() {
    const { viewport: viewportState } = this.state;
    const { users } = this.props;

    return (
      <MapGL
        {...viewportState}
        onClick={this.handleMapClick}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxApiAccessToken="pk.eyJ1IjoidGhpYWdvZGVzb3V6YSIsImEiOiJjanN0a2g4djQxOTEwNDlyejJjN2pjZngwIn0.BkSEA_sxFp3K3A6KQ8VgYQ"
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {users.data.map(user => (
          <Marker
            key={user.id}
            latitude={user.coordinates.latitude}
            longitude={user.coordinates.longitude}
            onClick={this.handleMapClick}
            captureClick
          >
            <img src={user.avatar} className="user-point" alt="" />
          </Marker>
        ))}
      </MapGL>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(ModalActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
