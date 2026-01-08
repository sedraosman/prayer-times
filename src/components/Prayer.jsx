import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MediaCard({name,time,image}) {
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "250px", md: "300px" }, // responsive sizes
        backgroundColor: "rgba(80, 80, 80, 0.6)",
        borderRadius: "16px",
      }}
    >
      <CardMedia
        sx={{ height: { xs: 80, sm: 100, md: 130 } }} // responsive image height
        image={image}
        title="image"
      />

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "rgba(220, 220, 220, 0.9)" }}
        >
          {name}
        </Typography>

        <Typography
          variant="h4"
          sx={{ color: "rgba(220, 220, 220, 0.9)" }}
        >
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
