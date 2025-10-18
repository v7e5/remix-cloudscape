import {memo} from 'react'
import Box from '~/components/box'
import Drawer from '~/components/drawer'
import Header from '~/components/header'
import ColumnLayout from '~/components/column-layout'
import SpaceBetween from '~/components/space-between'
import ExpandableSection from '~/components/expandable-section'

const Z = memo(({title}) => {
  return (
    <Drawer header={<h2>{title}</h2>}>
      <Box margin={{bottom: 'l'}}>
        <SpaceBetween size='xxl'>
          <SpaceBetween size='xs'>
            <Header variant='h3'>Step 1: Engine type</Header>
            <ExpandableSection headerText='Engine options' defaultExpanded>
              <ColumnLayout columns={2} variant='text-grid'>
                <div>
                  <Box variant='awsui-key-label'>Engine</Box>
                  <div>Aurora</div>
                </div>
                <div>
                  <Box variant='awsui-key-label'>License model</Box>
                  <div>Bring your own license</div>
                </div>
                <div>
                  <Box variant='awsui-key-label'>Edition</Box>
                  <div>MySQL 5.6-compatible</div>
                </div>
              </ColumnLayout>
            </ExpandableSection>
          </SpaceBetween>
          <SpaceBetween size='xs'>
            <Header variant='h3'>Step 2: Instance details</Header>
            <ExpandableSection headerText='Instance options'>
              <SpaceBetween size='l'>
                <ColumnLayout columns={2} variant='text-grid'>
                  <div>
                    <Box variant='awsui-key-label'>Class</Box>
                    <div>db.t2.micro</div>
                  </div>
                  <div>
                    <Box variant='awsui-key-label'>Storage type</Box>
                    <div>General Purpose (SSD)</div>
                  </div>
                  <div>
                    <Box variant='awsui-key-label'>Allocated storage</Box>
                    <div>20 GiB</div>
                  </div>
                </ColumnLayout>
              </SpaceBetween>
            </ExpandableSection>
            <ExpandableSection headerText='Names and password'>
              <ColumnLayout columns={2} variant='text-grid'>
                <div>
                  <Box variant='awsui-key-label'>DB instance identifier</Box>
                  <div>example-instance-identifier</div>
                </div>
                <div>
                  <Box variant='awsui-key-label'>Primary username</Box>
                  <div>example-username</div>
                </div>

                <div>
                  <Box variant='awsui-key-label'>Primary password</Box>
                  <div>example-password</div>
                </div>
              </ColumnLayout>
            </ExpandableSection>
          </SpaceBetween>
        </SpaceBetween>
      </Box>
    </Drawer>
  )
})

const items = [
  {
    id: 'drawer_0',
    ariaLabels: {
      drawerName: 'drawer_0'
    },
    content: <Z title='drawer_0' />,
    resizable: true,
    onResize: (...a) => {
      console.log('resize', a)
    },
    trigger: {
      iconName: 'security'
    }
  },
  {
    id: 'drawer_1',
    ariaLabels: {
      drawerName: 'drawer_1'
    },
    content: <Z title='drawer_1' />,
    resizable: true,
    onResize: (...a) => {
      console.log('resize', a)
    },
    trigger: {
      iconName: 'share'
    }
  }
]

export {
  items as default
}
