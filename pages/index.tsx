import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import styles from "../styles/MainContent.module.css"
import Layout from "../components/Layout"
import React, { useState, useEffect } from "react"
import { profileImages} from "../utils/profileData";

const Home: NextPage = () => {

	const [imageIdx, setImageIdx] = useState(0);
	useEffect(() => {
	  const updateImage = setInterval(() => {
		var idx = (imageIdx + 1) % profileImages.length;
		setImageIdx(idx);
	  }, 500);
	  return () => clearInterval(updateImage);
	}, [imageIdx]);

	return (
		<div className={styles.main}>
			<Head>
				<title>CoffeeHours</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout>
				<main className={`${styles.container} ${styles.container_flex}`}>
					<div className={styles.information}>
						<h1 className={styles.main_title}>
							The Best Forum <br /> For Students
						</h1>
						<p className={styles.main_description}>
							CoffeeHours is a platform for university students to discuss all things coffee and university life
						</p>
						<Link href="/forumgeneral" className={styles.button}>Launch Forum</Link>
					</div>

					<div>
						<img
							src={profileImages[imageIdx].src}
							alt={profileImages[imageIdx].alt}
							className={styles.main_image}
						/>
					</div>
				</main>
			</Layout>
		</div>
	)
}

export default Home
