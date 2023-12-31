import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() selectedFeature =  new EventEmitter<string>();
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private DSService: DataStorageService, private authSer: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authSer.user.subscribe(user => {
      console.log(user+"xxxxxxxxxxxxxxxxxxxxx");
      this.isAuthenticated = !user ? false : true; //or !!user 
    });
  }

  // onSelect(feature: string){
  //   this.selectedFeature.emit(feature);
  // }

  onSaveData(){
    this.DSService.storeRecipe();
  }

  onFetchData(){
    this.DSService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authSer.logout();
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
}
