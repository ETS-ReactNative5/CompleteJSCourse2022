'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////

// console.log(document.open());
/*
// Selecting, Creating and Deleting Document

// Selecting Elements (HTML document)
console.log(document.documentElement); // root
console.log(document.head); // if inside the head
console.log(document.body); // if inside the body

const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');
console.log(allSection); // return a nodelist of all section element

document.getElementById('section--1'); // no need to use # or . (only applicable to querySelector metthod)
const allButton = document.getElementsByTagName('button');
console.log(allButton); // return HTMLCollection() --different from node list(not update automatically) --so called life collection that means if the DOM changes this collection is also immediately updated automatically

console.log(document.getElementsByClassName('btn')); // return HTML Collections

// CREATING and INSERTING ELEMENTS (programmatic way)
// .insertAdjacentHTML --quick and easy way of creating and inserting (based on Bankist App) elements

const message = document.createElement('div'); // creates DOM elements and stores that element into the variable message --this element is not yet in our DOM (web page) --this is just a DOM object
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class = "btn btn--close--cookie"> Got it! </button>'; // method use to read and set content

// header.prepend(message); // --basically adds the element as the first child of header element --method use to insert created DOM element on DOM (web page - HTML)
header.append(message); // --basically adds the element as the last child of header element

// Note: Element only insert at once, message element is now indeed a life element living in the DOM --can't be at multiple places at the same time
// Note: We can use prepend and append not only to insert elements but also to move them
// DOM ELEMENT IS UNIQUE !!! only exist at one place at a time

//header.append(message.cloneNode(true)); // copy all the child element by setting true at parameter --method use to insert multiple elements

// header.before(message); // insert before the header element -- message and header as siblings
// header.after(message);

// DELETE Elements
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove();

    // message.parentElement.removeChild(message); // message and then we would move up in a DOM tree,remove child and then again the name of the element that we want to remove.

    // DOM traversing -- way of moving up and down in the DOM tree like selecting (parentElement)
  });

// STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); // Reference Error
console.log(message.style.backgroundColor); // --only found in inline css

// get style even not in DOM or in html doc
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; // Need to use parseInt/parseFloat in order to read and convert to number

// documentElement === HTML :root (style.css)
document.documentElement.style.setProperty('--color-primary', 'orangered'); // use setProperty() easily change the style then we pass the name of property and the value

// ATTRIBUTES
const logo = document.querySelector('.nav__logo');
console.log(logo.className);
console.log(logo.alt);
console.log(logo.src); // absolute URL
console.log(logo.getAttribute('src')); // relative URL as relative to the folder in HTML file

const link = document.querySelector('.twitter-link');
console.log(link.href); // absolute URL
console.log(link.getAttribute('href')); // absolute URL

const link1 = document.querySelector('.nav__link--btn');
console.log(link1.href); // absolute URL
console.log(link1.getAttribute('href')); // '#' - relative URL
// setting attribute
logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'Bankist');

// non-standard
console.log(logo.designer); // undefined --not an attribute in html is not a standard property in an element
console.log(logo.getAttribute('designer')); // Jonas

// data attributes --special type (has to start with DATA word)
console.log(logo.dataset.versionNumber); // need to camelCase name stated in html attribute (data-version-number)

// Note: special attributes always stored in the dataset object
// **oftern use data attributes when working with UI and need to store data in UI esp in HTML code

// CLASSES
logo.classList.add('c', 'k');
logo.classList.remove('c', 'k');
logo.classList.toggle('c', 'k');
logo.classList.contains('c', 'k'); // not includes
// **can pass multiple classes passin in multiple values

// !! DONT USE !!
logo.className = 'Jonas'; // will override existing  --allows us to only put one class on any element
*/
///////////////////////////////////////////////////////

// Implementing Smooth Scrolling

// 1st way --old school
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); // 1st: need to get the coordinates of the we want to scroll to
  console.log(s1coords); // DOM Rect: x: left (distance between the border on the browser), y: top(distance from the top), width: px, height: px

  // console.log(e.target.getBoundingClientRect());
  // **getBoundingClientRect() --basically relative to the visible view port

  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); // current scroll --when at the top both should be zero

  // view height and width VP
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight, //not counting with scroll bars. It's just dimension of the VP that avaible for the content --excludes scroll bars
  //   document.documentElement.clientWidth
  // );

  // scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // ); // this top is always relative to the vuewport but not to the document (html) --not to the top of the page

  // solution:  simply add the current scroll position (window offset) to the top value of the page (window.scrollTo). And with this, we will then determine the position of the section here, not relative to the viewport. Not to the top of the browser window viewport, but instead to the top of the page. (current position + current scroll)
  // by doing the solution:  basically determined the absolute position of this element (section1) relative to the document. So to the entire page.

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // Modern Way
  section1.scrollIntoView({ behavior: 'smooth' });
});
