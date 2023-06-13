
export interface MenuItem {
  name: string;
  keywords?: string;
  icon?: string;
  routerLink?: string;
  subMenuItems?: MenuItem[];
  permissions?: any[];
  isOpen?: boolean;
}
