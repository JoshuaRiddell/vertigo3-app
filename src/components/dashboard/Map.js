import React from "react";
import L from "leaflet";

// const style = {
//   width: "100%",
//   height: "410px"
// };

class Map extends React.Component {
  state = {
    path: []
  };
  componentDidMount() {
    // create map
    this.map = L.map("map", { zoomControl: false }).setView(
      [-16.886647, 139.05126],
      12
    );
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20
    }).addTo(this.map);
    // add layer
    this.layer = L.layerGroup().addTo(this.map);
    this.updateMarkers(this.props.markersData);

    const pathData = [
      [-16.885394, 139.053434],
      [-16.872355, 139.048864],
      [-16.861054, 139.052021],
      [-16.85818, 139.06477],
      [-16.863576, 139.069434],
      [-16.863876, 139.079434],
      [-16.864976, 139.079999]
    ];

    for (let i = 0; i < pathData.length; i++) {
      setTimeout(() => {
        this.setState({ path: [...this.state.path, pathData[i]] });
      }, 3000 * i);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // check if data has changed
    // if (this.props.markersData !== markersData) {
    //   this.updateMarkers(this.props.markersData);
    // }
    if (prevState.path !== this.state.path) {
      this.updatePath();
    }
  }
  updateMarkers(markersData) {
    this.layer.clearLayers();
    markersData.forEach(marker => {
      L.marker(marker.latLng, { title: marker.title }).addTo(this.layer);
    });
  }

  updatePath() {
    this.layer.clearLayers();
    var customPolyline = L.Polyline.extend({
      options: {
        speed: "",
        bearing: ""
      }
    });

    var polyline = new customPolyline(this.state.path, {
      speed: "143",
      bearing: "38"
    });

    polyline.addTo(this.map);
  }

  render() {
    const { expandMap } = this.props;
    console.log(expandMap);
    return (
      <>
        {/* <div
          class="map-controller-wrapper"
          style={expandMap ? {} : { top: 100 }}
        >
          <span class="map-icon-wrap zoom-icon-wrapper">
            <img src="images/zoom-icon.svg" class="map-icon zoom-icon" />
          </span>
        </div> */}
        <div
          id="map"
          style={{ width: "100%", height: this.props.mapHeight + "px" }}
        />
      </>
    );
  }
}
export default Map;
