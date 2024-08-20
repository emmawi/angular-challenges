import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
} from '@angular/core';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hasRole], [hasRoleAdmin]',
})
export class HasRoleDirective {
  hasRole = input<Role | Role[]>();
  hasRoleAdmin = input<boolean | boolean>();

  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private userStore = inject(UserStore);

  constructor() {
    effect(() => {
      const user = this.userStore.user();
      if (this.hasRoleAdmin() && user?.isAdmin) {
        this.addTemplate();
      } else {
        this.removeTemplate();
      }
      this.checkUserRole(this.hasRole());
    });
  }

  private checkUserRole(role: Role | Role[] | undefined): void {
    const roles: Role[] = [];
    if (typeof role === 'string') {
      roles.push(role);
    } else if (role) {
      roles.push(...role);
    }

    const hasRole = this.userStore.hasRole(roles);
    if (hasRole) {
      this.addTemplate();
    } else {
      this.removeTemplate;
    }
  }

  private addTemplate() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private removeTemplate() {
    this.viewContainer.clear();
  }
}
