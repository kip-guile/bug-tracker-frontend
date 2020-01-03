import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { Tabs } from 'antd';

const { TabPane } = Tabs;



const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        style={{ ...style, zIndex: 1, background: '#fff', top: '90px' }}
      />
    )}
  </Sticky>
)

export default function DevWelcome (props) {

  
  return (
    <div style={{ marginLeft: '20vw', marginTop: '90px' }}>
      <StickyContainer>
        <Tabs defaultActiveKey="1" size="large" renderTabBar={renderTabBar}>
        
        <TabPane tab="Projects" key="1">
            {<div>
                My Bugs
            </div>}
        </TabPane>

        <TabPane tab="Assigned Bugs" key="2">
        {<div>
          AllBugs
        </div>}
        </TabPane>

        </Tabs>
      </StickyContainer>
    </div>
    
  );
};