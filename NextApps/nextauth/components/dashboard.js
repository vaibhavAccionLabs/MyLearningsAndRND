import React from 'react';
import { Table, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { DELETE_RECORD } from '@/lib/services';
import { API } from 'config';
import SubWrapper from './subwrapper';

const Dashboard = ({ data, questionsColumns = [], refresh }) => {
  const leftColumns = [
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
      width: 100,
      fixed: 'left',
    },
    {
      title: 'Mobile',
      dataIndex: 'userMobile',
      key: 'userMobile',
      width: 100,
      fixed: 'left',
    },
    {
      title: 'Email',
      dataIndex: 'userEmail',
      key: 'userEmail',
      width: 150,
      fixed: 'left',
    },
  ];

  const rightColumns = [
    {
      title: 'Comment',
      key: 'comment',
      width: 150,
      fixed: 'right',
      dataIndex: 'comment',
    },
    {
      title: 'Action',
      key: 'action',
      width: 50,
      fixed: 'right',
      render: (text, record) => (
        <Space size="middle">
          <DeleteOutlined onClick={() => deleteFeedback(record)} />
        </Space>
      ),
    },
  ];

  const deleteFeedback = ({ _id }) => {
    DELETE_RECORD(`${API.FEEDBACK}/${_id}`).then((result) => {
      if (result.success) {
        refresh();
      }
    });
  };

  return (
    <SubWrapper
      heading="Customer Feedback"
      bottonTxt="GoTo Questions"
      linkTo="/admin/questions"
    >
      <Table
        columns={[...leftColumns, ...questionsColumns, ...rightColumns]}
        dataSource={data}
        scroll={{ x: 1500, y: 300 }}
      />
    </SubWrapper>
  );
};

export default Dashboard;
