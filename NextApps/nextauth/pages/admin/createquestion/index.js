import React from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import Error from 'next/error';
import { Modal } from 'antd';

import { API } from 'config';
import { POST_DATA } from '@/lib/services';

import Wrapper from '@/components/wrapper';
import SubWrapper from '@/components/subwrapper';
import CreateForm from '@/components/create';

const CreateQuestion = ({ session, error }) => {
  const { push } = useRouter();
  const onSubmit = (values) => {
    POST_DATA(values, API.QUESTION, null)
      .then((result) => {
        Modal.success({
          content: 'Created Successfully!',
          onOk: () => push('/admin/questions'),
        });
      })
      .catch((err) => console.log('ERROR::>>', err));
  };

  return (
    <Wrapper pageTitle="Admin - Create Feedback Question">
      {(session && !error && (
        <SubWrapper heading="Create Question">
          <CreateForm onSubmit={onSubmit} />
        </SubWrapper>
      )) || <Error statusCode={401} title="Not authorized" />}
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
  return {
    props: { session, error: false },
  };
}

export default CreateQuestion;
