import  React,{useEffect, useState} from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Analysis = () => {


  


  const items = useSelector((state : RootState) => state.item.items)


  interface GameCount {
    chess : number,
    ludo : number,
    carrom : number,
    tabletennis : number
  }


  const intialcount : GameCount = {
    chess : 0,
    ludo : 0,
    carrom : 0,
    tabletennis : 0
  }


  const[gameCount,setGameCount] = useState<GameCount>(intialcount)


  useEffect(() => {
    // Initialize a map to keep track of counts
    const gameCounts : any = {
        chess: 0,
        ludo: 0,
        carrom: 0,
        tabletennis: 0
    };

    // Count each game type from checked items
    items.forEach(obj => {
        if (Array.isArray(obj.check)) {
            obj.check.forEach(game => {
                // Increment the count for the corresponding game type
                if (gameCounts.hasOwnProperty(game)) {
                    gameCounts[game]++;

                   
                }

                if(game === 'Table Tennis')
                  {
                    gameCounts.tabletennis++
                  }
            });
        }
    });

    // Update gameCount state with the accumulated counts
    setGameCount(prevState => ({
        ...prevState,
        chess:  gameCounts.chess,
        ludo:  gameCounts.ludo,
        carrom:  gameCounts.carrom,
        tabletennis: gameCounts.tabletennis
    }));

}, [items]);

  

  return (
    <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: ['Chess', 'Carrom', 'Ludo', 'Table Tennis'],
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: [gameCount.chess, gameCount.carrom, gameCount.ludo, gameCount.tabletennis],
        },
      ]}
      width={500}
      height={300}
    />
  );
}

export default Analysis;

