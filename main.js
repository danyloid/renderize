import './style.css';
import { Renderize } from './codebase/renderize';
import { UseStateExampleComponent } from './codebase/components/UseStateExampleComponent';

document.querySelector('#app').innerHTML = `
  <h2>Renderize</h2>
  <p>App demonstrating custom hook functions with similar usage to hooks in React</p>
  <div class="card">
  </div>
`;

const container = document.querySelector('#app .card');
Renderize.render(container, UseStateExampleComponent);
