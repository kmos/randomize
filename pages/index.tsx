import {useEffect, useState} from 'react'
import Head from 'next/head'
import netlifyIdentity from 'netlify-identity-widget';

import Header from '@components/Header'
import Footer from '@components/Footer'
import {Navbar} from '@components/Navbar'

function LoggedIndex() {
    return (
        <div>
        <iframe src="https://giphy.com/embed/DFu7j1d1AQbaE" width="480" height="480" frameBorder="0"
                className="giphy-embed" allowFullScreen></iframe><p><a
        href="https://giphy.com/gifs/stephen-django-djangostephen-DFu7j1d1AQbaE">via GIPHY</a></p>
        </div>
    );
}

const netlifyAuth = {
    netide: null,
    init() {
        netlifyIdentity.init();
        this.netide = netlifyIdentity;
    },
    openLoginModal() {
        this.netide.open();
    },
    logout(callback) {
        this.netide.on('logout', () => {
            callback();
        });
        this.netide.logout();
    },
    subscribeLogin(callBack) {
        this.netide.on('init', user => {
            callBack(user);
        });
        this.netide.on('login', user => {
            callBack(user);
        });
    },
};


export default function Home() {
    let [loggedIn, setLoggedIn] = useState(false)
    let [user, setUser] = useState(null)

    useEffect(() => {
        netlifyAuth.init();
        netlifyAuth.subscribeLogin(user => {
            setLoggedIn(!!user);
            if (user) setUser(user);
        });
    }, [loggedIn])

    let login = () => {
        netlifyAuth.openLoginModal()
    }

    let logout = () => {
        netlifyAuth.logout(() => {
            setLoggedIn(false)
            setUser(null)
        })
    }

    return (
        <div className="container">
            <Head>
                <title>Members Only</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar
                loggedIn={loggedIn}
                login={login}
                logout={logout}
            />
            <main>
                <Header text={'Welcome to Randomize™'} />
                <p className="description">
                    Welcome to our Game!
                </p>
                {loggedIn ? (
                    <div>
                        <LoggedIndex />
                        You are logged in!

                        {user && <>Welcome {user?.user_metadata.full_name}!</>}
                        <br />
                        <button onClick={logout}>

                        Log out here.
                    </button>
                    </div>
                ) : (
                    <button onClick={login}>
                        Log in here.
                    </button>
                )}
            </main>

            <Footer />

            <style jsx>
                {`
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
            `}
            </style>
        </div>
    )
}
