import Link from "next/link";
import styles from './Navigator.module.css';

const
    pages = [
        { href: '/', title: 'Фильмы' },
        { href: 'serial', title: 'Сериалы' }
    ];


export default function NavigatorFilm() {
    return <nav>
        <ul className={styles.menu}>
        {pages.map(({ href, title }) => <li key={title} className={styles.menuLi}>
      
            <Link href={href}>{title}</Link>
            </li>)}
        </ul>
    </nav>

}