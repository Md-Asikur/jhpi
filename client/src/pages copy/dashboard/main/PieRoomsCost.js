import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useValue } from '../../../context/ContextProvider';
import useFetchCollection from '../../../customHooks/useFetchCollection';

const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042", "#804"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function PieRoomsCost() {
  const {
    state: { rooms },
  } = useValue();
  const [costGroups, setCostGroups] = useState([]);
const entertainment = useFetchCollection("entertainments");
const teachers = useFetchCollection("teachers");
const students = useFetchCollection("products");
const notices = useFetchCollection("notices");
const projects = useFetchCollection("projects");
  useEffect(() => {
    let free = 0,
      lessThan15 = 0,
      between15And35 = 0,
      moreThan35 = 0;
    rooms.forEach((room) => {
      if (room.price === 0) return free++;
      if (room.price < 15) return lessThan15++;
      if (room.price <= 35) return between15And35++;
      moreThan35++;
    });
    setCostGroups([
      { name: "Students", qty: students?.data?.length },
      { name: "Teachers", qty: teachers?.data?.length },
      { name: "Projects", qty: projects?.data?.length },
      { name: "Notices", qty: notices?.data?.length },
      { name: "Entertainments", qty: entertainment?.data?.length },
    ]);
  }, [rooms]);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
      }}
    >
      <PieChart width={300} height={200}>
        <Pie
          data={costGroups}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="qty"
        >
          {costGroups.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Stack gap={2}>
        <Typography variant="h3" color="white">JHPI ALL INFORMATION CHART</Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {COLORS.map((color, i) => (
            <Stack key={color} alignItems="center" spacing={1}>
              <Box sx={{ width: 20, height: 20, background: color }} />
              <Typography variant="body2" sx={{ opacity: 0.7 }} style={{color:"white",fontSize:"1.5rem"}}>
                {costGroups[i]?.name}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
