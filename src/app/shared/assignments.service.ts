import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  /*assignments:Assignment[] = [
    {
      id:1,
      nom: "Devoir Angular à rendre",
      dateDeRendu: new Date('2022-10-10'),
      rendu: false
    },
    {
      id:2,
      nom: "Devoir JAVA à rendre",
      dateDeRendu: new Date('2022-09-10'),
      rendu: true
    },
    {
      id:3,
      nom: "Devoir BD à rendre",
      dateDeRendu: new Date('2022-12-01'),
      rendu: false
    }
    ];*/

  constructor(private logginService:LoggingService, private http:HttpClient) { }

  url = "http://localhost:8010/api/assignments";
  
  getAssignments():Observable<Assignment[]> {
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.url);
  }

  // renvoie comme Observable l'assignment dont l'id est passé
  // en paramètre, ou undefined s'il n'existe pas
  getAssignment(id:number):Observable<Assignment|undefined> {
   /* const a:Assignment|undefined = this.assignments.find(a => a.id === id);
    if(a)
    console.log("getAssignment id= " + id + " nom = " + a.nom)
    return of(a);*/
    return this.http.get<Assignment>(this.url + "/" + id);
  }

  addAssignment(assignment:Assignment):Observable<any> {
   /* this.assignments.push(assignment);

    this.logginService.log(assignment.nom, "ajouté !");

    return of("Assignment ajouté");*/
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // On n'a besoin de rien faire pour le moment, puisque l'assignment est passé par référence
    // et que l'objet est modifié dans le tableau
    // Plus tard on utilisera un Web Service distant...
   /* this.logginService.log(assignment.nom, "modifié !");

    return of("Assignment modifié");*/
    return this.http.put<Assignment>(this.url, assignment);

  }

  deleteAssignement(assignment:Assignment) :Observable<any> {
    /*let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);

    this.logginService.log(assignment.nom, "supprimé !");

    return of("Assignment supprimé")*/
    let deleteURI = this.url + "/" + assignment._id;
    return this.http.delete(deleteURI);
  }

  peuplerBD(){
    bdInitialAssignments.forEach (a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      this.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
      })
    });
    console.log("BD peuplée");
  }

}
