import { useState, useSyncExternalStore } from "../engine";
import { $element } from "../helpers/render";

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);

  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

export const ExampleComponent = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const isOnline = useSyncExternalStore(subscribe, getSnapshot) as boolean;

  const counterSection = $element('section', {
    children: [
      $element('p', { attributes: {innerText: `Click count: ${count}`} }),
      $element('button', { attributes: {innerText: 'Click' }, events: { 'click': () => setCount(count + 1) }}),
      $element('button', { attributes: {innerText: 'Reset clicks' }, events: { 'click': () => setCount(0) }})
    ]
  });

  const nameSection = $element('section', {
    children: [
      $element('p', { attributes: {innerText: `Name: ${name || '[not set]'}`} }),
      $element('button', { attributes: {innerText: 'John'}, events: { 'click': () => setName('John') }}),
      $element('button', { attributes: {innerText: 'Jane'}, events: { 'click': () => setName('Jane') } }),
      $element('button', { attributes: {innerText: 'Reset name'}, events: { 'click': () => setName('') }  }),
    ]
  });

  const isOnlineSection = $element('section', {
    children: [
      $element('h3', { attributes: {innerText: isOnline ? '✅ Online' : '❌ Disconnected'} })
    ]
  });

  const container = $element('div', {
    children: [
      counterSection,
      nameSection,
      isOnlineSection
    ]
  });

  return container;
};
