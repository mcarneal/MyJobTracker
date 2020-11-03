import React from "react";
import selectViewsDomain from "./selectors";

export interface ResponsiveDrawerProps {
    children?: React.ReactNode;
    window?: () => Window;
    items?: [] | undefined;
    isFetching?: boolean;
    isAuthenticated?: boolean | undefined;
    user?: any;
}

export interface Item {
    isFetching?: boolean
    items?: any,
}

export interface CollectItemAction {
    type: string
    payload: Item
}

export type SelectorType = ReturnType<typeof selectViewsDomain>;
