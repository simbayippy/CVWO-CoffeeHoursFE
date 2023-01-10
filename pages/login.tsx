import type { NextPage } from "next"
import Head from "next/head"
import React, { useState } from "react"
import Link from "next/link"
import styles from "../styles/Login.module.css"
import { isMounted } from "../hooks/isMounted"
import Layout from "../components/Layout"
import LoginComponent from "../components/loginComponent"

const Login: NextPage = () => {
	const mounted = isMounted();

	return (
		<div>
			<Head>
				<title>CoffeeHours</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
                <LoginComponent/>
            </Layout>
		</div>
	)
}

export default Login