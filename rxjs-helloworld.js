const { fromEvent } = rxjs;

const button = document.querySelector("#myButton");
const content = document.querySelector("#myContent");

const myObservable = fromEvent(button, 'click');
myObservable.subscribe(() => {
    content.textContent = moment().format('LTS');
});