import React from "react";
import Map from "./Map";

export default class MapComponent extends React.Component {
  state = {
    markersData: [{ latLng: { lat: -10.625259, lng: 142.530746 }, title: 1 }]
  };
  addMarker = () => {
    const { markersData } = this.state;
    const lastMarker = markersData[markersData.length - 1];

    this.setState({
      markersData: [
        ...markersData,
        {
          title: +lastMarker.title + 1,
          latLng: {
            lat: lastMarker.latLng.lat + 0.0001,
            lng: lastMarker.latLng.lng + 0.0001
          }
        }
      ]
    });
  };
  render() {
    const { markersData } = this.state;
    return (
      <div>
        <Map markersData={markersData} mapHeight={this.props.mapHeight} />
        {/* <button onClick={this.addMarker}>Add marker</button>
        <ul>
          Markers data:
          {markersData.map(marker => (
            <li key={marker.title}>
              {marker.title}, lat: {marker.latLng.lat}, lng: {marker.latLng.lng}
              ,
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}
