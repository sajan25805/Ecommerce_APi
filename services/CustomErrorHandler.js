// class CustomErrorHandler extends Error {
//   //   Firstly we need constructor()

//   constructor(status, msg) {
//     super(); //Calling parent (Error Class ) constructor  using super()
//     this.status = status;
//     this.message = msg;
//   }
//   //Making Static Method
//   static alreadyExists(message) {
//     return new CustomErrorHandler(409, message);
//   }
// }

// export default CustomErrorHandler;

class CustomErrorHandler extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
  }

  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message = "Email or Password Incorrect !") {
    return new CustomErrorHandler(401, message);
  }

  static unAuthorized(message = "UnAuthorized User") {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message = " 404 Not Found") {
    return new CustomErrorHandler(404, message);
  }
}

export default CustomErrorHandler;
