import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout, Spin } from 'antd';
import { signIn, signOut, useSession } from 'next-auth/client';
import { LeftOutlined } from '@ant-design/icons';

import styles from 'styles/Layout.module.css';

const { Header, Footer, Content } = Layout;

const Wrapper = ({
  children,
  pageTitle = 'Vaibhav Daily Needs',
  customBack,
  rendercomp,
}) => {
  const [session, loading] = useSession();
  const { push, back, pathname, reload } = useRouter();
  useEffect(() => {
    if (pathname.includes('/admin')) {
      if (!session) {
        push('/admin');
      }
    }
  }, [session, loading]);
  return (
    <Spin tip="Loading..." spinning={loading}>
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
                        signOut({ callbackUrl: `http://localhost:3000/admin` })
                      }
                    >
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            )}

            {rendercomp}
          </Header>
          <Content className={styles.content}>{children}</Content>
          <Footer className={styles.footer}>Powered by vaibhav.io</Footer>
        </Layout>
      </div>
    </Spin>
  );
};

export default Wrapper;
