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

const EditQuestion = ({ session, data, error }) => {
  const {
    push,
    query: { id },
  } = useRouter();

  const onSubmit = (values) => {
    POST_DATA(values, `${API.QUESTION}/${id}`, 'PUT')
      .then((result) => {
        if (result) {
          Modal.success({
            content: 'Updated Successfully!',
            onOk: () => push('/admin/questions'),
          });
        }
      })
      .catch((err) => console.log('ERROR::>>', err));
  };

  return (
    <Wrapper pageTitle="Admin - Edit Feedback Question">
      {(session && !error && (
        <SubWrapper heading="Edit Question">
          <CreateForm data={data} onSubmit={onSubmit} />
        </SubWrapper>
      )) || <Error statusCode={401} title="Not authorized" />}
    </Wrapper>
  );
};

export async function getServerSideProps(context) {
  const {
    query: { id },
  } = context;

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
  const res = await fetch(`${API.QUESTION}/${id}`, options);
  const data = await res.json();
  return {
    props: { session, data, error: false },
  };
}

export default EditQuestion;
