import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';

const components = [
  FooterComponent,
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    ...components,
    MaterialModule,
  ]
})
export class SharedModule {
}
