import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {fromEvent, map} from "rxjs";

interface GeocoderResult {
  center: [number, number];
}

@Component({
  selector: 'app-google-map-wrapper',
  templateUrl: 'google-map-wrapper.component.html',
  styleUrls: ['./google-map-wrapper.component.scss']
})
export class GoogleMapWrapperComponent implements AfterViewInit {

  @ViewChild('mapContainer') mapContainer: ElementRef;

  marker: mapboxgl.Marker;


  constructor() {
  }

  ngAfterViewInit() {
    this.setMapboxToken();

    const mapbox = new mapboxgl.Map({
      container: 'map-wrapper',
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 12,
      center: [19.0444, 49.8225]
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(mapbox));

    const mapClick$ = fromEvent(mapbox, 'click').pipe(
      map((event: any) => {
        return event.lngLat;
      })
    );

    mapClick$.subscribe((lngLat) => {
      if (this.marker) {
        this.marker.remove();
      }

      this.marker = new mapboxgl.Marker({
        color: "#3f51b5",
        draggable: false,
      }).setLngLat(lngLat)
        .addTo(mapbox);
    });

    const geocoderResult$ = fromEvent(geocoder, 'result').pipe(
      map((event: any) => {
        return event.result;
      })
    );

    geocoderResult$.subscribe((result: GeocoderResult) => {
      if (this.marker) {
        this.marker.remove();
      }

      this.marker = new mapboxgl.Marker({
        color: "#3f51b5",
        draggable: false,
      }).setLngLat(result?.center)
        .addTo(mapbox);
    });
  }

  private setMapboxToken() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGF3aWQ5NyIsImEiOiJjbDIzZWcybTgwMTFnM2NwczdkZmxwd29yIn0.Esvl7FuiZQipP7JMiaFTvw';
  }
}
