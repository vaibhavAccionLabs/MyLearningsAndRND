import React from 'react';
import { Table, Space } from 'antd';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import Error from 'next/error';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { API } from 'config';

import { DELETE_RECORD } from '@/lib/services';
import { useRouterRefresh } from '@/lib/utils';
import Wrapper from '@/components/wrapper';
import SubWrapper from '@/components/subwrapper';

const QuestionsList = ({ questions, session, error }) => {
  const refresh = useRouterRefresh();
  const router = useRouter();
  const columns = [
    {
      title: 'S.No.',
      dataIndex: 'question',
      key: 'question-serial-no',
      render: (text, record, idx) => <span>{idx + 1}</span>,
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Type Of Question',
      dataIndex: 'typeOfQuestion',
      key: 'typeOfQuestion',
    },
    {
      title: 'Is Required',
      dataIndex: 'isRequired',
      key: 'isRequired',
      render: (text, record, idx) => <span>{text ? 'Yes' : 'No'}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => editQuestion(record)} />
          <DeleteOutlined onClick={() => deleteQuestion(record)} />
        </Space>
      ),
    },
  ];

  const editQuestion = ({ _id }) => {
    router.push(`/admin/editquestion/${_id}`);
  };

  const deleteQuestion = ({ _id }) => {
    DELETE_RECORD(`${API.QUESTION}/${_id}`).then((result) => {
      if (result.success) {
        refresh();
        // router.reload();// it will hard reload
      }
    });
  };

  return (
    <Wrapper pageTitle="Admin - Feedback Questions">
      {(session && !error && (
        <SubWrapper
          heading="Questions"
          bottonTxt="Create Question"
          linkTo="/admin/createquestion"
        >
          <Table columns={columns} dataSource={questions} />
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
  const res = await fetch(API.QUESTION, options);
  const json = await res.json();
  return {
    props: { session, questions: json, error: false },
  };
}

export default QuestionsList;
