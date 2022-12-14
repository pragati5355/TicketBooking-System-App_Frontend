import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/service/api.service';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-select-seats',
  templateUrl: './select-seats.component.html',
  styleUrls: ['./select-seats.component.scss']
})
export class SelectSeatsComponent implements OnInit, OnDestroy{

  movieData: any;
  movie: any;
  movieId: any;
  getSubscription !: Subscription;
  getSubscriptionSeat !: Subscription;

  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  columns: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  sold: string[] = ['E3','E2','C5','C6'];
  selected: string[] = [];

  constructor(
    private dataService : DataService,
    private router : Router,
    private apiService : ApiService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.movieId = this.route.snapshot.params['id'];
    this.getSubscription = this.apiService.getSingleMovie(this.movieId).subscribe(
      (res:any) => {
        this.movie = res.data;
      },
      (err:any) => {
        console.error(err);
      }
    );

    this.getSubscriptionSeat = this.apiService.getSeats(this.movieId).subscribe(
      (res) => {
        this.getMergedArray(res.data);
      },  
      (err:any) => {
        console.error(err);
      }
    )
    
  }

  ngOnDestroy(): void {
    this.getSubscription.unsubscribe();
    this.getSubscriptionSeat.unsubscribe();
  }

  getMergedArray(data: any[]) {
    data.forEach(element => {
      this.sold = this.sold.concat(element.seat)
     });
  }

  getSeatStatus(positionOfSeat: string) {
    if (this.sold.indexOf(positionOfSeat) !== -1) {
      return 'sold';
    } else if (this.selected.indexOf(positionOfSeat) !== -1) {
      return 'selected';
    } else {
      return 0;
    }

  }

  selectSeat(positionOfSeat: string) {
    let index = this.selected.indexOf(positionOfSeat);

    if (index !== -1) {
      this.selected.splice(index, 1)
    } else {
      if (this.sold.indexOf(positionOfSeat) === -1) {
        this.selected.push(positionOfSeat);
      }
        
    }
  }

  buyTickets(){
    if (this.selected.length > 0) {
      this.dataService.auth.next(true);
      this.dataService.seats.next(this.selected);
      this.router.navigate(["/ticket/confirm/" + this.movieId]);
    } else {
      this.router.navigate(['/feature/movies']);
    }
    
  }
}
