export class  AuthService {

  isAuth = false;

  signeIn() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            resolve(true);
          }, 2000
        );
      }
    );
  }

  signeOut() {
    this.isAuth = false;
  }

}
