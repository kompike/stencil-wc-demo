import {Component, h, Host} from '@stencil/core';

@Component({
  tag: 'local-dev-component',
  styleUrl: 'local-dev-component.css',
  shadow: true,
})
export class LocalDevComponent {

  render() {
    return (
      <Host>
        <div>Add a web component tag here</div>
      </Host>
    );
  }

}
