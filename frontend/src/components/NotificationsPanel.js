import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Button } from 'react-bootstrap';

function NotificationsPanel() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/notifications');
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/notifications/${id}/read`);
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Notifications</h3>
      <ListGroup>
        {notifications.map((n) => (
          <ListGroup.Item key={n.id} variant={n.isRead ? 'light' : 'warning'}>
            {n.message}
            {!n.isRead && (
              <Button variant="outline-success" size="sm" onClick={() => markAsRead(n.id)}>
                Mark as Read
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default NotificationsPanel;
