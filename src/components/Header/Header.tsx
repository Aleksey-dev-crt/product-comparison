import UserIcon from '../UI/UserIcon/UserIcon';
import styles from './Header.module.css';

function Header() {
	return (
		<>
			<header className={styles.header}>
				<p className={styles.catalog}>Каталог</p>
				<nav className={styles.nav}>
					<a
						href='/'
						onClick={(e) => e.preventDefault()}
						className={styles.link + ' ' + styles.text}>
						СРАВНЕНИЕ
					</a>
					<a
						href='/'
						onClick={(e) => e.preventDefault()}
						className={styles.link + ' ' + styles.UserAccount}>
						<span className={styles.text}>Личный кабинет</span>
						<UserIcon />
					</a>
				</nav>
			</header>
			<hr />
		</>
	);
}

export default Header;

