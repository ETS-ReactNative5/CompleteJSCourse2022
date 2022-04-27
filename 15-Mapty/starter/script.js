'use strict';

// // prettier-ignore
// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Selector
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

///////////////////////////////////////////////////

// Using the Geolocation API

// let map, mapEvent;
// if (navigator.geolocation)
//   // the Navigator.geolocation read-only property returns a Geolocation object that gives Web content access to the location of the device. This allows a Web site or app to offer customized results based on the user's location.
//   // navigator --(window object) interface represents the state and the identity of the user agent. It allows scripts to query it and to register themselves to carry on some activities.

//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       // console.log(position);
//       const { latitude } = position.coords; // we simply use destructuring then create a variable called latitude based out of the latitude property of this object
//       const { longitude } = position.coords;
//       // console.log(latitude, longitude); //

//       console.log(`https://www.google.com/maps/@${latitude},${longitude}`); // coords of current location

//       const coords = [latitude, longitude];

//       // Displaying a Map using Leaflet Library
//       map = L.map('map').setView(coords, 13); // map()method --The central class of the API — it is used to create a map on a page and manipulate it and we pass in the map method must be the ID name of an element in HTML -- L here this is basically the main function that Leaflet gives us as an entry point. Its kinda of namespace and L in the browser consle is a global variable inside of the script of leaflet that we then can access from all the other scripts. // the map variable here is an object generated by a leaflet (L) --therefore it is a special object with couple of methods and properties
//       // set its view to our chosen geographical coordinates and a zoom level
//       console.log(map); // show internals of the leaflet library

//       L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map); // tiles --squares bitmap graphics -typically 256×256 pixels- images displayed in a grid arrangement to show a map || tileLayer()--used to display tile layers on the map --define the tiles of our map
//       //  first select a title layer and then we add that tile layer to the map again, using .addTo()

//       // NOTE: Tile layers display image tiles served from a tile server. A tile layer is a set of web-accessible tiles that reside on a server. The tiles are accessed by a direct URL request from the web browser.

//       // Displaying Map Marker
//       // --handling clicks on map
//       map.on('click', function (mapE) {
//         mapEvent = mapE;
//         form.classList.remove('hidden');
//         inputDistance.focus();
//       }); // here we attached an eventlistener --this method is not coming from JS itself, instead of coming from the leaflet library. -- just like in standard JavaScript, we get access to an event, but this one is an event created by leaflet.So let's just call it mapEvent.

//       // NOTE: on method registers a handler, which is callback function with specific signature. Once an event is triggered, a handler is called. It receives necessary data as function parameters (commonly event object). --The on() method attaches one or more event handlers for the selected elements and child elements
//     },
//     function () {
//       alert('Could not get your position');
//     }
//   ); // navigator.geolocation --1st argument: callback function that will be called on success wheneveer the browser successfully got the coordinates of the current position of the user 2nd argument: is the error callback which is the one that is gonna be called when error happened while getting the coordinates

// // Rendering workout form
// form.addEventListener('submit', function (e) {
//   e.preventDefault();

//   // clear input fields
//   inputDistance.value =
//     inputDuration.value =
//     inputCadence.value =
//     inputElevation.value =
//       '';

//   // Display marker
//   console.log(mapEvent);
//   const { lat, lng } = mapEvent.latlng;

//   L.marker([lat, lng]) // marker --used to display clickable/draggable icons on the map and passes coordinates (render a map on our page with the coordinates)
//     .addTo(map) // method that adds to the map
//     .bindPopup(
//       L.popup({
//         maxWidth: 250,
//         minWidth: 100,
//         autoClose: false,
//         closeOnClick: false,
//         className: 'running-popup', //can use to assign any CSS className to style
//       })
//     ) // create a popup and bind it to the marker --simply pass a string
//     .setPopupContent('Workout')
//     .openPopup();
// });

// inputType.addEventListener('change', function () {
//   inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//   inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
// });
// use if statement --to make sure we dont get any errors in an old browser, we can test if (navigation.geolocation) actually exists

// console.log(firstName); //  first name variable is a global variable here in this script. any variable that is global in any script will be available to all the other scripts while as long as they appear after that script here included in the HTML. So script.js has access to all the global variables in othe.js when other.js and leaflet.js but for example, other.js does not have access to anything from script.js because it appears afterwards
////////////////////////////////////////////////////////////

// *****DATA******
// Managing Workout Data: Creating classes
// Parent class
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10); // NOTE:  in the real world, we usually always use some kind of library in order to create good and unique ID numbers. So usually we should never create IDs on our own but always let some library take care of that because this is a very important part of any application
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // im min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

// Child class
class Running extends Workout {
  // public fields
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    // this.type = 'running' --is same as above public fields

    this.calcPace();
    this._setDescription(); //calling from the parent class workout --child class contain the type field
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;

    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // min/km
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}
// const run1 = new Running([14.5176, 121.0509], 5.2, 24, 178);
// const cycle1 = new Cycling([14.5176, 121.0509], 27, 95, 523);
// console.log(run1, cycle1);

