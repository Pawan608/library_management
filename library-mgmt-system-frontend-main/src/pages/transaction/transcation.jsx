import * as React from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { returnColumns, returnCreateData } from "../../utils/return-table-utils";
import StickyHeadTable from "../../layouts/tables";
import IssueTable from "../../layouts/issue-table";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Transactions(){
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const rows = [
    returnCreateData("2023-08-25", "bhavy#0001", "54118949815", "250"),
    returnCreateData("2023-05-04", "pawan#0001", "12368949815", "520"),
  ]
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Books Issued" {...a11yProps(0)} />
          <Tab label="Books Returned" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <IssueTable/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <StickyHeadTable columns={returnColumns} rows={rows}/>
      </CustomTabPanel>
    </Box>
  );
}

