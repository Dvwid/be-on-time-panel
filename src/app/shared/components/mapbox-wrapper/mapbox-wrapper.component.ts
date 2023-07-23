import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {fromEvent, map, Subject} from "rxjs";

export interface LngLat {
  lng: number,
  lat: number
}

export interface GeocoderContext {
  id: string;
  mapbox_id: string;
  text: string;
}

export interface GeocoderResult {
  properties: any;
  center: [number, number];
  address: string;
  id: string;
  place_name: string;
  place_type: string[];
  text: string;
  context: GeocoderContext[];
}

@Component({
  selector: 'app-mapbox-wrapper',
  templateUrl: 'mapbox-wrapper.component.html',
  styleUrls: ['./mapbox-wrapper.component.scss']
})
export class MapboxWrapperComponent implements AfterViewInit {

  @Output() geocoderSelectResult = new Subject<GeocoderResult>();
  @Output() changePointerPosition = new Subject<LngLat>();
  @Output() deleteMarker = new EventEmitter();

  @Input() readonly: boolean;
  @Input() height = 270;
  @Input() lngLat: [number, number];

  @ViewChild('mapContainer') mapContainer: ElementRef;

  marker: mapboxgl.Marker;

  removeMarker() {
    this.marker.remove();
    this.marker = undefined;
    this.deleteMarker.emit();
  }

  constructor() {
  }

  ngAfterViewInit() {
    this.setMapboxToken();

    if (this.readonly) {
      this.initializePreviewMap();
      return;
    }

    this.initializeEditableMap();

  }

  private setMapboxToken() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGF3aWQ5NyIsImEiOiJjbDIzZWcybTgwMTFnM2NwczdkZmxwd29yIn0.Esvl7FuiZQipP7JMiaFTvw';
  }

  private initializePreviewMap() {
    const mapbox = new mapboxgl.Map({
      container: 'map-wrapper',
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 17,
      center: this.lngLat
    });

    this.marker = new mapboxgl.Marker({
      color: "#3f51b5",
      draggable: false,
    }).setLngLat(this.lngLat)
      .addTo(mapbox);
  }

  private initializeEditableMap() {
    const mapbox = new mapboxgl.Map({
      container: 'map-wrapper',
      style: 'mapbox://styles/mapbox/light-v11',
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

    const geocoderResult$ =
      fromEvent(geocoder, 'result')
        .pipe(
          map((event: any) => {
            return event.result;
          })
        );

    geocoderResult$
      .subscribe((result: GeocoderResult) => {
        if (this.marker) {
          this.marker.remove();
        }
        this.geocoderSelectResult.next(result);

        this.marker = new mapboxgl.Marker({
          color: "#3f51b5",
          draggable: false,
        }).setLngLat(result?.center)
          .addTo(mapbox);
      });
  }
}
