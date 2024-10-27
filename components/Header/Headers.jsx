import { useEffect, useRef, useState } from "react";
import classes from "@/components/Header/Headers.module.css";

export default function Headers() {
    const
        [хедерВиден, хедерСкрыт] = useState(false),
        ссылкаНаХедер = useRef(null);

    let
        lastScrollTop = 0;

    useEffect(() => {
        const
            handleScroll = () => {
                const scrollTop = window.scrollY;

                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    хедерСкрыт(true);
                } else {
                    хедерСкрыт(false);
                }
                lastScrollTop = scrollTop;
            };

        window.addEventListener('scroll', handleScroll);


        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop, хедерСкрыт]);

    return (
        <div
            className={classes.headers}
            ref={ссылкаНаХедер}
            style={{ top: хедерВиден ? '-100px' : '0', position: 'fixed', transition: 'top 0.3s' }}
        >
            <h1>Const_Film_HD</h1>
            
        </div>
    );
}
