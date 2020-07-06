import React from "react";
import L from "leaflet";
import gpsTrackData from "../../data-sets/gpsTrackData";
import { connect } from "react-redux";
import {
  setMapStateSnapshot,
  setMapZoomLevel,
  setViewPosition
} from "../../actions/mapActions";

class Map extends React.Component {
  state = {
    timeoutId: ""
  };
  componentDidMount() {
    const {
      mapState: { zoomLevel, viewPosition }
    } = this.props;
    // create map
    this.map = L.map("map", {
      zoomControl: false,
      minZoom: 0,
      maxZoom: 22,
      maxNativeZoom: 18
    }).setView(
      viewPosition,
      zoomLevel
    );
    //normal view
    //http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
    //sat view:
    //http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
    L.tileLayer(
      "http://192.168.0.101/tiles/{z}/{y}/{x}.png",
      {
        minZoom: 0,
        maxZoom: 22,
        maxNativeZoom: 18
      }
    ).addTo(this.map);
    // add layer

    //path to follow
    const customPolyline = L.Polyline.extend({
      options: {
        speed: "",
        bearing: ""
      }
    });

    const polyline = new customPolyline(gpsTrackData, {
      speed: "143",
      bearing: "38",
      color: "#fee60f",
      dashArray: 10,
      dashOffset: 50
    });

    polyline.addTo(this.map);

    this.layer = L.layerGroup().addTo(this.map);
    //this.updateMarkers(this.props.markersData);

    this.drawGpsData();
    this.updatePath();

    this.map.on("moveend", this.mapMove);
    this.map.on("zoomend", this.mapZoom);
  }

  mapMove = e => {
    const position = this.map.getCenter();
    this.props.setViewPosition(Object.values(position));
  };
  mapZoom = e => {
    const zoomLevel = this.map.getZoom();
    this.props.setMapZoomLevel(zoomLevel);
  };
  componentDidUpdate(prevProps, prevState) {
    const { mapState } = this.props;
    const { path } = mapState;

    if (prevProps.mapState && prevProps.mapState.path.length !== path.length) {
      this.updatePath();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
  }

  updateMarkers(markersData) {
    this.layer.clearLayers();
    markersData.forEach(marker => {
      L.marker(marker.latLng, { title: marker.title }).addTo(this.layer);
    });
  }

  drawGpsData = async () => {
    const { mapState } = this.props;
    const { pathIndex } = mapState;
    const pathData = gpsTrackData;

    for (let i = pathIndex; i < pathData.length; i++) {
      await this.pathPromise(i, pathData);
    }
  };

  pathPromise = (i, pathData) => {
    const { mapState } = this.props;
    return new Promise(resolve => {
      this.setState({
        timeoutId: setTimeout(() => {
          this.props.setMapStateSnapshot({
            path: [...mapState.path, pathData[i]],
            pathIndex: i
          });
          resolve(clearTimeout(this.state.timeoutId));
        }, 2000)
      });
    });
  };

  updatePath() {
    const { mapState } = this.props;
    this.layer.clearLayers();
    const customPolyline = L.Polyline.extend({
      options: {
        speed: "",
        bearing: ""
      }
    });

    const polyline = new customPolyline(mapState.path, {
      speed: "143",
      bearing: "38",
      color: "#ff0000"
    });

    polyline.addTo(this.map);
  }

  render() {
    const { expandMap } = this.props;

    return (
      <>
        <div
          id="map"
          style={{ width: "100%", height: this.props.mapHeight + "px" }}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    mapState: state.mapState
  };
};
export default connect(mapStateToProps, {
  setMapStateSnapshot,
  setMapZoomLevel,
  setViewPosition
})(Map);
