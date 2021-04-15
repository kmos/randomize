import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import netlifyAuth from 'components/netlifyAuth'

import Header from '@components/Header'
import Footer from '@components/Footer'
import {Navbar} from '@components/Navbar'

function loggedIndex() {
    return <div>
        You're logged in! Please do visit{' '}
        <Link href="/dashboard">
            <a>the special, members-only space.</a>
        </Link>
    </div>;
}

export default function Home() {
    let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)

    useEffect(() => {
        let isCurrent = true
        netlifyAuth.initialize((user) => {
            if (isCurrent) {
                setLoggedIn(!!user)
            }
        })

        return () => {
            isCurrent = false
        }
    }, [])

    return (
        <div className="container">
            <Head>
                <title>Members Only</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <main>
                <Header text={'Welcome to the Public Space™'} />
                <p className="description">
                    Welcome to our Game! Please login to play!
                </p>
                {loggedIn ? loggedIndex() : (
                    <p>Try To Log!</p>
                )}
            </main>

            <Footer />

            <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-family: Menlo, Monaco, Lucida Console, Courier New, monospace;
        }
      `}</style>

            <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
        </div>
    )
}
