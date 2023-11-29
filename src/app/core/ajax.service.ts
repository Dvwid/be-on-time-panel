import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map, Observable} from "rxjs";
import {ExceptionService} from "./exception.service";
import {convertObjectToParams} from "./utilities";

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  private readonly baseApiUrl: string = 'https://be-on-time-69912afc73d0.herokuapp.com/api/';
  // private readonly baseApiUrl = 'http://localhost:3333/api/';

  constructor(private http: HttpClient,
              private exceptionService: ExceptionService) {
  }

  private static assertSuccess<T>(res: any): any {
    if (!res) {
      return [];
    }
    return res;
  }

  doPost<T>(urlPath: string, data: any = {}): Observable<T> {
    return this.http
      .post(this.baseApiUrl + urlPath, data)
      .pipe(
        map(AjaxService.assertSuccess),
        map(d => d as T),
        catchError(this.exceptionService.handleError)
      );
  }

  postFileStream(url: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('files', file);

    return this.http
      .post<string>(this.baseApiUrl + url, formData)
      .pipe(
        catchError(this.exceptionService.handleError)
      );
  }

  doPut<T>(urlPath: string, data: any = {}): Observable<T> {
    return this.http
      .put(this.baseApiUrl + urlPath, data, this.buildRequestOptions())
      .pipe(
        map(AjaxService.assertSuccess),
        map(d => d as T),
        catchError(this.exceptionService.handleError)
      );
  }

  doGet<T>(url: string, urlParams?: Object): Observable<T> {
    const httpParams = convertObjectToParams(urlParams);

    return this.http
      .get(this.baseApiUrl + url, this.buildRequestOptions(httpParams))
      .pipe(
        map(AjaxService.assertSuccess),
        map(d => d as T),
        catchError(this.exceptionService.handleError)
      );
  }

  doDelete<T>(url: string): Observable<T> {
    return this.http
      .delete(this.baseApiUrl + url, this.buildRequestOptions())
      .pipe(
        map(AjaxService.assertSuccess),
        map(d => d as T),
        catchError(this.exceptionService.handleError)
      );
  }

  private buildRequestOptions(urlParams?: HttpParams): any {
    return {
      params: urlParams || {}
    };
  }

}