// ********APPLICATION***********
// Refractorung for Project Architecture

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // Get position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    this._renderingForm();

    // **event handlers
    // Rendering workout form
    // form.addEventListener(
    //   'submit',
    //   this._newWorkout.bind(this) // TIP: always bind the callback function in an event handler --event handler callback function will always have the this keyword in the DOM element (form)
    // ); // NOTE: JavaScript events are bound to the document object model (DOM) and aren't bound to any arbitrary object you might make. --attach the eventListener to the DOM elements here in the constructor

    inputType.addEventListener('change', this._toggleElevationField);

    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  } //constructor method is called immediately when new object is created from this class

  // Display current positon(coordinates)
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // this keyword passed on the bind method points to the current object (class App)--_loadMap method called by _getCurrentPosition method here and treated as regular function call not method call --regular function this keyword is undefined
        function () {
          alert('Could not get your position');
        }
      );
  }

  // just a blueprint --we need to create an actual object out of the App class
  _loadMap(position) {
    console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(latitude, longitude); //

    //console.log(`https://www.google.com/maps/@${latitude},${longitude}`); // coords of current location

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    // console.log(this.#map);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Displaying Map Marker
    // --handling clicks on map leaflet library
    this.#map.on('click', this._showForm.bind(this)); // same as event hanlders --this keyword is attached to the map library event itself (whom we attached the event handlers)

    // Render map marker from local storage
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  // rendering form
  _renderingForm() {
    form.addEventListener('submit', this._newWorkout.bind(this));
    //return this;
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    // mapEvent --an event created by leaflet library --event object take the lat&lng upon clicking on map and then add a marker

    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // Dirty tricks
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  // Creating new Workout --features
  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp)); // helper function
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();

    // Get data from the form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout, create  running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Input have to be positive numbers!'); // using guard clause --means check for the opposite of what we are interested in

      workout = new Running([lat, lng], distance, duration, cadence);
    }
    // If workout, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      // Check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Input have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);
    // console.log(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form & clear input fields
    this._hideForm();

    // Set localStorage to all workouts
    this._setLocalStorage();
  }

  // Display marker
  _renderWorkoutMarker(workout) {
    // console.log(mapEvent);
    // const { lat, lng } = this.#mapEvent.latlng;
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  // Rendering Workout --list
  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <div class="workout__feature">
    <h2 class="workout__title">${workout.description}</h2>
      <div class="btn--feats">
      <button class = "btn btn-edit"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg></button>
      <button class = "btn btn-delete"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg></button> </div>
    </div>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>`;

    if (workout.type === 'running')
      html += `
    <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed()}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>`;

    if (workout.type === 'cycling')
      html += ` <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed()}</span>
      <span class="workout__unit">km/h</span>
    </div>
    
    
    `;
    form.insertAdjacentHTML('afterend', html);

    // let test = document.querySelector(`[data-id="${workout.id}"]`);
    // test.addEventListener('click', () => {
    //   console.log('hello');
    // });

    const buttonEdit = document.querySelector('.btn-edit');
    // console.log(buttonEdit);
    // let render;

    buttonEdit.addEventListener('click', function (e) {
      const workoutEl = e.target.closest('.workout');
      if (workout.id === workoutEl.dataset.id) {
        console.log('EDIT');
        // render = this._renderingForm();

        // form.addEventListener('submit', this._newWorkout.bind(this));
        const workoutEl = e.target.closest('.workout');

        const data = JSON.parse(localStorage.getItem('workouts'));
        // console.log(data);

        if (!data) return;

        this.workout = data;

        data.find(work => {
          if (work.id === workoutEl.dataset.id) {
            form.classList.remove('hidden');
            inputDistance.focus();

            this.calling();
          }
        });
      }

      // return render;
    });

    const buttonDel = document.querySelector('.btn-delete');
    // console.log(buttonEdit);

    buttonDel.addEventListener('click', function (e) {
      const workoutEl = e.target.closest('.workout');

      const data = JSON.parse(localStorage.getItem('workouts'));
      // console.log(data);

      if (!data) return;

      this.workout = data;

      data.find(work => {
        if (work.id === workoutEl.dataset.id) {
          localStorage.removeItem('workouts');
          location.reload();
        }
      });
    });
  }

  // Move map marker on click
  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    //console.log(workoutEl);

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    // console.log(workout);

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    // workout.click();
  }

  _setLocalStorage() {
    // local storage(very simple API) is simple key value store
    localStorage.setItem('workouts', JSON.stringify(this.#workouts)); // 1st argument: give name(key) and 2nd argument: simple value --needs to be string to store and which is associated with a key
    // TIP: we can convert object to string using JSON.stringify(). Dont use local storage to store large amount of data
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    // console.log(data);

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => this._renderWorkout(work));
  }
  // NOTE: when converted objects to a string and convert it back to object, the prototype chain is lost, so the new object recovered from the local storage are now just regular object (not same object created by OOP) therefore not inherit the method --to solve, 1: restore the object in the local storage and loop over then restore the object by creating a new object using class 2: simple disable the functionality of counting clicks

  // public interface
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }

  calling() {
    this._renderingForm();
  }
}

const app = new App();

// app._getPosition(); // all code in top level scope --outside of any function will get executed immediatelt as the script loads

// NOTE: when calling function in an event handlers and in callback, the function will simply be called a regular function and regular function this keyword is undefined

// Final Consideration

////////////////////////////////////////////////////////