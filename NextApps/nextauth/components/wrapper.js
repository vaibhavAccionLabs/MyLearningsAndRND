import React from 'react';
import { Layout } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { signIn, signOut, useSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';

import styles from '../styles/Layout.module.css';

const { Header, Footer, Content } = Layout;

const Wrapper = ({
  children,
  pageTitle = 'Vaibhav Daily Needs',
  customBack,
}) => {
  const [session, loading] = useSession();
  const { push, back, pathname, reload } = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header className={styles.header}>
          {pathname !== '/admin' && pathname !== '/' && (
            <LeftOutlined onClick={() => back()} />
          )}
          {customBack && <LeftOutlined onClick={customBack} />}
          <span
            className={styles.homeLink}
            onClick={() => push(pathname.includes('/admin') ? '/admin' : '/')}
          >
            Vaibhav Daily Needs
          </span>
          {pathname.includes('/admin') && (
            <div className={styles.userprofile}>
              {!session && (
                <>
                  <button onClick={() => signIn('github')}>Sign In</button>
                </>
              )}
              {session && (
                <>
                  <img src={session.user.image} />
                  <p>{session.user.name}</p>
                  <button
                    onClick={() =>
                      signOut({ callbackUrl: 'http://localhost:3000/admin' })
                    }
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          )}
        </Header>
        <Content className={styles.content}>{children}</Content>
        <Footer className={styles.footer}>Powered by vaibhav.io</Footer>
      </Layout>
    </div>
  );
};

export default Wrapper;
