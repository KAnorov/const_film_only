import Link from "next/link";

const
    pages = [
        { href: '/', title: 'Фильмы' },
        { href: 'serial', title: 'Сериалы' }
    ];


export default function NavigatorFilm() {
    return <nav>
        <ul>
        {pages.map(({ href, title }) => <li key={title}>
      
            <Link href={href}>{title}</Link>
            </li>)}
        </ul>
    </nav>

}