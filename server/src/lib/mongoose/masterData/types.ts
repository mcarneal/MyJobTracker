export interface NavigationItem {
    name: string,
    index: number,
    id?: string,
}

export interface DeleteNavigationItemParams {
    id: string,
}