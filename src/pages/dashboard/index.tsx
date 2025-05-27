import React from 'react';

import Button from '@shared/button';

const Dashboard = () => {
  const alarm = () => {
    console.log('clicked');
  };

  return (
    <div>
      Dashboard
      <Button variant="text" onClick={alarm}>
        Button
      </Button>
    </div>
  );
};

export default Dashboard;
