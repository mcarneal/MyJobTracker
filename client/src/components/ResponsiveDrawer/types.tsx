import React from "react";

export interface ResponsiveDrawerProps {
    children?: React.ReactNode;
    window?: () => Window;
    items?: [] | undefined;
    isFetching?: boolean
}

export interface PayloadItem {
    id: string
    index: number
    name: string
    __v: number
}

export interface PayloadItems extends Array<PayloadItem>{}

export interface ItemComponent {
    isFetching?: boolean
    items?: any,
}

export interface CollectItemAction {
    type: string
    payload: ItemComponent
}

