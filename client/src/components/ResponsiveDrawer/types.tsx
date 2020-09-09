import React from "react";

export interface ResponsiveDrawerProps {

    children: React.ReactNode;
    window?: () => Window;
    items?: {
        isFetching?: boolean;
        items?: [];
        dispatch?: any;
    }
}
