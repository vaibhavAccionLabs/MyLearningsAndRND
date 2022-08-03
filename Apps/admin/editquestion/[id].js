import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { Modal, Spin } from 'antd';

import { API } from 'config';

import { POST_DATA } from '@/lib/services';

import Wrapper from '@/components/wrapper';
import SubWrapper from '@/components/subwrapper';
import CreateForm from '@/components/create';

const endPoint = API.QUESTION;

const EditQuestion = ({ data }) => {
  const [session, loading] = useSession();
  const {
    push,
    query: { id },
  } = useRouter();

  const onSubmit = (values) => {
    POST_DATA(values, `${endPoint}/${id}`, 'PUT')
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
    <Spin tip="Loading..." spinning={loading}>
      {session && !loading && (
        <Wrapper pageTitle="Admin - Edit Feedback Question">
          <SubWrapper heading="Edit Question">
            <CreateForm data={data} onSubmit={onSubmit} />
          </SubWrapper>
        </Wrapper>
      )}
    </Spin>
  );
};

EditQuestion.getInitialProps = async ({ query }) => {
  const { id } = query;
  const res = await fetch(`${endPoint}/${id}`);
  const data = await res.json();
  return { data };
};

export default EditQuestion;
