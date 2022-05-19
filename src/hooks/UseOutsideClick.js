import { useEffect } from 'react';

const UseOutsideClick = (ref, handler) => {
    useEffect(() => {

        console.log('outside-click')
        const listener = (event) => {
            // what to do on outside click
            if (ref.current && !ref.current.contains(event.target)) {
                handler(event);
            }
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    },
        [ref, handler]
    );
}

export default UseOutsideClick