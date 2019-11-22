import {
  of,
  from,
  fromEvent,
  Observable,
  interval,
  concat,
  Observer,
  combineLatest
} from "rxjs";
import { map, filter, reduce, tap } from "rxjs/operators";

// ******* exercise 1 *******
//console.clear();
{
  const data = ["a", "g", "o", "f", "3", "5", "r", "D", "n", "b", "s", "c"];
  let re = /[a-g]/i;
  const source$ = from(data);
  // TODO: Filter only from a-gA-G
  source$
    .pipe(filter(item => re.test(item)))
    .subscribe(result => console.log(result));
}

// ******* exercise 2 *******
// console.clear();
{
  const data = ["1", "1", "foo", "2", "3", "5", "bar", "8", "13"];
  const source$ = from(data);

  // TODO: Create a var `result` that contains the sum
  // of all numbers in source.
  // Use pure functions
  // such as map, filter, reduce, scan, merge, delay,
  // concat, take, etc.

  source$
    .pipe(
      map(item => parseInt(item)),
      filter(item => !isNaN(item)),
      reduce((res, curr) => (res += curr), 0)
    )
    .subscribe(result => console.log(result));
}

// ******* exercise 3 *******
//console.clear();
{
  let observable$;

  // TODO: Create an RxJS Observable `observable` with
  // the same behavior as the promise above.
  observable$ = new Observable(Observer => {
    Observer.next("promise started");
    console.log("timeout");
    setTimeout(() => {
      Observer.next(123);
    }, 1000);
  });

  observable$.subscribe(x => console.log("next: " + x));
}

// ******* exercise 4 *******
//console.clear();
{
  const heightEl = document.getElementById("height");
  const widthEl = document.getElementById("width");
  let getHeight$ = fromEvent(heightEl, "input");
  let getWidth$ = fromEvent(widthEl, "input");

  let bothEvent$ = combineLatest(getHeight$, getWidth$).pipe(
    map(
      ([myWidth, myHeight]) =>
        (<any>myWidth.target).value * (<any>myHeight.target).value
    )
  );
  bothEvent$.subscribe(item => {
    console.log(`Square value = ${item}`);
  });
  // TODO: Create observable that calculates area of square using observables
  // above
}
