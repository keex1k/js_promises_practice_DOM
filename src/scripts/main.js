'use strict';

function showNotification(message, isError = false) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = isError ? 'error' : 'success';
  div.textContent = message;
  document.body.appendChild(div);
}

// FIRST PROMISE
const firstPromise = new Promise((resolve, reject) => {
  let resolved = false;

  const handleClick = (e) => {
    if (e.button === 0) {
      // left click
      resolved = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    if (!resolved) {
      document.removeEventListener('click', handleClick);
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

// SECOND PROMISE
const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      // left or right click
      resolve('Second promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
});

// THIRD PROMISE
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handleClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    } else if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
});

// Attach handlers

firstPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message, true));

secondPromise.then((msg) => showNotification(msg));

thirdPromise.then((msg) => showNotification(msg));

// Optional: Allow right-click context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());
