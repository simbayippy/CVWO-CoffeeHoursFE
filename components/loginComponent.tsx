import type { NextPage } from "next"
import Link from "next/link"
import React from 'react';
import styles from "./loginComponent.module.css"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { isMounted } from "../hooks/isMounted"
import { useAccount } from "wagmi"

const LoginComponent: NextPage = () => {
    const mounted = isMounted();
	const { address, isConnected } = useAccount()
    
    function handleClick() {
        isConnected 
            ? <Link href='/forum'/>
            : null;
    }
    return (
        <main className={styles.loginContainer}>
                <img src="/logo.png" alt="" className={styles.logo_img} />
                <p className={styles.loginTitle}>Welcome back to CoffeeHours!</p>
                <p className={styles.loginDesc}>Login/Register using:</p>
                <div className={styles.loginButtons}>
                    <Link href="/api/auth/login">
                        <button className={styles.loginEmailBtn}>
                                Email
                        </button>
                    </Link>

                    <p className={styles.loginDesc}>or</p>
                    <div className={styles.loginCrypto} onClick={handleClick}>
                        <ConnectButton label="Crypto Wallet" accountStatus="address" chainStatus="none" showBalance={false}/>
                    </div>
                </div>
        </main>
    )
}

export default LoginComponent