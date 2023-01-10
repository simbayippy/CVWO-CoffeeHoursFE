import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Forum.module.css"
import Layout from "../components/Layout"
import ForumMain from "../components/forumMain"
import TagsComponent from "../components/tagsComponent"

const ForumCrypto: NextPage = () => {
	return (
		<div>
			<Head>
				<title>CoffeeHours</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<main className={styles.content}>
					<TagsComponent isTagActive={[0,1,0,0,0]} int = {1}/>
					{/* <ForumMain int = {1}/> */}
				</main>
			</Layout>
		</div>
	)
}

export default ForumCrypto
