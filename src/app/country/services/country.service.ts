import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { Observable, combineLatest, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private _regions: Region[] = [
    Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania
  ];

  private baseURL: string = 'https://restcountries.com/v3.1';

  constructor(
    private http: HttpClient
  ) { }

  get regions(): Region[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {

    if (!region) return of([]);

    const url: string = `${this.baseURL}/region/${region}?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.map(country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? []
        }))),
        tap(res => console.log({ res })),
      )
  }

  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry>{
    const url = `${this.baseURL}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url)
      .pipe(
        map(country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? []
        }))
      )
  }

  getCountriesByCodes(borders: string[]): Observable<SmallCountry[]>{
    if(!borders || borders.length === 0) return of([]);

    const countryReq:Observable<SmallCountry>[] =[];
    borders.forEach(code => {
      const req = this.getCountryByAlphaCode(code);
      countryReq.push(req);
    });

    return combineLatest(countryReq);
  }

}
