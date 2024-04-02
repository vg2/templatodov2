import { Grid, Select, Option, Typography } from "@mui/joy"
import { useQuery } from "@tanstack/react-query";

const TodoToday = () => {
  const query = useQuery({ queryKey: ['templateDefintions'], queryFn: fetch('http://localhost:8080/template-definitions') });

console.log(query.data);
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={12}>
        <Typography level='h2'>To do today</Typography>
      </Grid>
      <Grid xs={12} sm={4}>
        <Select defaultValue='baby-activities'>
          <Option value='baby-activities'>Baby activites</Option>
        </Select>
      </Grid>
    </Grid>
  )
}

export default TodoToday;
