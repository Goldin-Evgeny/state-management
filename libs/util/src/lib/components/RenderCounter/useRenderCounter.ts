import React from "react";

export const useRenderCounter = () => {
    const renderCount = React.useRef(0);
    renderCount.current++;
    return renderCount.current;
}