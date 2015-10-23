import Firebase from 'firebase';


export class Task {
  constructor(title) {
    this.completed = false;
    this.createdAt = Firebase.ServerValue.TIMESTAMP;
    this.title = title;
  }
}
