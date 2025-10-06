import { LitElement, html, css } from 'lit';

/*

  - Shows a number
  - Two buttons: + and -
  - Won’t go below min or above max
  - Changes color at 18, 21, and when we hit min/max
  - Fires confetti when the number hits 21 
*/
export class CounterApp extends LitElement {
  // These are the “settings” the element understands (HTML attributes map to these)
  static get properties() {
    return {
      counter: { type: Number }, // current number on screen
      min: { type: Number },     // lowest it can go
      max: { type: Number },     // highest it can go
    };
  }

  // Default values so it works even if you just write <counter-app></counter-app>
  constructor() {
    super();
    this.counter = 10;
    this.min = 0;
    this.max = 25;
  }

  /*
    Lit calls this after stuff changes
    - If the counter changed and it’s exactly 21, we trigger confetti
    - We do it here (after render) so the element is fully ready
  */
  updated(changedProps) {
    if (super.updated) super.updated(changedProps);
    if (changedProps.has('counter') && this.counter === 21) {
      this.makeItRain();
    }
  }

  // Add 1, but don’t go past max
  inc() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  // Subtract 1, but don’t go below min
  dec() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  /*
    Load the confetti code only when we need it saves load time
    After it loads, we set an attribute the confetti component watches for
  */
  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
      // Tiny delay so the element finishes upgrading before we “pop” it
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
  }

  /*
    Pick a color based on the number:
    - min/max = “danger”
    - 18 = “warning”
    - 21 = “success”
    - everything else = default purple, uses a DDD token if available
  */
  get color() {
    if (this.counter === this.min || this.counter === this.max) {
      return "var(--counter-danger)";
    }
    if (this.counter === 18) {
      return "var(--counter-warning)";
    }
    if (this.counter === 21) {
      return "var(--counter-success)";
    }
    return "var(--ddd-theme-default-wonderPurple, #5632e6)";
  }

  /*
    Basic styles:
    - Big number
    - Two buttons side by side
    - Buttons have hover/focus states
    - Colors use CSS variables so you can theme it
  */
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
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 220px;
        border-radius: 16px;
        background: #fff;
        box-shadow: 0 2px 18px #0002;
        gap: var(--counter-spacing);
        overflow: hidden;
      }
      .num {
        font-size: 4rem;
        color: var(--ddd-theme-default-wonderPurple, #5632e6);
        font-weight: bold;
        transition: color 0.2s;
        margin-bottom: var(--counter-spacing);
      }
      .num[data-color="var(--counter-warning)"] { color: var(--counter-warning); }
      .num[data-color="var(--counter-success)"] { color: var(--counter-success); }
      .num[data-color="var(--counter-danger)"]  { color: var(--counter-danger); }

      .btns { display: flex; gap: 12px; }
      button {
        font-size: 2rem;
        border: none;
        border-radius: 10px;
        background: #2563eb;
        color: #fff;
        padding: 0 24px;
        cursor: pointer;
        transition: background 0.16s;
        margin: 0 2px;
      }
      button:disabled { opacity: .6; background: #818cf8; cursor: not-allowed; }
      button:hover:not(:disabled),
      button:focus-visible:not(:disabled) { background: #1746ed; }

      confetti-container {
        pointer-events: none;
        position: absolute;
        inset: 0;
      }
    `;
  }

  // The HTML the component prints on the page (number + two buttons + confetti layer)
  render() {
    return html`
      <div class="wrapper">
        <confetti-container id="confetti"></confetti-container>
        <div class="num" data-color="${this.color}" style="color:${this.color}">
          ${this.counter}
        </div>
        <div class="btns">
          <button @click="${this.dec}" ?disabled="${this.counter === this.min}">-</button>
          <button @click="${this.inc}" ?disabled="${this.counter === this.max}">+</button>
        </div>
      </div>
    `;
  }
}

customElements.define('counter-app', CounterApp);
