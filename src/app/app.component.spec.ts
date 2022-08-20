import { AppComponent } from './app.component';
import { render } from '@testing-library/angular';

describe('AppComponent', () => {
  async function setup() {
    const { fixture, container } = await render(AppComponent, {});

    return {
      fixture,
      container,
      component: fixture.componentInstance,
    }
  }

  it('should create the component', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });
});
