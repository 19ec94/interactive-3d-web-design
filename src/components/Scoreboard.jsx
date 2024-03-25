import { React, useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import axios from 'axios'
import "./Scoreboard.css"

export const Scoreboard = () => {

  const [scoreboardData, setScoreboardData] = useState([]);

  useEffect(() => {
    axios.get(`/api/user/scoreboard`)
      .then(responseScores => {
        console.log("Response Scores ", responseScores);
        setScoreboardData(responseScores.data.data);
      })
      .catch(error => {
        console.error('Error fetching user score:', error);
      });
  }, []); // Empty dependency array means this effect runs only once

    const columns = useMemo(
      //column definitions...
      () => [
        {
          accessorKey: 'userName',
          header: 'User',
          footer: '',
        },
        {
          accessorKey: 'scoresLevel1',
          header: 'Highest Score Level 1',
          footer: '',
        },
        {
          accessorKey: 'scoresLevel2',
          header: 'Highest Score Level 2',
          footer: '',
        },
        {
          accessorKey: 'totalScore',
          header: 'Total Score',
          footer: '',
        },
      ],
      [],
      //end
    );


    let data = null
    if ((scoreboardData || []).length === 0) {
    data = []
  }
  else {
    data = scoreboardData
    data.forEach(userScore => {
      userScore.totalScore = userScore.scoresLevel1 + userScore.scoresLevel2
    })
  }
    const table = useMaterialReactTable({
      columns,
      data,
      enableBottomToolbar: false,
      enableStickyHeader: true,
      enableStickyFooter: true,
      enablePagination: false,
      muiTableContainerProps: { sx: { maxHeight: '400px' } },
      muiTableBodyCellProps: {
        sx: (theme) => ({
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[50],
        }),
      },
    });

    if (data.length === 0) {
      return <div>Loading...</div>;
    } else {
      return <><div className="title"><h1>High Score</h1></div><MaterialReactTable table={table} /></>
      
    }

};
