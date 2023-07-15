// =================================== SINGLETON ======================================== //

// class RecentPurchases {
//   static #instance = null;

//   constructor() {
//     this.purchases = [];
//   }

//   static create() {
//     if (!this.#instance) {
//       this.#instance = new RecentPurchases();
//     }

//     return this.#instance;
//   }

//   add(item) {
//     this.purchases.push(item);
//   }

//   get() {
//     return this.purchases;
//   }
// }

// const lastPurchaseList = RecentPurchases.create();
// //================
// const lastPurchaseList2 = RecentPurchases.create();

// console.log(lastPurchaseList === lastPurchaseList2); // returns true

// // add new purchases
// lastPurchaseList2.add("OnePlus 11");
// lastPurchaseList2.add("JBL headphones");

// console.log(lastPurchaseList2.get()); //returns array of added purchases

class RecentPurchases {
  static #instance = null;

  static #purchases = [];

  static create() {
    if (!this.#instance) {
      this.#instance = new RecentPurchases();
    }

    return this.#instance;
  }

  static add(item) {
    this.#purchases.push(item);
  }

  static get() {
    return this.#purchases;
  }
}

RecentPurchases.create();

// add new purchases
RecentPurchases.add("OnePlus 11");
RecentPurchases.add("JBL headphones");

console.log(RecentPurchases.get()); //returns array of added purchases

//==================================== FACTORY ================================= //
class Button {
  constructor({ text, color }) {
    this.text = text;
    this.color = color;
  }

  render() {
    return `<button class="color:${this.color};">${this.text}</button>`;
  }
}

class IconButton {
  constructor({ icon, color }) {
    this.icon = icon;
    this.color = color;
  }

  render() {
    return `<button class="color:${this.color};"><img src="${this.icon}" /></button>`;
  }
}

class ButtonFactory {
  static TYPE = {
    BASIC: "basic",
    ICON: "icon",
  };

  static createButton(type, options) {
    if (options.icon) {
      return new IconButton(options);
    }

    if (options.text) {
      return new Button(options);
    }

    throw new Error(`Такого типу кнопки не існує: ${type}`);

    // switch (type) {
    //   case this.TYPE.BASIC:
    //     return new Button(options);
    //   case this.TYPE.ICON:
    //     return new IconButton(options);
    //   default:
    //     throw new Error(`Такого типу кнопки не існує: ${type}`);
    // }
  }
}

const myIconButton = ButtonFactory.createButton(ButtonFactory.TYPE.ICON, {
  color: `red`,
  icon: `/icon/my-icon.svg`,
});

console.log(myIconButton);

//================================= OBSERVER ===============================================

// class User {
//   constructor(email) {
//     this.email = email;
//   }

//   sendEmail(message) {
//     console.log(`Відправка на email ${this.email} повідомлення ${message}!`);
//   }
// }

// class Video {
//   constructor(name) {
//     this.name = name;
//   }
// }

// class Channel {
//   constructor(name) {
//     this.name = name;
//     this.subscribers = [];
//   }

//   subscribe(user) {
//     //Підписка на канал
//     this.subscribers.push(user);
//   }

//   unsubscribe(user) {
//     //Відмова від підписки
//     this.subscribers = this.subscribers.filter((sub) => sub !== user);
//   }

//   createVideo(name) {
//     //створення нового відео
//     const video = new Video(name);
//     this.sendNotify(video);
//   }

//   sendNotify(video) {
//     //Відправка повідомлення підписникам про нове відео
//     this.subscribers.forEach((subscriber) => {
//       subscriber.sendEmail(
//         `Нове відео '${video.name}' на Youtube каналі ${this.name}`
//       );
//     });
//   }
// }

// const channel = new Channel("JS Patterns");

// const user1 = new User("janedoe@example.com");
// const user2 = new User("johnsmith@example.com");
// const user3 = new User("myname@example.com");

// channel.subscribe(user1);
// channel.subscribe(user2);
// channel.subscribe(user3);

// channel.createVideo("JS Observer");

// channel.unsubscribe(user1);

// console.log(`====================`);

// channel.createVideo("JS Factory");

//=============================== DECORATOR ==========================================
class Coffee {
  name = "Coffee";

  cost = 10;

  cook() {
    console.log(`Making ${this.name}`);
    //Логіка приготування кавового напою
  }
}

class MilkDecorator {
  constructor(coffee, amount) {
    this.coffee = coffee;
    this.amount = amount;
  }

  get name() {
    return `${this.coffee.name}, with ${this.amount} ml of milk`;
  }

  get cost() {
    const milkPrice = 0.05;
    return this.coffee.cost + milkPrice * this.amount;
  }

