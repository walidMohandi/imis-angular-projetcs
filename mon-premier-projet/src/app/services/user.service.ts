import {Subject} from 'rxjs';
import {User} from '../models/User.model';

export class UserService {

  private users: User[] = [
    {
      firstName: 'Walid',
      lastName: 'Mohandi',
      email: 'walid@mohandi.com',
      drinkPreference: 'coca',
      hobbies: [
        'manger',
        'coder'
      ]
    }
  ];
  userSubject = new Subject<User[]>();

  emitUser() {
    this.userSubject.next(this.users.slice());
  }
  addUser(user: User) {
    this.users.push(user);
    this.emitUser();
  }
}
