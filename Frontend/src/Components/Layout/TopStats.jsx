import { Grid, Card, CardContent, Typography } from "@mui/material";

const StatCard = ({ title, value }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

const TopStats = ({ projects, personnel, skills }) => {
  return (
    <Grid container spacing={5}>
      <Grid item s={15} md={4}>
        <StatCard title="Total Projects" value={projects} />
      </Grid>
      <Grid item xs={15} md={4}>
        <StatCard title="Total Personnel" value={personnel} />
      </Grid>
      <Grid item xs={15} md={4}>
        <StatCard title="Total Skills" value={skills} />
      </Grid>
    </Grid>
  );
};

export default TopStats;
