import { LitElement, html, css } from 'lit';


export class CounterApp extends LitElement {
  static get properties() {
    return { counter: { type: Number }, min: { type: Number }, max: { type: Number } };
  }

  constructor() {
    super();
    this.counter = 10;
    this.min = 0;
    this.max = 25;
  }

  updated(changedProps) {
    if (super.updated) super.updated(changedProps);
    if (changedProps.has('counter') && this.counter === 21) this.makeItRain();
  }

  inc() { if (this.counter < this.max) this.counter++; }
  dec() { if (this.counter > this.min) this.counter--; }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
      setTimeout(() => this.shadowRoot.querySelector("#confetti").setAttribute("popped", ""), 0);
    });
  }

  get color() {
    if (this.counter === this.min || this.counter === this.max) return "var(--counter-danger)";
    if (this.counter === 18) return "var(--counter-warning)";
    if (this.counter === 21) return "var(--counter-success)";
    return "var(--ddd-theme-default-wonderPurple, #5632e6)";
  }

  static get styles() {
    return css`
      :host {
        --counter-danger: #ef4444;
        --counter-warning: #fb923c;
        --counter-success: #22c55e;
        --counter-spacing: 16px;
      }
      .wrapper {
        position: relative;
        padding: 32px 20px 20px;
        display: flex; flex-direction: column; align-items: center;
        min-width: 220px; border-radius: 16px; background: #fff;
        box-shadow: 0 2px 18px #0002; gap: var(--counter-spacing);
        overflow: hidden;
      }
      .num {
        font-size: 4rem;
        color: var(--ddd-theme-default-wonderPurple, #5632e6);
        font-weight: bold; transition: color 0.2s; margin-bottom: var(--counter-spacing);
      }
      .num[data-color="var(--counter-warning)"] { color: var(--counter-warning); }
      .num[data-color="var(--counter-success)"] { color: var(--counter-success); }
      .num[data-color="var(--counter-danger)"]  { color: var(--counter-danger); }
      .btns { display: flex; gap: 12px; }
      button {
        font-size: 2rem; border: none; border-radius: 10px;
        background: #2563eb; color: #fff; padding: 0 24px; cursor: pointer;
        transition: background 0.16s; margin: 0 2px;
      }
      button:disabled { opacity: .6; background: #818cf8; cursor: not-allowed; }
      button:hover:not(:disabled), button:focus-visible:not(:disabled) { background: #1746ed; }
      confetti-container { pointer-events: none; position: absolute; inset: 0; }
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        <confetti-container id="confetti"></confetti-container>
        <div class="num" data-color="${this.color}" style="color:${this.color}">${this.counter}</div>
        <div class="btns">
          <button @click="${this.dec}" ?disabled="${this.counter === this.min}">-</button>
          <button @click="${this.inc}" ?disabled="${this.counter === this.max}">+</button>
        </div>
      </div>
    `;
  }
}
customElements.define('counter-app', CounterApp);
