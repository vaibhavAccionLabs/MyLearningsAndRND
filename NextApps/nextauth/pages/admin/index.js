import React from 'react';
import { getSession } from 'next-auth/client';
import { API } from 'config';

import { useRouterRefresh } from '@/lib/utils';

import Wrapper from '@/components/wrapper';
import SubWrapper from '@/components/subwrapper';
import Dashboard from '@/components/dashboard';
import Auth from '@/components/auth';

const AdminHome = (props) => {
  const refresh = useRouterRefresh();
  const { session, error } = props;
  return (
    <Wrapper pageTitle="Admin">
      {session && !error ? (
        <Dashboard refresh={refresh} {...props} />
      ) : (
        <SubWrapper heading="Login">
          <Auth />
        </SubWrapper>
      )}
    </Wrapper>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        error: true,
      },
    };
  }

  const options = {
    headers: {
      cookie: context.req.headers.cookie,
      'Content-Type': 'application/json',
    },
  };

  const feedbackRes = await fetch(API.FEEDBACK, options);
  const questionRes = await fetch(API.QUESTION, options);
  const feedbacks = await feedbackRes.json();
  const questions = await questionRes.json();

  let feedbackData =
    feedbacks &&
    feedbacks.length &&
    feedbacks.map((d, idx) => {
      const OBJ = { ...d, key: `customerFeedback-${idx}` };
      d.qna &&
        d.qna.length &&
        d.qna.map((q, i) => {
          if (q) {
            OBJ[q.question_id] = q.answer;
          }
        });
      return OBJ;
    });

  let questionsColumns = [];
  questions.map((q, i) => {
    const colObj = {
      title: q.question,
      dataIndex: q._id,
      key: `question-${i}`,
      width: 150,
    };
    questionsColumns.push(colObj);
  });

  return {
    props: {
      session: session || null,
      questionsColumns: questionsColumns || null,
      data: feedbackData || null,
      options,
      error: false,
    },
  };
}

export default AdminHome;
