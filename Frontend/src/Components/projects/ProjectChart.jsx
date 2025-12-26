import { Paper } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

const ProjectChart = ({ data }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <PieChart width={300} height={250}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={80}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Paper>
  );
};

export default ProjectChart;
