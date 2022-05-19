import { useEffect, useState } from "react"

const UseMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        console.log('effect-media');
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [matches, query])
    return matches;
}

export default UseMediaQuery