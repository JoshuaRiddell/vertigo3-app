import React from "react";
import L from "leaflet";
import gpsTrackData from "../../data-sets/gpsTrackData";
import { connect } from "react-redux";
import {
  setMapStateSnapshot,
  setMapZoomLevel,
  setViewPosition
} from "../../actions/mapActions";
import CurrentLocationIcon from "../../helpers/CurrentLocationIcon";

import openSocket from "socket.io-client";

const basePath = process.env.REACT_APP_API_BASE_PATH;
const socket = openSocket(`${basePath}/surface/gps`).connect();

class Map extends React.Component {
  state = {
    timeoutId: "",
    viewResetId: "",
    followPath: true
  };
  componentDidMount() {
    const {
      mapState: { zoomLevel, viewPosition }
    } = this.props;
    // create map
    this.map = L.map("map", { zoomControl: false, maxZoom: 18 }).setView(
      viewPosition,
      zoomLevel
    );
    //normal view
    //http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
    //sat view:
    //http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
    L.tileLayer(
      "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 20
      }
    ).addTo(this.map);
    // add layer
    this.layer = L.layerGroup().addTo(this.map);

    this.updatePath();

    this.map.on("moveend", this.mapMove);
    this.map.on("zoomend", this.mapZoom);

    socket.on("json", (coordinates) => {
      const { mapState } = this.props;
      const { path, pathIndex } = mapState;

      if (coordinates && coordinates.length) {
        this.props.setMapStateSnapshot({
          path: [...path, coordinates],
          pathIndex: pathIndex + 1
        });
      }
    });
  }

  mapMove = (e) => {
    const position = this.map.getCenter();
    this.props.setViewPosition(Object.values(position));
  };
  mapZoom = (e) => {
    const zoomLevel = this.map.getZoom();
    this.props.setMapZoomLevel(zoomLevel);
  };

  viewFollowPath = (userAction) => {
    const {
      mapState: { trackData }
    } = this.props;
    const { followPath } = this.state;

    if (trackData.features.length) {
      const lastFeature = trackData.features[trackData.features.length - 1];
      this.map.fitBounds(lastFeature.properties.bounds_calculated);

      if (!followPath && userAction) {
        this.setState({ followPath: true });
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { mapState } = this.props;
    const { path, trackData } = mapState;

    if (prevProps.mapState && prevProps.mapState.path.length !== path.length) {
      this.drawGpsData();
    }

    if (
      prevProps.mapState &&
      prevProps.mapState.trackData.features.length !== trackData.features.length
    ) {
      this.updatePath();
    }
  }

  componentWillUnmount() {
    socket.removeAllListeners();
  }

  updateMarkers(markersData) {
    this.layer.clearLayers();
    markersData.forEach((marker) => {
      L.marker(marker.latLng, { title: marker.title }).addTo(this.layer);
    });
  }

  drawGpsData = async () => {
    const { mapState } = this.props;
    const { pathIndex, path, trackData } = mapState;

    if (path.length > 1 && path[pathIndex - 1]) {
      //update the features key with the updated coordinates
      //we need two sets of coordinates eg [lat, lng] + [lat, lng] to be able to draw line between them.
      const [lat1, lng1] = path[pathIndex - 2];
      const [lat2, lng2] = path[pathIndex - 1];

      const updatedPath = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [lng1, lat1],
            [lng2, lat2]
          ]
        },
        properties: { speed: pathIndex }
      };

      this.props.setMapStateSnapshot({
        trackData: {
          ...trackData,
          features: [...trackData.features, updatedPath]
        }
      });
    }
  };

  updatePath() {
    const {
      mapState: { path, trackData }
    } = this.props;

    const { followPath } = this.state;
    this.layer.clearLayers();

    if (trackData && Object.keys(trackData).length) {
      L.geoJson(trackData, {
        style: this.style,
        onEachFeature: function (feature, layer) {
          // assign bounds to feature
          feature.properties.bounds_calculated = layer.getBounds();
        }
      }).addTo(this.layer);

      followPath && this.viewFollowPath();
    }
  }

  getColor = (speed) => {
    return speed > 150
      ? "#d94b38"
      : speed > 100
      ? "#d9a238"
      : speed > 50
      ? "#9c27b0"
      : "#e91e63";
  };

  style = (feature) => {
    return {
      weight: 5,
      opacity: 1,
      color: this.getColor(feature.properties.speed)
    };
  };
  render() {
    const { expandMap } = this.props;
    const { followPath } = this.state;
    return (
      <>
        <div className="map-controller-wrapper">
          <CurrentLocationIcon
            active={followPath}
            handler={this.viewFollowPath}
          />
        </div>
        <div
          id="map"
          onTouchStart={() => this.setState({ followPath: false })}
          style={{ width: "100%", height: this.props.mapHeight + "px" }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mapState: state.mapState
  };
};
export default connect(mapStateToProps, {
  setMapStateSnapshot,
  setMapZoomLevel,
  setViewPosition
})(Map);
