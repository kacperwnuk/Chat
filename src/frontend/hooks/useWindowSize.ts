import React from "react";

// https://usehooks.com/useWindowSize/

const isClient = typeof window === "object";

function getSize() {
    return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
    };
}

export default function () {

    const [windowSize, setWindowSize] = React.useState(getSize);

    React.useEffect(() => {
        if (!isClient) {
            return;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}