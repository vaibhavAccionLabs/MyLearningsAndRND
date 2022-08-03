import React from 'react';
import { useSession } from 'next-auth/client';
import { Spin } from 'antd';
import { API } from 'config';

import Wrapper from '@/components/wrapper';
import SubWrapper from '@/components/subwrapper';
import Dashboard from '@/components/dashboard';
import Auth from '@/components/auth';

const endPoint = API.FEEDBACK;

const AdminHome = (props) => {
  const [session, loading] = useSession();
  const { feedbacks, questions } = props;
  return (
    <Spin tip="Loading..." spinning={loading}>
      <Wrapper pageTitle="Admin">
        {session && !loading ? (
          <Dashboard data={feedbacks} questions={questions} />
        ) : (
          !loading && (
            <SubWrapper heading="Login">
              <Auth />
            </SubWrapper>
          )
        )}
      </Wrapper>
    </Spin>
  );
};

AdminHome.getInitialProps = async (ctx) => {
  const feedbackRes = await fetch(endPoint);
  const questionRes = await fetch(API.QUESTION);
  const feedbacks = await feedbackRes.json();
  const questions = await questionRes.json();
  return { feedbacks, questions };
};

export default AdminHome;
