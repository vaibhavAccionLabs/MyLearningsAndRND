import React, { useState, useEffect } from 'react';
import { Table, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { DELETE_RECORD } from '@/lib/services';
import { API } from 'config';
import SubWrapper from './subwrapper';

const Dashboard = ({ data, questions }) => {
  const [columnsData, setColumnsData] = useState([]);
  const [feedbacksData, setFeedbacksData] = useState([]);

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
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <Space size="middle">
          <DeleteOutlined onClick={() => deleteFeedback(record)} />
        </Space>
      ),
    },
  ];

  const prepareColumns = () => {
    const customColumns = [];
    questions.map((q, i) => {
      const colObj = {
        title: q.question,
        dataIndex: q._id,
        key: `question-${i}`,
        width: 150,
      };
      customColumns.push(colObj);
    });

    const columns = [...leftColumns, ...customColumns, ...rightColumns];
    setColumnsData(columns);
  };

  const deleteFeedback = ({ _id }) => {
    DELETE_RECORD(`${API.FEEDBACK}/${_id}`).then((result) => {
      if (result.success) {
        fetch(API.FEEDBACK)
          .then((res) => res.json())
          .then((result) => {
            prepareData(result);
          });
      }
    });
  };

  const prepareData = (data) => {
    const newData =
      data &&
      data.length &&
      data.map((d, idx) => {
        const OBJ = { ...d };
        d.qna &&
          d.qna.length &&
          d.qna.map((q, i) => {
            if (q) {
              OBJ[q.question_id] = q.answer;
            }
          });
        return OBJ;
      });
    setFeedbacksData(newData);
  };

  useEffect(() => {
    prepareColumns(data);
  }, [questions]);

  useEffect(() => {
    prepareData(data);
  }, [data]);

  return (
    <SubWrapper
      heading="Customer Feedback"
      bottonTxt="GoTo Questions"
      linkTo="/admin/questions"
    >
      <Table
        columns={columnsData}
        dataSource={feedbacksData}
        scroll={{ x: 1500, y: 300 }}
      />
    </SubWrapper>
  );
};

export default Dashboard;
