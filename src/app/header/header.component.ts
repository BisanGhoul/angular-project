import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Output() selectedFeature =  new EventEmitter<string>();

  constructor(private DSService: DataStorageService) { }

  ngOnInit(): void {
  }

  // onSelect(feature: string){
  //   this.selectedFeature.emit(feature);
  // }

  onSaveData(){
    this.DSService.storeRecipe();
  }
}