  cook() {
    console.log(`Making ${this.name}`);
    //Логіка приготування кави з молоком
  }
}

//Створення об'єкту базової кави
const coffee = new Coffee();
console.log(coffee.name);
console.log(coffee.cost);
coffee.cook();

//Додавання декоратора молока до кави
let latte = new MilkDecorator(coffee, 300);
console.log(latte.name);
console.log(latte.cost);
latte.cook();

//============================ MEMENTO =========================== //
class TextEditor {
  #text = "";

  set text(text) {
    this.#text = text;
    this.#save();
  }

  get text() {
    return this.#text;
  }

  #save() {
    Snapshot.create(this.text);
  }

  restore() {
    this.#text = Snapshot.restore().text;
  }
}

class Snapshot {
  constructor(text) {
    this.text = text;
  }

  static #snapshots = [];

  static create(text) {
    console.log(text);
    this.#snapshots.push(new Snapshot(text));
  }

  static restore() {
    this.#snapshots.pop();
    return this.#snapshots[this.#snapshots.length - 1];
  }
}

const editor = new TextEditor();

console.log("===================");
editor.text = "Once upon a time";
editor.text = "long long away";
editor.text = "in the hills of White Kingdom";
editor.text = "lived the great warrior named Conan";

console.log("=======================");

editor.restore();

console.log(editor.text);

editor.restore();

console.log(editor.text);

//================================= CHAIN OF RESPONSIBILITY ========================== //
class AuthHandler {
  setNextHandler(handler) {
    this.nextHandler = handler;
    return handler;
  }

  login(user, password) {
    if (this.nextHandler) {
      return this.nextHandler.login(user, password);
    } else {
      return false;
    }
  }
}

class TwoFactorAuthHandler extends AuthHandler {
  login(user, password) {
    if (
      user === "john" &&
      password === "password" &&
      this.isValidTwoFactorCode()
    ) {
      console.log("Вхід дозволено з двухфакторною аутентифікацією");
      return true;
    } else {
      return super.login(user, password);
    }
  }

  isValidTwoFactorCode() {
    return true;
  }
}

class RoleHandler extends AuthHandler {
  login(user, password) {
    if (user === "guest") {
      console.log("You have access as guest");
      return true;
    } else {
      return super.login(user, password);
    }
  }
}

class CredentialsHandler extends AuthHandler {
  login(user, password) {
    if (user === "admin" && password === "admin123") {
      console.log("You have access as admin");
      return true;
    } else {
      return super.login(user, password);
    }
  }
}

// const handler = new TwoFactorAuthHandler();

// const handler2 = new CredentialsHandler();

// console.log("=====================");

// handler2.setNextHandler(new RoleHandler());

// handler.setNextHandler(handler2);

// handler.login("guest", "admin123");

// handler.setNextHandler(new CredentialHandler());

// handler.login("admin", "admin123");
// handler.setNextHandler({
//   login: (login, password) => {
//     const result =
//       login === "login" && password === "password"
//         ? "You are logged in"
//         : "Try again";

//     console.log(result);
//     return result;
//   },
// });

// handler.login("login", "password");

class HandlerBuilder {
  constructor() {
    this.firstHandler = null;
    this.lastHandler = null;
  }

  add(handler) {
    if (!this.firstHandler) {
      this.firstHandler = handler;
      this.lastHandler = handler;
    } else {
      this.lastHandler.setNextHandler(handler);
      this.lastHandler = handler;
    }
    return this;
  }

  create() {
    return this.firstHandler;
  }
}

const handlerBuilder = new HandlerBuilder();

const handler = handlerBuilder
  .add(new CredentialsHandler())
  .add(new TwoFactorAuthHandler())
  .add(new RoleHandler())
  .create();

console.log("=======================");
handler.login("admin", "admin123");
handler.login("john", "password");
handler.login("guest", "123");
handler.login("user", "password");

// ================================= BRIDGE ===================================== //
class User {
  constructor(name, messenger) {
    this.name = name;
    this.messenger = messenger;
  }

  sendMessage(message) {
    const formattedMessage = this.formatMessage(message);
    this.messenger.sendMessage(formattedMessage);
    // return formattedMessage;
  }

  formatMessage(message) {
    return `[${this.name}]: ${message}`;
  }
}

class SMSMessenger {
  static sendMessage(message) {
    console.log(`Відправлено SMS: ${message}`);
  }
}

class EmailMessenger {
  static sendMessage(message) {
    console.log(`Відправлено Email: ${message}`);
  }
}

const john = new User("John", SMSMessenger);
const jane = new User("Jane", EmailMessenger);

john.sendMessage("Привіт!");
jane.sendMessage("Hello!");
