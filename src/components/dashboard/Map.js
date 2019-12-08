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

    //path to follow
    const customPolyline = L.Polyline.extend({});

    const polyline = new customPolyline(gpsTrackData, {
      color: "#fee60f",
      dashArray: 10,
      dashOffset: 50
    });

    polyline.addTo(this.map);

    this.layer = L.layerGroup().addTo(this.map);
    //this.updateMarkers(this.props.markersData);

    this.drawGpsData();
    this.updatePath();

    //event handlers
    // this.map.on("zoomstart", this.zoomStart);
    // this.map.on("movestart", this.moveStart);

    this.map.on("moveend", this.mapMove);
    this.map.on("zoomend", this.mapZoom);
  }
  // zoomStart = (e) => {
  //   const { followPath } = this.state;
  //   if(followPath){
  //     this.setState({ followPath: false });
  //   }
  // }
  // moveStart = (e) => {
  //   const { followPath } = this.state;
  //   if(followPath){
  //     this.setState({ followPath: false });
  //   }
  // }
  mapMove = e => {
    const position = this.map.getCenter();
    this.props.setViewPosition(Object.values(position));
  };
  mapZoom = e => {
    const zoomLevel = this.map.getZoom();
    this.props.setMapZoomLevel(zoomLevel);
  };

  viewFollowPath = userAction => {
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

    if (
      prevProps.mapState &&
      prevProps.mapState.trackData.features.length !== trackData.features.length
    ) {
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
    const {
      mapState: { path, trackData }
    } = this.props;

    return new Promise(resolve => {
      this.setState({
        timeoutId: setTimeout(() => {
          if (pathData[i + 1]) {
            //update the features key with the updated coordinates
            const [lat1, lng1] = pathData[i];
            const [lat2, lng2] = pathData[i + 1];

            const updatedPath = {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: [
                  [lng1, lat1],
                  [lng2, lat2]
                ]
              },
              properties: { speed: i }
            };

            this.props.setMapStateSnapshot({
              trackData: {
                ...trackData,
                features: [...trackData.features, updatedPath]
              },
              path: [...path, pathData[i]],
              pathIndex: i
            });
          }
          resolve(clearTimeout(this.state.timeoutId));
        }, 2000)
      });
    });
  };

  updatePath() {
    const {
      mapState: { path, trackData }
    } = this.props;

    const { followPath } = this.state;
    this.layer.clearLayers();
    // const customPolyline = L.Polyline.extend({
    //   options: {
    //     speed: "",
    //     bearing: ""
    //   }
    // });

    // const polyline = new customPolyline(mapState.path, {
    //   speed: "143",
    //   bearing: "38",
    //   color: "#ff0000"
    // });

    // polyline.addTo(this.map);

    // var myRenderer = L.canvas({ padding: 0.5 });
    // const currentPosition = mapState.path[mapState.path.length - 1] || [];

    // if (currentPosition.length) {
    //   var circleMarker = L.circleMarker(currentPosition, {
    //     // renderer: myRenderer,
    //     color: "#ffeb3b",
    //     fillOpacity: 1
    //   }).addTo(this.map);
    // }

    if (trackData && Object.keys(trackData).length) {
      L.geoJson(trackData, {
        style: this.style,
        onEachFeature: function(feature, layer) {
          // assign bounds to feature
          feature.properties.bounds_calculated = layer.getBounds();
        }
      }).addTo(this.layer);

      followPath && this.viewFollowPath();
    }
  }

  getColor = speed => {
    return speed > 150
      ? "#d94b38"
      : speed > 100
      ? "#d9a238"
      : speed > 50
      ? "#9c27b0"
      : "#e91e63";
  };

  style = feature => {
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
