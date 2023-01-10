import type { NextPage } from "next"
import Head from "next/head"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import Layout from "../components/Layout"
import { useUser } from '@auth0/nextjs-auth0/client';
import LoginComponent from "../components/loginComponent"
import ProfileComponent from "../components/profileComponent"
import { useAccount } from "wagmi"
import axios from 'axios';
import {postEndPoint} from "../utils/config.json";
import styles from "../styles/Profile.module.css"


const Profile: NextPage = () => {
  const { address, isConnected } = useAccount()
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div>{error.message}</div>;

	return (
    <div>
      <Head>
        <title>CoffeeHours</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ProfileComponent/>
      </Layout>
    </div> 
	)
}

export default Profile