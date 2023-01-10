import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Forum.module.css"
import Layout from "../components/Layout"
import ForumMain from "../components/forumMain"
import TagsComponent from "../components/tagsComponent"

const ForumGeneral: NextPage = () => {
	// general shows all.
	return (
		<div>
			<Head>
				<title>CoffeeHours</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<main className={styles.content}>
					<TagsComponent isTagActive={[1,0,0,0,0]} int = {0}/>
					{/* <ForumMain int = {0}/> */}
					{/* added Forum main directly into Tags Component */}
				</main>
			</Layout>
		</div>
	)
}

export default ForumGeneral
