import React, { useState } from "react"
import Link from "next/link"
import styles from "./Header.module.css"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { isMounted } from "../hooks/isMounted"
import { useUser } from '@auth0/nextjs-auth0/client';

function Header() {
	const { address, isConnected } = useAccount()
	const [isActive, setIsActive] = useState(false)
    const mounted = isMounted();
	const { user, error, isLoading } = useUser();

	if (isLoading) return <div className={styles.loading}>Loading?????????...</div>;

	function handleClick() {
		location.href = "/profile";
	}
  
	return (
		<header className={styles.header}>
			<nav className={`${styles.container} ${styles.container_flex}`}>
				<Link href="/"className={styles.logo} >
					<img src="/logo.png" alt="" className={styles.logo_img} />
					<div className={styles.logotxt}>
						<h2 className={styles.logo_title}>CoffeeHours</h2>
						<p className={styles.logo_description}>
							For students. By students.
						</p>
					</div>
				</Link>

				{/* Hamburger menu for mobile view  */}
				<img
					src="/hamburger_menu.svg"
					alt="An SVG of hamburger menu"
					className={`${styles.hidden} ${styles.hamburger}`}
					onClick={() => setIsActive(prev => !prev)}
				/>

				<div className={`${styles.nav_links} ${isActive ? styles.nav_active : ""}`}>
					<Link href="/" className={styles.nav_link}>
						About
					</Link>
					<Link href="/forumgeneral" className={styles.nav_link}>
						Forum
					</Link>
					{
						user?.name!=undefined ? (
							<Link href="/newPost" className={styles.nav_link}>New Post</Link>
						) : (
							null
						)
					}
					{mounted ? (
						isConnected || user?.name!=undefined  ? (

								<img src={`https://avatars.dicebear.com/api/miniavs/${user?.nickname}.svg?b=%23dfbfbf`} alt="" className={styles.profile_img} onClick={handleClick}/>

							) : (

								<Link href="../api/auth/login" className={styles.nav_link}>
									Login / Register
								</Link>
							)
						) : (
						null
					)}
				</div>
			
			</nav>
		</header>
	)
}

export default Header
