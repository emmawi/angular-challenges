import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HasRoleDirective } from './directives/has-role.directive';
import { Role } from './user.model';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, HasRoleDirective],
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <div *hasRoleAdmin="true">visible only for super admin</div>
    <div *hasRole="manager">visible if manager</div>
    <div *hasRole="[manager, reader]">visible if manager and/or reader</div>
    <div *hasRole="[manager, writer]">visible if manager and/or writer</div>
    <div *hasRole="client">visible if client</div>
    <div>visible for everyone</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  manager: Role = 'MANAGER';
  reader: Role = 'READER';
  writer: Role = 'WRITER';
  client: Role = 'CLIENT';
}
