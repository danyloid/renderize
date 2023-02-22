import { ExampleComponent } from './components/UseStateExampleComponent';
import { Renderize } from './engine';
import './style.css'

document.querySelector('#app')!.innerHTML = `
  <h2>Renderize</h2>
  <p>App demonstrating custom hook functions with similar usage to hooks in React</p>
  <div class="card">
  </div>
`;

const container = document.querySelector('#app .card')!;
Renderize.render(container, ExampleComponent);
