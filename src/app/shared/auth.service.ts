import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUser: User[] = [
    { email: 'emre@emre.fr', password: 'emre' },
    { email: 'abdenour@achouri.fr', password: 'abdenour' },
    { email: 'michel@buffa.fr', password: 'michel' }
  ];

  loggedIn=false;

  constructor() { }

  logIn(User: User) {
    localStorage.setItem('ACCESS_TOKEN ', "access_token");
  }
  authentifier(User: User): boolean {
    return this.registerUser.some(u => u.email === User.email && u.password === User.password);
  }


  logOut() {
    localStorage.removeItem('ACCESS_TOKEN');
  }

  // renvoie une promesse qui est résolue si l'utilisateur est loggué
  isConnected() {
    const isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    return isUserAdmin;
  }
  
}
