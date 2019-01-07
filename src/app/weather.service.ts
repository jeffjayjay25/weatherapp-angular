import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import { Moodsactivity } from '../../backend';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  apiKey = '3b638fccef8920c0bf1356f12e48be34';
  units = 'metric';
  forecast: any[] = [];
  private moodactivitiesUrl = 'http://localhost:8080/api/moodsactivities';

  constructor(private httpClient: HttpClient) { }


  // An observable can deliver multiple values of any type
  currentWeather(city: string): Observable<any> {
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${this.units}&APPID=${this.apiKey}`;
    return this.httpClient.get<any>(apiCall).pipe(map(res => {
      console.log(res, 'oobservabkes');
      const pressure = res.main.pressure;
      const weather = res.weather[0];
      const humidity = res.main.humidity;
      const icon = res.weather[0].icon;
      const temp = res.main.temp;
      const x = { weather, temp, humidity, pressure, city};
      return x;
      })
    );
  }

  getForecast(city: string) {
    const apiCall = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${this.units}&APPID=${this.apiKey}`;
    return this.httpClient.get<any>(apiCall).pipe(
      map((res: any) => {
        this.forecast = [];
        for (let i = 0; i < res.list.length; i += 8) {        // simplifying the 8 data collected into one per day
          this.forecast.push(res.list[i]);
        }
        return this.forecast;
      })
    );
  }
  getMoodactivities (): Observable<Moodsactivity[]> {
    return this.httpClient.get<Moodsactivity[]>(this.moodactivitiesUrl)
      .pipe(catchError(this.handleError));

  }

  getMoodsactivity(id: number): Observable<Moodsactivity> {
    const url = `${this.moodactivitiesUrl}/${id}`;
    return this.httpClient.get<Moodsactivity>(url)
      .pipe(catchError(this.handleError));
  }

  addMoodsactivity (moodactivity: Moodsactivity): Observable<Moodsactivity> {
    return this.httpClient.post<Moodsactivity>(this.moodactivitiesUrl, moodactivity, httpOptions)
      .pipe(catchError(this.handleError));

  }

  deleteMoodsactivity (id: number): Observable<Moodsactivity> {
    const url = `${this.moodactivitiesUrl}/${id}`;

    console.log(`Deleting moodActivity with id ${id}`);
    return this.httpClient.delete<Moodsactivity>(url, httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  updateMoodsactivity (moodactivity: Moodsactivity): Observable<any> {
    return this.httpClient.put(this.moodactivitiesUrl, moodactivity, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // client-side error
      console.log('An error occurred: ', error.error.message);
    } else {
      console.error(`The backend returned code ${error.status}, ` +
      `${error.message}`);
    }
    return throwError(`Something bad happened; please try again later.`);
  }
}
