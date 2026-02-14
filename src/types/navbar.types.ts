import es from "@/src/i18n/messages/es.json";
// importo el es.json para tener todas las lables posibles

export type NavbarLabel = keyof typeof es.navbar;

interface NavItemBase {
    label: NavbarLabel;
    icon?: string;
    isPrivate?: boolean;
}

export interface NavItemLink extends NavItemBase {
    type: "link";
    path: string;
    children?: never;
}

export interface NavItemDropdown extends NavItemBase {
    type: "dropdown";
    children: NavItemLink[];
    path?: string;
}

export type NavItem = NavItemLink | NavItemDropdown;
