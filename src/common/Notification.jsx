import { Tabs, message } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const getUser = () => {
    const userdata = JSON.parse(localStorage.getItem('userData'));
    if (userdata) {
      setUser(userdata);
    }
  };

  // Mark all notifications as read
  const handleAllMarkRead = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:8001/api/user/getallnotification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (res.data.success) {
        const updatedUser = {
          ...user,
          notification: [],
          seennotification: [...user.seennotification, ...user.notification],
        };
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        message.success(res.data.message);
        setUser(updatedUser);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // Delete all read notifications
  const handleDeleteAllRead = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:8001/api/user/deleteallnotification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (res.data.success) {
        const updatedUser = { ...user, seennotification: [] };
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        message.success(res.data.message);
        setUser(updatedUser);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h2 className="p-3 text-center">Notification</h2>
      <Tabs>
        {/* Unread Notifications */}
        <Tabs.TabPane tab="Unread" key="0">
          <div className="d-flex justify-content-end">
            <h4
              style={{ cursor: 'pointer' }}
              onClick={handleAllMarkRead}
              className="p-2"
            >
              Mark all as read
            </h4>
          </div>
          {user?.notification.length > 0 ? (
            user.notification.map((notificationMsg, index) => (
              <div key={index} className="card">
                <div className="card-text">{notificationMsg.message}</div>
              </div>
            ))
          ) : (
            <p className="text-center">No unread notifications.</p>
          )}
        </Tabs.TabPane>

        {/* Read Notifications */}
        <Tabs.TabPane tab="Read" key="1">
          <div className="d-flex justify-content-end">
            <h4
              style={{ cursor: 'pointer' }}
              onClick={handleDeleteAllRead}
              className="p-2"
            >
              Delete all read
            </h4>
          </div>
          {user?.seennotification.length > 0 ? (
            user.seennotification.map((notificationMsg, index) => (
              <div
                key={index}
                className="card"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(notificationMsg.onClickPath)}
              >
                <div className="card-text">{notificationMsg.message}</div>
              </div>
            ))
          ) : (
            <p className="text-center">No read notifications.</p>
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Notification;
