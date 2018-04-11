import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormGroup, FormControl} from '@angular/forms'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height":"0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height":"70px",
        "margin-top":"20px"
      })),
      transition('* => *', animate('250ms 0ms ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[]

  searchBarState = 'hidden'

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantService : RestaurantsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('')

    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
        .debounceTime(500)
        .distinctUntilChanged()
        .do(input => console.log(`q=${input}`))
        .switchMap(input => this.restaurantService.restaurants(input)) //um subscribe não sobrescreve o outro
        .subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantService.restaurants().subscribe(restaurants => this.restaurants = restaurants);
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }
}
