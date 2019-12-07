import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { Tabs } from 'antd';
import Projects from '../Projects/projects';

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

export default function Welcome (props) {

  
  return (
    <div style={{ marginLeft: '20vw', marginTop: '90px' }}>
      <StickyContainer>
        <Tabs defaultActiveKey="1" size="large" renderTabBar={renderTabBar}>
        
        <TabPane tab="Projects" key="1">
            {<div>
                <Projects/>
            </div>}
        </TabPane>

        <TabPane tab="Unassigned Bugs" key="2">
        {<div>
             Assig buug   
        </div>}
        </TabPane>

        <TabPane tab="Assigned Bugs" key="3">
        {<div>
         Major major buggugug
        </div>}
        </TabPane>
        </Tabs>
      </StickyContainer>
    </div>
    
  );
};