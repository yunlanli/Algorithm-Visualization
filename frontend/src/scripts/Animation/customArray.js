export default class CustomArray extends Array {
    constructor(...args) {
        if (args.length == 2 && args[1] === true){
          super();
          this.push(args[0]);
        }else{
            super(...args);
        }
    }

    last() {
        return this[this.length-1];
    }

    pushLast() {
        this.push(this.last());
    }

    removeLast() {
        this.length--;
    }
}