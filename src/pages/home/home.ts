import { Component } from '@angular/core';
import { NavController, Refresher, reorderArray } from 'ionic-angular';
import { ANIMALS } from '../../data/data.animals';
import { AnimalInterface } from '../../interfaces/animal.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //TODO: Variables de la clase
  animals: AnimalInterface[] = [];//creamos un array de tipo animalInterface y vacio
  audio = new Audio(); // objeto audio para el uso de play y load
  durationAudio: any; //para usar en la reproduccion del audio
  order: boolean = false; //para determinar si tenemos ordenada la lista


  constructor(public navCtrl: NavController) {

    //TODO: clonamos constante ANIMALS a nuestra variable animals
    this.animals = ANIMALS.slice(0);

  }
  //play Audio
  private play(animal: AnimalInterface) {
    this.pauseAudio(animal);

    if (animal.playing) {
      animal.playing = false;
      return;
    }
    console.log(animal);
    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
    animal.playing = true;
    this.durationAudio = setTimeout(() => animal.playing = false, animal.duration * 1000);
  }
  // pause audio
  private pauseAudio(animalSel: AnimalInterface) {
    clearTimeout(this.durationAudio);
    this.audio.pause();
    this.audio.currentTime = 0;
    for (let animal of this.animals) {
      if (animal.name != animalSel.name) {
        animal.playing = false;
      }
    }

  }
  //Modifica un  animal simulando un delete
  private deleteItem(index:number){
    this.animals.splice(index,1);
  }
  //reload list
  doRefresh(refresher:Refresher){
    console.log("comienzo de proceso asincrono", refresher);
    setTimeout(()=> {
      console.log("operacion asincrona finalizada");
      this.animals = ANIMALS.slice(0);
    refresher.complete();
  }, 1500 );
  }
  //reordenar lista
  reorderAnimals(indices:any){
    console.log(indices);
    this.animals=reorderArray(this.animals,indices);
  }
}
