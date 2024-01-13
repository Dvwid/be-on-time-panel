import {Injectable} from '@angular/core';
import {AjaxService} from "../../core/ajax.service";
import {Observable} from "rxjs";
import {ImageDto} from "../../core/dtos/ImageDto";
import {PageInfoDto} from "../../core/dtos/PageInfoDto";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  #baseUrl = 'images';

  constructor(private _ajaxService: AjaxService) {
  }

  uploadImage(file: File): Observable<ImageDto> {
    return this._ajaxService.postFileStream(`${this.#baseUrl}`, file);
  }

  getImages(pagination: PageInfoDto): Observable<ImageDto[]> {
    return this._ajaxService.doGet(`${this.#baseUrl}`, pagination);
  }

  getImage(id: string): Observable<ImageDto> {
    return this._ajaxService.doGet(`${this.#baseUrl}/${id}`);
  }
}
