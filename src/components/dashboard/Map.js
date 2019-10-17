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
      [-23.895867, 152.3979],
      12
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
    this.updateMarkers(this.props.markersData);

    const pathData = [
      [-23.884649, 152.396449],
      [-23.876786, 152.399123],
      [-23.869305, 152.408525],
      [-23.869251, 152.425373],
      [-23.876931, 152.441712],
      [-23.894324, 152.447264],
      [-23.916778, 152.431235]
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
